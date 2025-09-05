function fixupClasses(tome) {
  var data = DATA_LOADER.getData();
    var c = data.classes;

    if (data.fixups.classes) {
        return;
    }

    // Replace IDs in class_list with references to the actual class definition.
    c.class_list = _.map(c.class_list, function(cls) { return c.classes[cls]; });

    // Store a reference from each subclass back to the class ID.
    _.each(c.classes, function(elem) {
        _.each(elem.subclass_list, function (sub) {
            c.subclasses[sub].class_short_name = elem.short_name;
        });
    });

    // Replace subclass IDs in each class's subclass_list with references
    // to the actual subclass definition.
    _.each(c.classes, function(elem) {
        elem.subclass_list = _.map(elem.subclass_list, function(sub) { return c.subclasses[sub]; });
        elem.single_subclass = elem.subclass_list.length == 1;
    });

    c.classes_by_id = indexByHtmlId(c.classes, 'short_name');

    data.fixups.classes = true;
}

function navClasses(tome) {
    return Handlebars.templates.class_nav(DATA_LOADER.getData().classes);
}

function listClasses(tome, cls) {
    var classData = JSON.parse(JSON.stringify(DATA_LOADER.getData().classes.classes_by_id[cls])); // Deep clone to avoid modifying original
    
    // Sort talent types for each subclass to put locked ones at the bottom
    if (classData && classData.subclass_list) {
        classData.subclass_list.forEach(function(subclass) {
            ['talents_types_class', 'talents_types_generic'].forEach(function(talentTypeKey) {
                if (subclass[talentTypeKey]) {
                    // Convert to sorted array for template use
                    var talentArray = Object.keys(subclass[talentTypeKey]).map(function(key) {
                        return {
                            key: key,
                            value: subclass[talentTypeKey][key],
                            isLocked: !subclass[talentTypeKey][key][0] // value.[0] indicates if unlocked
                        };
                    });
                    
                    // Sort: unlocked first, then locked
                    talentArray.sort(function(a, b) {
                        if (a.isLocked === b.isLocked) {
                            return a.key.localeCompare(b.key); // alphabetical within same lock status
                        }
                        return a.isLocked ? 1 : -1; // unlocked first
                    });
                    
                    // Replace object with sorted array
                    subclass[talentTypeKey + '_sorted'] = talentArray;
                }
            });
        });
    }
    
    return Handlebars.templates.class(classData);
}

function fillClassTalents(tome, cls, callback) {
    var data = DATA_LOADER.getData();
    var subclasses = data.classes.classes_by_id[cls].subclass_list,
        load_talents = {};

    // Setup talent modal handlers immediately
    setupTalentModalHandlers();

    function list_class_talents(value, key, list) {
        var category = key.split(/ ?\/ ?/)[0];
        load_talents[category] = load_talents[category] || {};
        load_talents[category][key] = true;
    }

    for (var i = 0; i < subclasses.length; i++) {
        _.each(subclasses[i].talents_types_class, list_class_talents);
        _.each(subclasses[i].talents_types_generic, list_class_talents);
    }

    var categories = _.keys(load_talents);
    var completed = 0;
    
    function checkComplete() {
        completed++;
        if (completed >= categories.length) {
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

    if (categories.length === 0) {
        // Set up handlers even when there are no categories
        setupTalentModalHandlers();
        if (callback) {
            callback();
        }
        return;
    }

    _.each(load_talents, function(talents, category, list) {
        DATA_LOADER.loadDataIfNeeded('talents.' + category, function() {
            _.each(talents, function(value, this_type, list) {
                // TODO: Should index talents by talent_type as well as sequential list to avoid the need to use _.find
                var talent_details = _.find(DATA_LOADER.getData().talents[category], function(t) { return t.type == this_type; });
                
                // Individual talents within each tree maintain their original order
                // The real "locked" concept applies to talent trees, not individual talents
                
                var talent_html = Handlebars.partials.class_talents_detail(talent_details);
                var $container = $('.class-talents-detail[data-talent-type="' + toHtmlId(this_type) + '"]');
                $container.html(talent_html);
                
                // Apply current icon size class for proper spacing
                if (typeof imgSizeSettings !== 'undefined') {
                    var currentSize = imgSizeSettings.get();
                    $container.removeClass('icon-size-32 icon-size-48 icon-size-64')
                             .addClass('icon-size-' + currentSize);
                    
                    // Also apply spacing to parent list items
                    imgSizeSettings.applyIconSizeClasses(currentSize);
                }
            });

            markupHintLinks();
            setupTalentModalHandlers();
            checkComplete();
        });
    });
}

/**Sets up event handlers for individual talent links to show modal popups */
function setupTalentModalHandlers() {
    // Remove any existing handlers completely
    $(document).off('click', '.individual-talent-link');
    
    // Handle clicks on individual talent icons
    $(document).on('click', '.individual-talent-link', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var $link = $(this);
        var talentId = $link.data('talent-id');
        var talentType = $link.data('talent-type');
        var talentName = $link.data('talent-name');
        
        // Show loading state
        showTalentModal({
            name: talentName,
            id: talentId,
            type: talentType,
            info_text: '<p class="text-center"><i class="fa fa-spinner fa-spin"></i> Loading talent data...</p>'
        });
        
        // Load the specific talent data
        loadIndividualTalentData(talentId, talentType, talentName);
        
        return false;
    });
    
    // Handle individual talent clicks within modal
    $(document).off('click.individualTalent', '.individual-talent');
    $(document).on('click.individualTalent', '.individual-talent', function() {
        var talentId = $(this).data('talent-id');
        var talentType = $('#talent-modal').data('current-talent-type');
        
        // Find the specific talent data
        var category = talentType.split('/')[0];
        DATA_LOADER.loadDataIfNeeded('talents.' + category, function() {
            var talentTree = _.find(DATA_LOADER.getData().talents[category], function(t) { return t.type == talentType; });
            if (talentTree && talentTree.talents) {
                var individualTalent = _.find(talentTree.talents, function(t) { return t.id == talentId; });
                if (individualTalent) {
                    showTalentModal(individualTalent);
                }
            }
        });
    });
}

/**Loads individual talent data for the modal */
function loadIndividualTalentData(talentId, talentType, talentName) {
    var category = talentType.split('/')[0];
    
    DATA_LOADER.loadDataIfNeeded('talents.' + category, function() {
        var talentTree = _.find(DATA_LOADER.getData().talents[category], function(t) { return t.type == talentType; });
        
        if (talentTree && talentTree.talents) {
            var individualTalent = _.find(talentTree.talents, function(t) { return t.id == talentId; });
            if (individualTalent) {
                showTalentModal(individualTalent);
            } else {
                showTalentModal({
                    name: talentName,
                    id: talentId,
                    type: talentType,
                    info_text: '<p class="text-danger">Error: Could not find talent "' + talentId + '" in talent tree.</p>'
                });
            }
        } else {
            showTalentModal({
                name: talentName,
                id: talentId,
                type: talentType,
                info_text: '<p class="text-danger">Error: Could not load talent tree data.</p>'
            });
        }
    });
}

/**Loads talent data for the modal */
function loadTalentModalData(talentType, displayName) {
    var category = talentType.split('/')[0];
    
    DATA_LOADER.loadDataIfNeeded('talents.' + category, function() {
        var talentTree = _.find(DATA_LOADER.getData().talents[category], function(t) { return t.type == talentType; });
        
        if (talentTree) {
            // Store current talent type for individual talent clicks
            $('#talent-modal').data('current-talent-type', talentType);
            
            showTalentModal(talentTree);
        } else {
            showTalentModal({
                name: displayName,
                type: talentType,
                info_text: '<p class="text-danger">Error: Could not load talent data.</p>'
            });
        }
    });
}

/**Shows the talent modal with given talent data */
function showTalentModal(talentData) {
    try {
        // Ensure modal container exists
        if (!$('#talent-modal').length) {
            $('body').append('<div id="talent-modal-container"></div>');
        }
        
        // Check if template exists
        if (!Handlebars.templates.talent_modal) {
            return;
        }
        
        // Render modal with talent data
        var modalHtml = Handlebars.templates.talent_modal(talentData);
        $('#talent-modal-container').html(modalHtml);
        
        // Show modal
        $('#talent-modal').modal('show');
        
        // Enable tooltips for any new content
        if (typeof enableTalentTooltips === 'function') {
            enableTalentTooltips();
        }
    } catch (error) {
        alert('Error loading talent data: ' + error.message);
    }
}

/**loadDataIfNeeded for classes */
function loadClassesIfNeeded(success) {
    DATA_LOADER.loadDataIfNeeded('classes', function(data) {
        fixupClasses(tome);
        success(data);
    });
}

// Simple talent popup functions
function showSimpleTalentPopup(talentId, talentType, talentName) {
    // Create popup HTML if it doesn't exist
    if (!$('#talent-popup-overlay').length) {
        $('body').append(`
            <div id="talent-popup-overlay" class="ui-popup-talent">
                <div id="talent-popup">
                    <div class="popup-header">
                        <h3 id="talent-popup-title">Loading...</h3>
                        <button class="popup-close">&times;</button>
                    </div>
                    <div class="popup-content" id="talent-popup-content">
                        <p><i class="fa fa-spinner fa-spin"></i> Loading talent data...</p>
                    </div>
                </div>
            </div>
        `);
        
        // Set up close handlers
        $('#talent-popup-overlay').on('click', function(e) {
            if (e.target === this) {
                hideSimpleTalentPopup();
            }
        });
        
        $('.popup-close').on('click', function() {
            hideSimpleTalentPopup();
        });
        
        // ESC key to close
        $(document).on('keyup.talentPopup', function(e) {
            if (e.keyCode === 27) { // ESC
                hideSimpleTalentPopup();
            }
        });
        
        // Close popup when talent link is clicked
        $(document).on('click', '.talent-popup-link', function() {
            hideSimpleTalentPopup();
        });
    }
    
    // Show popup
    $('#talent-popup-overlay').show();
    
    // Debug: Log popup dimensions for mobile testing
    console.log('Mobile popup debug:', {
        popupWidth: $('#talent-popup').outerWidth(),
        popupHeight: $('#talent-popup').outerHeight(),
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        computedMaxWidth: $('#talent-popup').css('max-width'),
        computedMaxHeight: $('#talent-popup').css('max-height')
    });
    // Create link to the specific talent page - format matches template: #talents/type/talent_id_html_encoded
    // Use toUnsafeHtmlId for talent type and toHtmlId for talent ID (matches template logic)
    var talentUrl = '#talents/' + toUnsafeHtmlId(talentType) + '/' + toHtmlId(talentId);
    $('#talent-popup-title').html('<a href="' + talentUrl + '" class="talent-popup-link">' + talentName + '</a>');
    $('#talent-popup-content').html('<p><i class="fa fa-spinner fa-spin"></i> Loading talent data...</p>');
    
    // Load talent data
    loadSimpleTalentData(talentId, talentType, talentName);
}

function hideSimpleTalentPopup() {
    $('#talent-popup-overlay').hide();
    $(document).off('keyup.talentPopup');
}

function loadSimpleTalentData(talentId, talentType, talentName) {
    var category = talentType.split('/')[0];
    
    // Check if data exists first
    var data = DATA_LOADER.getData();
    if (!data.talents) {
        $('#talent-popup-content').html('<p style="color: #ff6b6b;">Error: No talent data loaded.</p>');
        return;
    }
    
    if (!data.talents[category]) {
        $('#talent-popup-content').html('<p style="color: #ff6b6b;">Error: Talent category "' + category + '" not found.<br>Available categories: ' + Object.keys(data.talents).join(', ') + '</p>');
        return;
    }
    
    DATA_LOADER.loadDataIfNeeded('talents.' + category, function() {
        var talentTree = _.find(DATA_LOADER.getData().talents[category], function(t) { return t.type == talentType; });
        
        if (talentTree && talentTree.talents) {
            var individualTalent = _.find(talentTree.talents, function(t) { return t.id == talentId; });
            
            if (individualTalent) {
                displaySimpleTalentData(individualTalent);
            } else {
                $('#talent-popup-content').html('<p style="color: #ff6b6b;">Error: Could not find talent "' + talentId + '" in talent tree.<br>Available talents: ' + talentTree.talents.map(function(t) { return t.id; }).join(', ') + '</p>');
            }
        } else {
            $('#talent-popup-content').html('<p style="color: #ff6b6b;">Error: Could not load talent tree "' + talentType + '".</p>');
        }
    });
}

function displaySimpleTalentData(talent) {
    // Update the popup title to include the talent icon (card-style header)
    updateTalentPopupHeader(talent);
    
    var html = '';
    
    // Add stats table (without floating image since it's now in the header)
    if (talent.mode || talent.cost || talent.range || talent.cooldown || talent.use_speed) {
        html += '<table style="border: none; background: transparent; margin-bottom: 15px; width: 100%;">';
        
        if (talent.mode) {
            html += '<tr><td style="border: none; padding: 4px 0; width: 120px; font-weight: bold; background: transparent;">Use Mode:</td><td style="border: none; padding: 4px 0; background: transparent;">' + talent.mode + '</td></tr>';
        }
        
        if (talent.cost) {
            html += '<tr><td style="border: none; padding: 4px 0; width: 120px; font-weight: bold; background: transparent;">Cost:</td><td style="border: none; padding: 4px 0; background: transparent;">' + talent.cost + '</td></tr>';
        }
        
        if (talent.range) {
            html += '<tr><td style="border: none; padding: 4px 0; width: 120px; font-weight: bold; background: transparent;">Range:</td><td style="border: none; padding: 4px 0; background: transparent;">' + talent.range + '</td></tr>';
        }
        
        if (talent.cooldown) {
            html += '<tr><td style="border: none; padding: 4px 0; width: 120px; font-weight: bold; background: transparent;">Cooldown:</td><td style="border: none; padding: 4px 0; background: transparent;">' + talent.cooldown + '</td></tr>';
        }
        
        if (talent.use_speed) {
            html += '<tr><td style="border: none; padding: 4px 0; width: 120px; font-weight: bold; background: transparent;">Use Speed:</td><td style="border: none; padding: 4px 0; background: transparent;">' + talent.use_speed + '</td></tr>';
        }
        
        html += '</table>';
        
        // Add separator line between stats and description
        html += '<hr style="border: 0; height: 1px; background: #ddd; margin: 15px 0;">';
    }
    
    // Add description
    if (talent.info_text) {
        html += '<div>' + talent.info_text + '</div>';
    }
    
    $('#talent-popup-content').html(html);
}

function updateTalentPopupHeader(talent) {
    // Create card-style header with icon and name
    var displaySize = (typeof imgSizeSettings !== 'undefined') ? imgSizeSettings.get() : 48;
    var headerHtml = '';
    
    // Add talent icon inline with the title
    if (talent.image) {
        headerHtml += '<img width="' + displaySize + '" height="' + displaySize + '" src="img/talents/96/' + talent.image + '" style="vertical-align: middle; margin-right: 12px; width: ' + displaySize + 'px !important; height: ' + displaySize + 'px !important;" onerror="talentImgError(this)">';
    }
    
    // Add talent name as a link (preserving existing functionality)
    var talentUrl = '#talents/' + toUnsafeHtmlId(talent.type || '') + '/' + toHtmlId(talent.id || '');
    headerHtml += '<a href="' + talentUrl + '" class="talent-popup-link" style="vertical-align: middle; text-decoration: none; color: inherit;">' + (talent.name || 'Unknown Talent') + '</a>';
    
    $('#talent-popup-title').html(headerHtml);
}
