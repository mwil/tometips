// See http://stackoverflow.com/a/92819/25507
function talentImgError(image) {
    image.onerror = "";
    image.src = "img/000000-0.png";
    return true;
}

function navTalents(tome) {
    return Handlebars.templates.talent_by_type_nav(DATA_LOADER.getData());
}

function loadNavTalents($el) {
   var elementId = $el.attr('id');
   var category = elementId.replace('nav-', '');
   
   // Debug: Log what category we're trying to load
   console.log('loadNavTalents called with element ID:', elementId, 'extracted category:', category);
   
   // Validate that this is a valid talent category
   var validCategories = ['base', 'celestial', 'chronomancy', 'corruption', 'cunning', 'cursed', 
                         'demented', 'golem', 'inscriptions', 'misc', 'other', 'psionic', 'race', 
                         'spell', 'steam', 'steamtech', 'technique', 'uber', 'undead', 'wild-gift'];
   
   if (validCategories.indexOf(category) === -1) {
       console.warn('Invalid talent category:', category, 'Valid categories are:', validCategories);
       return;
   }
   
   // Check if data is already loaded (due to preloading)
   var talentData = DATA_LOADER.getData() && DATA_LOADER.getData().talents && DATA_LOADER.getData().talents[category];
   if (talentData) {
       // Data is already available, populate immediately
       console.log('Using preloaded data for category:', category);
       fillNavTalents(tome, category);
   } else {
       // Fallback: load data if not preloaded (shouldn't happen normally)
       console.log('Loading data for category (fallback):', category);
       DATA_LOADER.loadDataIfNeeded('talents.' + category, function() {
           fillNavTalents(tome, category);
       });
   }
}

function fillNavTalents(tome, category) {
    var $el = $("#nav-" + category);
    
    // Safety check - if talents data isn't loaded yet, skip this call
    if (!DATA_LOADER.getData() || !DATA_LOADER.getData().talents || !DATA_LOADER.getData().talents[category]) {
        return;
    }
    
    var talent_types = DATA_LOADER.getData().talents[category];
    
    // Find the accordion body within the accordion structure
    var $accordionBody = $el.find('.accordion-body');
    if ($accordionBody.length === 0) {
        // Fallback: if accordion body doesn't exist, target the element directly
        $accordionBody = $el;
    }
    
    if ($.trim($accordionBody.html()).length > 0) {
        // Nav already exists; no need to do more.
        return;
    }

    // Create list group for talent types within this category
    var talentLinksHtml = '<div class="list-group list-group-flush">';
    for (var i = 0; i < talent_types.length; i++) {
        talentLinksHtml += '<a href="#talents/' + toUnsafeHtmlId(talent_types[i].type) + currentQuery() + '" ' +
                          'class="list-group-item list-group-item-action border-0">' + 
                          toTitleCase(talent_types[i].name) + '</a>';
    }
    talentLinksHtml += '</div>';
    
    $accordionBody.html(talentLinksHtml);
}

function listTalents(tome, category) {
    var talentData = DATA_LOADER.getData().talents && DATA_LOADER.getData().talents[category];
    if (!talentData) {
        return '<div class="alert alert-warning">Loading talent data...</div>';
    }
    
    try {
        return Handlebars.templates.talent_by_type(talentData);
    } catch (error) {
        return '<div class="alert alert-danger">Template error: ' + error.message + '</div>';
    }
}

function listChangesTalents(tome) {
    return Handlebars.templates.changes_talents(DATA_LOADER.getData().changes.talents);
}

function listRecentChangesTalents(tome) {
    return Handlebars.templates.changes_talents(DATA_LOADER.getData()["recent-changes"].talents);
}

/**
 * Preloads all talent navigation data to eliminate accordion expansion delays
 */
function preloadTalentNavigationData() {
    console.log('Preloading talent navigation data...');
    
    // All valid talent categories (same list as in loadNavTalents)
    var validCategories = ['base', 'celestial', 'chronomancy', 'corruption', 'cunning', 'cursed', 
                          'demented', 'golem', 'inscriptions', 'misc', 'other', 'psionic', 'race', 
                          'spell', 'steam', 'steamtech', 'technique', 'uber', 'undead', 'wild-gift'];
    
    var loadedCount = 0;
    var totalCount = validCategories.length;
    
    // Load each category's data
    validCategories.forEach(function(category) {
        DATA_LOADER.loadDataIfNeeded('talents.' + category, function() {
            loadedCount++;
            console.log('Preloaded talent category:', category, '(' + loadedCount + '/' + totalCount + ')');
            
            // Optionally populate navigation immediately for categories that load quickly
            // This makes the navigation feel more responsive
            var $el = $("#nav-" + category);
            if ($el.length > 0) {
                fillNavTalents(tome, category);
            }
            
            if (loadedCount === totalCount) {
                console.log('All talent navigation data preloaded successfully!');
            }
        });
    });
}

/**Adds "Availability:" paragraphs to already rendered talent listings,
 * showing which classes can learn each talent. */
function fillTalentAvailability(tome, category) {
    var show;

    // Safety check for talent data
    if (!DATA_LOADER.getData() || !DATA_LOADER.getData().talents || !DATA_LOADER.getData().talents[category]) {
        return;
    }

    // The set of talent types we're interested in showing
    show = _.object(_.map(DATA_LOADER.getData().talents[category], function(t) {
        return [t.type, []];
    }));

    loadClassesIfNeeded(function() {
        var subclasses = DATA_LOADER.getData().classes.subclasses,
            sorted_subclasses = _.sortBy(subclasses, 'name');
        _.each(sorted_subclasses, function(sub) {
            _.each([ sub.talents_types_class, sub.talents_types_generic ], function(sub_talents_types) {
                _.each(sub_talents_types, function(value, key) {
                    var desc;
                    if (show[key]) {
                        if (sub.class_short_name) {
                            // No associated class = inaccessible subclass
                            // (like Tutorial Adventurer)
                            show[key].push(Handlebars.partials.talent_classes({ subclass: sub, value: value }));
                        }
                    }
                });
            });
        });

        _.each(show, function(value, key) {
            if (value.length) {
                $("#talents\\/" + key.replace('/', '\\/') + "-avail").html('Availability: ' + value.join(', '));
            }
        });

        markupHintLinks();

        // HACK: Because we've changed page length, we probably just
        // invalidated scrollToId, so redo that. Is a better approach possible?
        scrollToId();
    });
}
