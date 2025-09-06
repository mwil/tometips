/**
 * Race Data Management Module
 * Handles race and subrace data processing, navigation generation, and racial talent integration.
 * Manages complex race-to-talent mapping for special races like undead and unique naming conventions.
 * 
 * Key responsibilities:
 * - Processing raw race JSON data into normalized object structures
 * - Managing subrace relationships and experience penalties
 * - Handling fallback images for races without portraits (drem, krog, etc.)
 * - Complex race-to-talent mapping (whitehoof→whitehooves, ghoul→undead/ghoul)
 * - Loading and displaying racial talent trees with modal interactions
 * - Generating navigation HTML for race browsing
 * 
 * Special features:
 * - Race name mapping table for talent type resolution
 * - Async talent loading with completion tracking
 * - Fallback image generation for portrait-less races
 */

/**
 * Processes and normalizes race data after loading from JSON files.
 * Converts ID references to object references, processes subrace relationships,
 * handles fallback images for races without portraits, and creates lookup indexes.
 * 
 * @function fixupRaces
 * @param {Object} tome - ToME application context object
 * @throws {Error} If DATA_LOADER or race data is not available
 * @example
 * // Called automatically after race data is loaded
 * fixupRaces(tome);
 * // After fixup: data.races.race_list contains full race objects
 * // After fixup: subraces have experience penalties and image arrays
 */
function fixupRaces(tome) {
    var data = DATA_LOADER.getData();
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

/**
 * Generates navigation HTML for the races page.
 * Renders the race navigation template with current race data.
 * 
 * @function navRaces
 * @param {Object} tome - ToME application context object
 * @returns {string} HTML markup for race navigation with expandable race categories
 * @example
 * var raceNavHTML = navRaces(tome);
 * // Returns navigation with race categories and subcategories
 */
function navRaces(tome) {
    return Handlebars.templates.race_nav(DATA_LOADER.getData().races);
}

/**
 * Generates detailed race information page for a specific race.
 * Processes race talent data, handles special naming mappings for undead races,
 * and renders the complete race template with stats, subraces, and racial talents.
 * 
 * @function listRaces
 * @param {Object} tome - ToME application context object
 * @param {string} r - HTML ID of the race to display (e.g., "human", "elf")
 * @returns {string} HTML markup for the complete race page
 * @throws {Error} If race data is not found
 * @example
 * var humanRaceHTML = listRaces(tome, "human");
 * // Returns full race page with subraces, stats, and racial talents
 * 
 * var elfRaceHTML = listRaces(tome, "elf");
 * // Returns elf race page with Shalore and Thalore subraces
 */
function listRaces(tome, r) {
    var data = DATA_LOADER.getData();
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
            if (typeof mapping === 'object' && mapping.category && mapping.name) {
                // Handle category mapping (e.g., undead/ghoul)
                raceTalentType = mapping.category + '/' + mapping.name;
            } else if (typeof mapping === 'string' && mapping) {
                // Handle simple string mapping (e.g., race/whitehooves)
                raceTalentType = 'race/' + mapping;
            } else {
                // Fallback to default if mapping is malformed
                raceTalentType = 'race/' + (baseName || 'unknown');
            }
        } else {
            // Default: race category
            raceTalentType = 'race/' + (baseName || 'unknown');
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
    DATA_LOADER.loadDataIfNeeded('races', function(data) {
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
    var data = DATA_LOADER.getData();
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
                if (typeof mapping === 'object' && mapping.category && mapping.name) {
                    // Handle category mapping (e.g., undead/ghoul)
                    raceTalentType = mapping.category + '/' + mapping.name;
                    talentCategory = 'talents.' + mapping.category;
                    talentDataCategory = mapping.category;
                } else if (typeof mapping === 'string' && mapping) {
                    // Handle simple string mapping (e.g., race/whitehooves)
                    raceTalentType = 'race/' + mapping;
                    talentCategory = 'talents.race';
                    talentDataCategory = 'race';
                } else {
                    // Fallback to default if mapping is malformed
                    raceTalentType = 'race/' + (baseName || 'unknown');
                    talentCategory = 'talents.race';
                    talentDataCategory = 'race';
                }
            } else {
                // Default: race category
                raceTalentType = 'race/' + (baseName || 'unknown');
                talentCategory = 'talents.race';
                talentDataCategory = 'race';
            }
            
            // Load the talents from the appropriate category
            DATA_LOADER.loadDataIfNeeded(talentCategory, function() {
                // Find the talent tree that matches this race
                var talentData = DATA_LOADER.getData().talents[talentDataCategory];
                var talent_details = _.find(talentData, function(t) { 
                    return t.type == raceTalentType; 
                });
                
                if (talent_details) {
                    // Generate the talent HTML using the same template as classes
                    var talent_html = Handlebars.partials.class_talents_detail(talent_details);
                    var $container = $('.class-talents-detail[data-talent-type="' + toHtmlId(raceTalentType) + '"]');
                    $container.html(talent_html);
                    
                    // Apply current icon size settings
                    if (typeof UI_MANAGEMENT !== 'undefined' && UI_MANAGEMENT.imageSize) {
                        var currentSize = UI_MANAGEMENT.imageSize.get();
                        UI_MANAGEMENT.imageSize.applyIconSizeClasses(currentSize);
                    }
                }
                
                checkComplete();
            });
        })(subrace);
    }
}
