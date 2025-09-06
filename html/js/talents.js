/**
 * Talent System Management Module  
 * Handles talent data display, navigation generation, and category-based organization.
 * Manages the complex talent tree system with multiple categories and types.
 * 
 * Key responsibilities:
 * - Talent navigation with accordion-style category browsing
 * - Loading talent data on-demand by category (spell, technique, race, etc.)
 * - Displaying talent trees with detailed information and availability
 * - Preloading talent navigation data for responsive UI
 * - Class availability analysis showing which classes can learn each talent
 * - Talent image error handling with placeholder fallbacks
 * - Template rendering for talent listing and changes pages
 * 
 * Talent categories supported:
 * - base, celestial, chronomancy, corruption, cunning, cursed
 * - demented, golem, inscriptions, misc, other, psionic, race
 * - spell, steam, steamtech, technique, uber, undead, wild-gift
 * 
 * Navigation flow: Category selection → data loading → talent tree display → availability analysis
 */

/**
 * Error handler for broken talent images.
 * Replaces failed talent images with a default placeholder to maintain layout.
 * 
 * @function talentImgError
 * @param {HTMLImageElement} image - The image element that failed to load
 * @returns {boolean} Always returns true to prevent further error propagation
 * @example
 * // In HTML: <img src="talent.png" onerror="talentImgError(this)">
 * // Automatically replaces broken images with placeholder
 * 
 * @see {@link http://stackoverflow.com/a/92819/25507|Stack Overflow reference}
 */
function talentImgError(image) {
    image.onerror = "";
    image.src = "img/000000-0.png";
    return true;
}

/**
 * Generates navigation HTML for the talents page.
 * Renders the talent navigation template with current talent data.
 * 
 * @function navTalents
 * @param {Object} tome - ToME application context object
 * @returns {string} HTML markup for talent navigation with categories and types
 * @example
 * var talentNavHTML = navTalents(tome);
 * // Returns navigation with expandable talent categories
 */
function navTalents(tome) {
    return Handlebars.templates.talent_by_type_nav(DATA_LOADER.getData());
}

/**
 * Loads talent navigation data for a specific talent category.
 * Validates the category, checks for cached data, and triggers loading if needed.
 * 
 * @function loadNavTalents  
 * @param {jQuery} $el - jQuery element representing the navigation container
 * @throws {Error} If element ID is invalid or category is not recognized
 * @example
 * // Called when expanding talent category in navigation
 * loadNavTalents($('#nav-spell')); // Loads spell talents
 * loadNavTalents($('#nav-technique')); // Loads technique talents
 */
function loadNavTalents($el) {
   var elementId = $el.attr('id');
   var category = elementId.replace('nav-', '');
   
   // Validate that this is a valid talent category
   var validCategories = ['base', 'celestial', 'chronomancy', 'corruption', 'cunning', 'cursed', 
                         'demented', 'golem', 'inscriptions', 'misc', 'other', 'psionic', 'race', 
                         'spell', 'steam', 'steamtech', 'technique', 'uber', 'undead', 'wild-gift'];
   
   if (validCategories.indexOf(category) === -1) {
       return;
   }
   
   // Check if data is already loaded (due to preloading)
   var allData = DATA_LOADER.getData();
   var talentData = allData && allData.talents && allData.talents[category];
   
   if (talentData && talentData.length > 0) {
       // Data is already available, populate immediately
       fillNavTalents(allData, category);
   } else {
       // Fallback: load data if not preloaded (shouldn't happen normally)
       DATA_LOADER.loadDataIfNeeded('talents.' + category, function() {
           fillNavTalents(DATA_LOADER.getData(), category);
       });
   }
}

/**
 * Fills the navigation accordion with talent types for a specific category.
 * Renders talent type links within the accordion structure using Handlebars templates.
 * 
 * @function fillNavTalents
 * @param {Object} tome - ToME application context object
 * @param {string} category - Talent category name (e.g., "spell", "technique")
 * @example
 * fillNavTalents(tome, "spell"); // Fills spell category navigation
 * // Populates #nav-spell accordion with talent types like "elemental", "meta"
 */
function fillNavTalents(tome, category) {
    var $el = $("#nav-" + category);
    
    var allData = tome || DATA_LOADER.getData();
    var talentData = allData && allData.talents && allData.talents[category];
    
    // Safety check - if talents data isn't loaded yet, skip this call
    if (!allData || !allData.talents || !talentData || !talentData.length) {
        return;
    }
    
    var talent_types = allData.talents[category];
    
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

/**
 * Generates the main talent listing page for a specific category.
 * Renders talent trees with detailed information using Handlebars templates.
 * 
 * @function listTalents
 * @param {Object} tome - ToME application context object
 * @param {string} category - Talent category to display (e.g., "spell", "technique")
 * @returns {string} HTML markup for the talent listing page
 * @throws {Error} If template rendering fails
 * @example
 * var spellTalentsHTML = listTalents(tome, "spell");
 * // Returns complete talent page with expandable talent trees
 * 
 * var invalidHTML = listTalents(tome, "invalid-category");
 * // Returns warning message for missing data
 */
function listTalents(tome, category) {
    var allData = DATA_LOADER.getData();
    var talentData = allData && allData.talents && allData.talents[category];
    if (!talentData || !talentData.length) {
        return '<div class="alert alert-warning">Loading talent data...</div>';
    }
    
    try {
        return Handlebars.templates.talent_by_type(talentData);
    } catch (error) {
        return '<div class="alert alert-danger">Template error: ' + error.message + '</div>';
    }
}

/**
 * Generates HTML for talent changes across game versions.
 * Renders changelog information showing talent modifications between versions.
 * 
 * @function listChangesTalents
 * @param {Object} tome - ToME application context object
 * @returns {string} HTML markup for talent changes page
 * @example
 * var changesHTML = listChangesTalents(tome);
 * // Returns page showing talent buffs, nerfs, and modifications
 */
function listChangesTalents(tome) {
    return Handlebars.templates.changes_talents(DATA_LOADER.getData().changes.talents);
}

/**
 * Generates HTML for recent talent changes in the current game version.
 * Renders the most recent talent modifications and updates.
 * 
 * @function listRecentChangesTalents
 * @param {Object} tome - ToME application context object
 * @returns {string} HTML markup for recent talent changes page
 * @example
 * var recentHTML = listRecentChangesTalents(tome);
 * // Returns page showing latest talent changes in current version
 */
function listRecentChangesTalents(tome) {
    return Handlebars.templates.changes_talents(DATA_LOADER.getData()["recent-changes"].talents);
}

/**
 * Preloads all talent navigation data to eliminate accordion expansion delays
 */
function preloadTalentNavigationData() {
    
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
            
            // Optionally populate navigation immediately for categories that load quickly
            // This makes the navigation feel more responsive
            var $el = $("#nav-" + category);
            if ($el.length > 0) {
                fillNavTalents(DATA_LOADER.getData(), category);
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

        UI_MANAGEMENT.markupHintLinks();

        // HACK: Because we've changed page length, we probably just
        // invalidated scrollToId, so redo that. Is a better approach possible?
        scrollToId();
    });
}
