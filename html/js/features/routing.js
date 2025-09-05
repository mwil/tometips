/**
 * Routing Module
 * Handles URL routing with crossroads.js and hasher.js integration
 */

var ROUTING = (function() {
    'use strict';
    
    var routes = {};
    var base_title = document.title;
    
    // =======================
    // UTILITY FUNCTIONS
    // =======================
    
    /**
     * Parse hash and route to appropriate handler
     */
    function parseHash(newHash, oldHash) {
        // Handle version redirects first
        if (typeof VERSION_MANAGEMENT !== 'undefined' && 
            VERSION_MANAGEMENT.versions.redirectMasterToDefault(newHash, oldHash)) {
            return;
        }
        
        // Save expanded state before routing
        if (typeof getExpandedIds === 'function') {
            prev_expanded = getExpandedIds();
        }
        
        // Clear content and set loading state
        $("#content").html("Loading...");
        
        // Parse and route
        crossroads.parse(newHash);
    }
    
    /**
     * Set active navigation item
     */
    function setActiveNav(active_nav_route) {
        $(".nav li").removeClass("active");
        if (active_nav_route) {
            $(".nav a[data-base-href='" + active_nav_route + "']").parent().addClass("active");
        }
    }
    
    /**
     * Update navigation links with current query parameters
     */
    function updateNav() {
        // Update nav links to use the current version query.
        $("a[data-base-href]").each(function () {
            $(this).attr('href', $(this).attr('data-base-href') + currentQuery());
        });
    }
    
    // =======================
    // ROUTE HANDLERS
    // =======================
    
    /**
     * Initialize all route definitions
     */
    function initializeRoutes() {
        routes = {
            // Default route - redirect to classes overview
            default_route: crossroads.addRoute(':?query:', function(query) {
                // Redirect to classes overview instead of showing news
                hasher.replaceHash('classes' + (query ? '?' + query : ''));
            }),

            // Updates for previous versions of the site.
            reroute1: crossroads.addRoute('changes/talents?ver=1.2.0dev', function() {
                hasher.replaceHash('changes/talents?ver=master');
            }),

            changes_talents: crossroads.addRoute('changes/talents:?query:', function(query) {
                routes.talents.matched.dispatch(query);
                $("#content-container").scrollTop(0);
            }),

            recent_changes_talents: crossroads.addRoute('recent-changes/talents:?query:', function(query) {
                // TODO: Remove duplication with changes_talents route
                routes.talents.matched.dispatch(query);
            }),

            talents: crossroads.addRoute('talents:?query:', function(query) {
                if (typeof VERSION_MANAGEMENT !== 'undefined') {
                    VERSION_MANAGEMENT.versions.update(query);
                }
                document.title = base_title + ' - Talents';
                setActiveNav("#talents");

                if (!$("#nav-talents").length) {
                    DATA_LOADER.loadDataIfNeeded('', function() {
                        $("#side-nav").html(createMobileNavigation(navTalents(DATA_LOADER.getData())));
                        load_nav_data_handler = loadNavTalents;
                        $("#content").html($("#news").html());
                        
                        // Preload all talent navigation data to eliminate accordion delays
                        preloadTalentNavigationData();
                    });
                }
            }),

            talents_category: crossroads.addRoute("talents/{category}:?query:", function(category, query) {
                routes.talents.matched.dispatch(query);
                document.title += ' - ' + toTitleCase(category);

                $("#content-container").scrollTop(0);
                DATA_LOADER.loadDataIfNeeded('talents.' + category, function() {
                    
                    var this_nav = "#nav-" + category;
                    // Bootstrap 5 accordion handles expand/collapse automatically
                    // Just need to ensure the navigation content is populated
                    
                    if (typeof fillNavTalents === 'function') {
                        fillNavTalents(DATA_LOADER.getData(), category);
                    }
                    $("#content").html(listTalents(DATA_LOADER.getData(), category));
                    UTILS.scrollToId();

                    // Convert Bootstrap 3 attributes to Bootstrap 5 for talent panels
                    if (typeof convertBootstrapAttributes === 'function') {
                        convertBootstrapAttributes();
                    }
                    var expandingAll = false;
                    
                    $(".expand-all").on('click', function() {
                        expandingAll = true;
                        setTimeout(function() { expandingAll = false; }, 1000);
                    });

                    var isScrolling = false;
                    $(document).on('shown.bs.collapse', '.talent-details.collapse', function () {
                        if (expandingAll || isScrolling) return;
                        
                        var $this = $(this);
                        var targetOffset = $this.offset().top - 100; // 100px buffer from top
                        var currentScroll = $(window).scrollTop();
                        var windowHeight = $(window).height();
                        
                        // Only scroll if the element is not visible or not near the top
                        if (targetOffset < currentScroll || targetOffset > (currentScroll + windowHeight * 0.7)) {
                            isScrolling = true;
                            $('html, body').animate({
                                scrollTop: targetOffset
                            }, 300, function() {
                                isScrolling = false;
                            });
                        }
                    });

                    if (typeof enableTalentTooltips === 'function') {
                        enableTalentTooltips();
                    }

                    if (typeof fillTalentAvailability === 'function') {
                        fillTalentAvailability(DATA_LOADER.getData(), category);
                    }
                    if (typeof updateFinished === 'function') {
                        updateFinished();
                    }
                });
            }),

            talents_category_type: crossroads.addRoute("talents/{category}/{type}:?query:", function(category, type, query) {
                routes.talents_category.matched.dispatch(category, query);
            }),

            talents_category_type_id: crossroads.addRoute("talents/{category}/{type}/{talent_id}:?query:", function(category, type, talent_id, query) {
                // Load the category page - it will automatically call scrollToId() when done
                // The scrollToId() function will find the element with ID: talents/category/type/talent_id
                routes.talents_category.matched.dispatch(category, query);
            }),

            races: crossroads.addRoute('races:?query:', function(query) {
                if (typeof VERSION_MANAGEMENT !== 'undefined') {
                    VERSION_MANAGEMENT.versions.update(query);
                }
                document.title = base_title + ' - Races';
                setActiveNav("#races");

                DATA_LOADER.loadDataIfNeeded("races", function() {
                    // Ensure races data is processed
                    if (typeof fixupRaces === 'function') {
                        fixupRaces(DATA_LOADER.getData());
                    }
                    
                    // For races overview, show the news content like the original
                    if (typeof navRaces === 'function') {
                        $("#side-nav").html(createMobileNavigation(navRaces(DATA_LOADER.getData())));
                    }
                    // Show news/overview content for races main page
                    if ($("#news").length) {
                        $("#content").html($("#news").html());
                    } else {
                        $("#content").html('<div class="container"><h2>Races</h2><p>Select a race from the navigation to view details.</p></div>');
                    }
                    UTILS.scrollToId();
                    if (typeof updateFinished === 'function') {
                        updateFinished();
                    }
                });
            }),

            races_race: crossroads.addRoute("races/{r}:?query:", function(r, query) {
                if (typeof VERSION_MANAGEMENT !== 'undefined') {
                    VERSION_MANAGEMENT.versions.update(query);
                }
                setActiveNav("#races");

                DATA_LOADER.loadDataIfNeeded("races", function() {
                    // Ensure races data is processed
                    if (typeof fixupRaces === 'function') {
                        fixupRaces(DATA_LOADER.getData());
                    }
                    
                    // Ensure sidebar navigation is populated
                    if (!$("#nav-races").length || !$("#races-navigation").length) {
                        $("#side-nav").html(UI_MANAGEMENT.createMobileNavigation(navRaces(DATA_LOADER.getData())));
                    }
                    
                    var raceData = DATA_LOADER.getData().races && DATA_LOADER.getData().races.races_by_id && DATA_LOADER.getData().races.races_by_id[r];
                    if (raceData && raceData.name) {
                        document.title = base_title + ' - ' + raceData.name;
                    } else {
                        document.title = base_title + ' - Race';
                    }

                    // Expand the appropriate race accordion section
                    setTimeout(function() {
                        var $raceAccordion = $("#nav-" + r);
                        if ($raceAccordion.length && !$raceAccordion.hasClass('show')) {
                            $raceAccordion.collapse('show');
                        }
                    }, 100);

                    if (typeof listRaces === 'function') {
                        $("#content").html(listRaces(DATA_LOADER.getData(), r));
                    } else {
                        $("#content").html('<p>Loading race: ' + r + '...</p>');
                    }
                    if (typeof enableTalentTooltips === 'function') {
                        enableTalentTooltips();
                    }
                    if (typeof fillRaceTalents === 'function') {
                        fillRaceTalents(DATA_LOADER.getData(), r);
                    }

                    UTILS.scrollToId();
                    if (typeof updateFinished === 'function') {
                        updateFinished();
                    }
                });
            }),

            races_race_subrace: crossroads.addRoute("races/{r}/{subrace}:?query:", function(r, subrace, query) {
                // For subrace routes, load the parent race page but skip the scroll-to-top behavior
                if (typeof VERSION_MANAGEMENT !== 'undefined') {
                    VERSION_MANAGEMENT.versions.update(query);
                }
                setActiveNav("#races");

                DATA_LOADER.loadDataIfNeeded("races", function() {
                    // Ensure races data is processed
                    if (typeof fixupRaces === 'function') {
                        fixupRaces(DATA_LOADER.getData());
                    }
                    
                    // Ensure sidebar navigation is populated
                    if (!$("#nav-races").length || !$("#races-navigation").length) {
                        $("#side-nav").html(UI_MANAGEMENT.createMobileNavigation(navRaces(DATA_LOADER.getData())));
                    }
                    
                    var raceData = DATA_LOADER.getData().races && DATA_LOADER.getData().races.races_by_id && DATA_LOADER.getData().races.races_by_id[r];
                    var raceName = (raceData && raceData.name) ? raceData.name : 'Race';
                    document.title = base_title + ' - ' + raceName + ' - ' + toTitleCase(subrace);

                    // Expand the appropriate race accordion section
                    setTimeout(function() {
                        var $raceAccordion = $("#nav-" + r);
                        if ($raceAccordion.length && !$raceAccordion.hasClass('show')) {
                            $raceAccordion.collapse('show');
                        }
                    }, 100);

                    if (typeof listRaces === 'function') {
                        $("#content").html(listRaces(DATA_LOADER.getData(), r));
                    } else {
                        $("#content").html('<p>Loading race: ' + r + '...</p>');
                    }
                    if (typeof enableTalentTooltips === 'function') {
                        enableTalentTooltips();
                    }
                    if (typeof fillRaceTalents === 'function') {
                        fillRaceTalents(DATA_LOADER.getData(), r);
                    }

                    UTILS.scrollToId();
                    if (typeof updateFinished === 'function') {
                        updateFinished();
                    }
                });
            }),

            classes: crossroads.addRoute('classes:?query:', function(query) {
                if (typeof VERSION_MANAGEMENT !== 'undefined') {
                    VERSION_MANAGEMENT.versions.update(query);
                }
                document.title = base_title + ' - Classes';
                setActiveNav("#classes");

                DATA_LOADER.loadDataIfNeeded("classes", function() {
                    // Ensure classes data is processed
                    if (typeof fixupClasses === 'function') {
                        fixupClasses(DATA_LOADER.getData());
                    }
                    
                    // For classes overview, show the news content like the original
                    if (typeof navClasses === 'function') {
                        $("#side-nav").html(createMobileNavigation(navClasses(DATA_LOADER.getData())));
                    }
                    // Show news/overview content for classes main page
                    if ($("#news").length) {
                        $("#content").html($("#news").html());
                    } else {
                        $("#content").html('<div class="container"><h2>Classes</h2><p>Select a class from the navigation to view details.</p></div>');
                    }
                    UTILS.scrollToId();
                    if (typeof updateFinished === 'function') {
                        updateFinished();
                    }
                });
            }),

            classes_class: crossroads.addRoute("classes/{cls}:?query:", function(cls, query) {
                if (typeof VERSION_MANAGEMENT !== 'undefined') {
                    VERSION_MANAGEMENT.versions.update(query);
                }
                setActiveNav("#classes");

                DATA_LOADER.loadDataIfNeeded("classes", function() {
                    // Ensure classes data is processed
                    if (typeof fixupClasses === 'function') {
                        fixupClasses(DATA_LOADER.getData());
                    }
                    
                    // Ensure sidebar navigation is populated
                    if (!$("#nav-classes").length || !$("#classes-navigation").length) {
                        $("#side-nav").html(UI_MANAGEMENT.createMobileNavigation(navClasses(DATA_LOADER.getData())));
                    }
                    
                    var classData = DATA_LOADER.getData().classes && DATA_LOADER.getData().classes.classes_by_id && DATA_LOADER.getData().classes.classes_by_id[cls];
                    if (classData && classData.name) {
                        document.title = base_title + ' - ' + classData.name;
                    } else {
                        document.title = base_title + ' - Class';
                    }

                    // Expand the appropriate class accordion section
                    setTimeout(function() {
                        var $classAccordion = $("#nav-" + cls);
                        if ($classAccordion.length && !$classAccordion.hasClass('show')) {
                            $classAccordion.collapse('show');
                        }
                    }, 100);

                    if (typeof listClasses === 'function') {
                        $("#content").html(listClasses(DATA_LOADER.getData(), cls));
                    } else {
                        $("#content").html('<p>Loading class: ' + cls + '...</p>');
                    }
                    if (typeof enableTalentTooltips === 'function') {
                        enableTalentTooltips();
                    }
                    if (typeof fillClassTalents === 'function') {
                        fillClassTalents(DATA_LOADER.getData(), cls);
                    }
                    if (typeof fillTalentAvailability === 'function') {
                        fillTalentAvailability(DATA_LOADER.getData(), 'class/' + cls);
                    }

                    UTILS.scrollToId();
                    if (typeof updateFinished === 'function') {
                        updateFinished();
                    }
                });
            }),

            classes_class_subclass: crossroads.addRoute("classes/{cls}/{subclass}:?query:", function(cls, subclass, query) {
                // For subclass routes, load the parent class page but skip the scroll-to-top behavior
                if (typeof VERSION_MANAGEMENT !== 'undefined') {
                    VERSION_MANAGEMENT.versions.update(query);
                }
                setActiveNav("#classes");

                DATA_LOADER.loadDataIfNeeded("classes", function() {
                    // Ensure classes data is processed
                    if (typeof fixupClasses === 'function') {
                        fixupClasses(DATA_LOADER.getData());
                    }
                    
                    // Ensure sidebar navigation is populated
                    if (!$("#nav-classes").length || !$("#classes-navigation").length) {
                        $("#side-nav").html(UI_MANAGEMENT.createMobileNavigation(navClasses(DATA_LOADER.getData())));
                    }
                    
                    var classData = DATA_LOADER.getData().classes && DATA_LOADER.getData().classes.classes_by_id && DATA_LOADER.getData().classes.classes_by_id[cls];
                    var className = (classData && classData.name) ? classData.name : 'Class';
                    document.title = base_title + ' - ' + className + ' - ' + toTitleCase(subclass);

                    // Expand the appropriate class accordion section
                    setTimeout(function() {
                        var $classAccordion = $("#nav-" + cls);
                        if ($classAccordion.length && !$classAccordion.hasClass('show')) {
                            $classAccordion.collapse('show');
                        }
                    }, 100);

                    if (typeof listClasses === 'function') {
                        $("#content").html(listClasses(DATA_LOADER.getData(), cls));
                    } else {
                        $("#content").html('<p>Loading class: ' + cls + '...</p>');
                    }
                    if (typeof enableTalentTooltips === 'function') {
                        enableTalentTooltips();
                    }
                    if (typeof fillClassTalents === 'function') {
                        fillClassTalents(DATA_LOADER.getData(), cls);
                    }
                    if (typeof fillTalentAvailability === 'function') {
                        fillTalentAvailability(DATA_LOADER.getData(), 'class/' + cls);
                    }

                    UTILS.scrollToId();
                    if (typeof updateFinished === 'function') {
                        updateFinished();
                    }
                });
            }),

            items: crossroads.addRoute('items:?query:', function(query) {
                if (typeof VERSION_MANAGEMENT !== 'undefined') {
                    VERSION_MANAGEMENT.versions.update(query);
                }
                document.title = base_title + ' - Items';
                setActiveNav("#items");

                if (!$("#nav-items").length) {
                    if (typeof loadItemsData === 'function') {
                        loadItemsData().then(function() {
                            if (typeof navItems === 'function') {
                                $("#side-nav").html(createMobileNavigation(navItems()));
                            }
                            if (typeof listItems === 'function') {
                                $("#content").html(listItems('all'));
                            } else {
                                $("#content").html('<p>Items navigation loaded</p>');
                            }
                        });
                    } else {
                        $("#content").html('<p>Loading items...</p>');
                    }
                }
            }),

            items_category: crossroads.addRoute("items/{category}:?query:", function(category, query) {
                routes.items.matched.dispatch(query);
                document.title += ' - ' + toTitleCase(category);

                DATA_LOADER.loadDataIfNeeded("items", function() {
                    if (typeof listItems === 'function') {
                        $("#content").html(listItems(category));
                    } else {
                        $("#content").html('<p>Loading items for category: ' + category + '...</p>');
                    }
                    UTILS.scrollToId();
                    if (typeof updateFinished === 'function') {
                        updateFinished();
                    }
                });
            }),

            items_subcategory: crossroads.addRoute("items/{category}/{subcategory}:?query:", function(category, subcategory, query) {
                routes.items.matched.dispatch(query);
                document.title += ' - ' + toTitleCase(category) + ' - ' + toTitleCase(subcategory);

                DATA_LOADER.loadDataIfNeeded("items", function() {
                    if (typeof listItems === 'function') {
                        $("#content").html(listItems(category, subcategory));
                    } else {
                        $("#content").html('<p>Loading items for category: ' + category + '/' + subcategory + '...</p>');
                    }
                    UTILS.scrollToId();
                    if (typeof updateFinished === 'function') {
                        updateFinished();
                    }
                });
            }),

            items_subgroup: crossroads.addRoute("items/{category}/{subcategory}/{subgroup}:?query:", function(category, subcategory, subgroup, query) {
                routes.items_subcategory.matched.dispatch(category, subcategory, query);
            }),

            items_item: crossroads.addRoute("items/{category}/{itemId}:?query:", function(category, itemId, query) {
                routes.items_category.matched.dispatch(category, query);
            })
        };

        // Configure crossroads
        crossroads.shouldTypecast = true;

        // Configure hasher
        hasher.prependHash = '';
        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        
        // Add Google Analytics tracking
        if (typeof _gaq !== 'undefined') {
            hasher.changed.add(function() { 
                if (typeof _gaq !== 'undefined') {
                    _gaq.push(['_trackPageview', location.pathname + location.search + location.hash]);
                }
            });
        }
        
        // Add Google Ad refresh if available
        if (typeof googletag !== 'undefined' && googletag.pubads) {
            hasher.changed.add(function() { googletag.pubads().refresh([ad_slot]); });
        }
        
        hasher.init();
    }
    
    // =======================
    // PUBLIC API
    // =======================
    
    return {
        // Navigation Management
        setActiveNav: setActiveNav,
        updateNav: updateNav,
        
        // Route System
        initializeRoutes: initializeRoutes,
        parseHash: parseHash,
        
        // Route Access
        get routes() {
            return routes;
        },
        
        /**
         * Navigate to a specific hash
         */
        navigateTo: function(hash) {
            hasher.setHash(hash);
        },
        
        /**
         * Replace current hash without adding to history
         */
        replaceHash: function(hash) {
            hasher.replaceHash(hash);
        }
    };
})();