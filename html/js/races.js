function fixupRaces(tome) {
    var data = getData();
    var r = data.races;

    if (data.fixups.races) {
        return;
    }

    // Replace IDs in race_list with references to the actual race definition.
    r.race_list = _.map(r.race_list, function(race) { return r.races[race]; });

    // Process subraces, and store a reference from each subrace back to the
    // race ID.
    _.each(r.races, function(elem) {
        _.each(elem.subrace_list, function (sub) {
            var exp_penalty = r.subraces[sub].experience;
            exp_penalty = (exp_penalty || 1.0) - 1.0;
            if (!r.subraces[sub].images || !r.subraces[sub].images.length) {
                // Special fallback images for races without portraits
                var fallbackImages = {
                    'drem': [
                        { file: 'player/drem_male_cropped.png' },
                        { file: 'player/drem_female_cropped.png' }
                    ],
                    'krog': [
                        { file: 'player/krog_male_cropped.png' },
                        { file: 'player/krog_female_cropped.png' }
                    ]
                };
                
                if (fallbackImages[sub.toLowerCase()]) {
                    r.subraces[sub].images = fallbackImages[sub.toLowerCase()];
                } else {
                    r.subraces[sub].images = [
                        { file: 'player/' + sub.toLowerCase() + '_male.png' },
                        { file: 'player/' + sub.toLowerCase() + '_female.png' }
                    ];
                }
            }
            r.subraces[sub].exp_penalty = exp_penalty;
            r.subraces[sub].race_short_name = elem.short_name;
        });
    });

    // Replace subrace IDs in each race's subrace_list with references
    // to the actual subrace definition.
    _.each(r.races, function(elem) {
        elem.subrace_list = _.map(elem.subrace_list, function(sub) { return r.subraces[sub]; });
        elem.single_subrace = elem.subrace_list.length == 1;
    });

    r.races_by_id = indexByHtmlId(r.races, 'short_name');

    data.fixups.races = true;
}

function navRaces(tome) {
    return Handlebars.templates.race_nav(getData().races);
}

function listRaces(tome, r) {
    var data = getData();
    var race = data.races.races_by_id[r];
    
    // Mapping table for race short names to talent type names
    var raceNameMapping = {
        'whitehoof': 'whitehooves',  // WHITEHOOF -> whitehooves
        'kruk_yeti': 'yeti',         // KRUK_YETI -> yeti
        'ghoul': { category: 'undead', name: 'ghoul' },        // GHOUL -> undead/ghoul
        'skeleton': { category: 'undead', name: 'skeleton' },  // SKELETON -> undead/skeleton
    };
    
    // Add race talent data to each subrace
    _.each(race.subrace_list, function(subrace) {
        // Get the base race talent name (lowercase)
        var baseName = subrace.short_name.toLowerCase();
        
        // Apply mapping if exists, otherwise use the base name
        var mapping = raceNameMapping[baseName];
        var raceTalentType;
        
        if (mapping) {
            if (typeof mapping === 'object') {
                // Handle category mapping (e.g., undead/ghoul)
                raceTalentType = mapping.category + '/' + mapping.name;
            } else {
                // Handle simple string mapping (e.g., race/whitehooves)
                raceTalentType = 'race/' + mapping;
            }
        } else {
            // Default: race category
            raceTalentType = 'race/' + baseName;
        }
        
        // Create talent data structure similar to classes
        subrace.race_talents = {};
        subrace.race_talents[raceTalentType] = [true, 1.0, subrace.display_name]; // [unlocked, mastery, display_name]
        
        // Create sorted array for template
        subrace.race_talents_sorted = [
            {
                key: raceTalentType,
                value: subrace.race_talents[raceTalentType]
            }
        ];
    });
    
    return Handlebars.templates.race(race);
}

/**loadDataIfNeeded for races */
function loadRacesIfNeeded(success) {
    loadDataIfNeeded('races', function(data) {
        fixupRaces(tome);
        success(data);
    });
}

function handleUnknownRace(tome, r) {
    document.title += ' - ' + toTitleCase(r);

    $("#content-container").scrollTop(0);

    $("#content").html('<div class="alert alert-warning">The ' + escapeHtml(r) + ' race does not exist in ToME ' + versions.name(versions.current) + '.</div>');
}

function fillRaceTalents(tome, r, callback) {
    var data = getData();
    var race = data.races.races_by_id[r];
    var subraces = race.subrace_list;
    
    // Mapping table for race short names to talent type names
    var raceNameMapping = {
        'whitehoof': 'whitehooves',  // WHITEHOOF -> whitehooves
        'kruk_yeti': 'yeti',         // KRUK_YETI -> yeti
        'ghoul': { category: 'undead', name: 'ghoul' },        // GHOUL -> undead/ghoul
        'skeleton': { category: 'undead', name: 'skeleton' },  // SKELETON -> undead/skeleton
    };
    
    // Setup talent modal handlers immediately
    setupTalentModalHandlers();

    var completed = 0;
    var total = subraces.length;
    
    function checkComplete() {
        completed++;
        if (completed >= total) {
            // Set up handlers after all content is loaded
            setupTalentModalHandlers();
            
            // Simple direct click handler for individual talent links
            $('.individual-talent-link').off('click').on('click', function(e) {
                e.preventDefault();
                
                var $link = $(this);
                var talentId = $link.data('talent-id');
                var talentType = $link.data('talent-type');
                var talentName = $link.data('talent-name');
                
                showSimpleTalentPopup(talentId, talentType, talentName);
                
                return false;
            });
            
            if (callback) {
                callback();
            }
        }
    }

    if (total === 0) {
        // Set up handlers even when there are no subraces
        setupTalentModalHandlers();
        if (callback) {
            callback();
        }
        return;
    }

    // For each subrace, find the corresponding race talent tree
    for (var i = 0; i < subraces.length; i++) {
        var subrace = subraces[i];
        
        // Create a closure to capture the current values
        (function(currentSubrace) {
            // Get the base race talent name (lowercase)
            var baseName = currentSubrace.short_name.toLowerCase();
            
            // Apply mapping if exists, otherwise use the base name
            var mapping = raceNameMapping[baseName];
            var raceTalentType;
            var talentCategory;
            var talentDataCategory;
            
            if (mapping) {
                if (typeof mapping === 'object') {
                    // Handle category mapping (e.g., undead/ghoul)
                    raceTalentType = mapping.category + '/' + mapping.name;
                    talentCategory = 'talents.' + mapping.category;
                    talentDataCategory = mapping.category;
                } else {
                    // Handle simple string mapping (e.g., race/whitehooves)
                    raceTalentType = 'race/' + mapping;
                    talentCategory = 'talents.race';
                    talentDataCategory = 'race';
                }
            } else {
                // Default: race category
                raceTalentType = 'race/' + baseName;
                talentCategory = 'talents.race';
                talentDataCategory = 'race';
            }
            
            // Load the talents from the appropriate category
            loadDataIfNeeded(talentCategory, function() {
                // Find the talent tree that matches this race
                var talentData = getData().talents[talentDataCategory];
                var talent_details = _.find(talentData, function(t) { 
                    return t.type == raceTalentType; 
                });
                
                if (talent_details) {
                    // Generate the talent HTML using the same template as classes
                    var talent_html = Handlebars.partials.class_talents_detail(talent_details);
                    var $container = $('.class-talents-detail[data-talent-type="' + toHtmlId(raceTalentType) + '"]');
                    $container.html(talent_html);
                    
                    // Apply current icon size settings
                    if (typeof imgSizeSettings !== 'undefined') {
                        imgSizeSettings.applyIconSizeClasses(imgSizeSettings.get());
                    }
                }
                
                checkComplete();
            });
        })(subrace);
    }
}
