/**
 * Classes Feature Module
 * Handles character classes and subclasses functionality
 */

(function(window) {
    'use strict';

    // Ensure namespace exists
    window.ToMEFeatures = window.ToMEFeatures || {};

    /**
     * Classes feature module
     */
    const ClassesFeature = {
        name: 'classes',
        dependencies: ['core'],
        initialized: false,

        /**
         * Initialize the classes feature
         */
        async init() {
            if (this.initialized) return;

            // Load required templates
            await window.TemplateRegistry.loadFeature('classes');
            await window.TemplateRegistry.loadFeature('shared');

            this.initialized = true;
            console.log('Classes feature initialized');
        },

        /**
         * Fix up classes data with cross-references
         * @param {Object} tome - The tome data object
         */
        fixupClasses(tome) {
            const data = window.ToMECore.getData();
            const c = data.classes;

            if (data.fixups.classes) {
                return;
            }

            // Replace IDs in class_list with references to the actual class definition
            c.class_list = _.map(c.class_list, function(cls) { 
                return c.classes[cls]; 
            });

            // Store a reference from each subclass back to the class ID
            _.each(c.classes, function(elem) {
                _.each(elem.subclass_list, function (sub) {
                    c.subclasses[sub].class_short_name = elem.short_name;
                });
            });

            // Replace subclass IDs in each class's subclass_list with references
            // to the actual subclass definition
            _.each(c.classes, function(elem) {
                elem.subclass_list = _.map(elem.subclass_list, function(sub) { 
                    return c.subclasses[sub]; 
                });
                elem.single_subclass = elem.subclass_list.length == 1;
            });

            c.classes_by_id = window.ToMECore.indexByHtmlId(c.classes, 'short_name');

            data.fixups.classes = true;
        },

        /**
         * Generate navigation for classes
         * @param {Object} tome - The tome data object
         * @returns {string} HTML for classes navigation
         */
        navClasses(tome) {
            return Handlebars.templates.class_nav(window.ToMECore.getData().classes);
        },

        /**
         * List classes with detailed information
         * @param {Object} tome - The tome data object
         * @param {string} cls - Class short name
         * @returns {string} HTML for class listing
         */
        listClasses(tome, cls) {
            const classData = JSON.parse(JSON.stringify(
                window.ToMECore.getData().classes.classes_by_id[cls]
            )); // Deep clone to avoid modifying original
            
            // Sort talent types for each subclass to put locked ones at the bottom
            if (classData && classData.subclass_list) {
                classData.subclass_list.forEach(function(subclass) {
                    ['talents_types_class', 'talents_types_generic'].forEach(function(talentTypeKey) {
                        if (subclass[talentTypeKey]) {
                            // Convert to sorted array for template use
                            const talentArray = Object.keys(subclass[talentTypeKey]).map(function(key) {
                                return {
                                    key: key,
                                    value: subclass[talentTypeKey][key],
                                    isLocked: !subclass[talentTypeKey][key][0] // value.[0] indicates if unlocked
                                };
                            });

                            // Sort: unlocked first, then locked, alphabetically within each group
                            talentArray.sort(function(a, b) {
                                if (a.isLocked === b.isLocked) {
                                    return a.key.localeCompare(b.key);
                                }
                                return a.isLocked ? 1 : -1;
                            });

                            subclass[talentTypeKey + '_sorted'] = talentArray;
                        }
                    });
                });
            }
            
            return Handlebars.templates.class(classData);
        },

        /**
         * Handle talent popup display
         * @param {string} talentId - The talent ID
         * @param {jQuery} $trigger - The element that triggered the popup
         */
        showTalentPopup(talentId, $trigger) {
            if (!window.ToMECore.talents) {
                console.warn('Talents data not available for popup');
                return;
            }

            const talentData = window.ToMECore.talents.talents_by_id[talentId];
            if (!talentData) {
                console.warn('Talent not found:', talentId);
                return;
            }

            // Check if modal template is available
            if (!Handlebars.templates.talent_modal) {
                console.warn('Talent modal template not available');
                return;
            }

            const modalHtml = Handlebars.templates.talent_modal(talentData);
            
            // Create or update popup
            let $popup = $('#talent-popup');
            if ($popup.length === 0) {
                $popup = $('<div id="talent-popup" class="talent-popup-overlay"></div>');
                $('body').append($popup);
                
                // Close popup when clicking overlay
                $popup.on('click', function(e) {
                    if (e.target === this) {
                        $(this).hide();
                    }
                });
                
                // Close popup with escape key
                $(document).on('keydown', function(e) {
                    if (e.keyCode === 27) { // Escape key
                        $popup.hide();
                    }
                });
            }
            
            $popup.html(modalHtml).show();
            
            // Position popup relative to trigger if needed
            if ($trigger && $trigger.length) {
                // Simple center positioning for now
                $popup.css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                });
            }
        },

        /**
         * Set up event handlers for classes feature
         */
        setupEventHandlers() {
            // Talent popup handlers
            $(document).on('click', '.talent-link', function(e) {
                e.preventDefault();
                const talentId = $(this).data('talent-id') || $(this).attr('href').replace('#', '');
                ClassesFeature.showTalentPopup(talentId, $(this));
            });

            // Close popup handlers
            $(document).on('click', '.talent-popup-close, .talent-popup-overlay', function(e) {
                if (e.target === this || $(e.target).hasClass('talent-popup-close')) {
                    $('#talent-popup').hide();
                }
            });

            console.log('Classes event handlers set up');
        },

        /**
         * Register routes for classes feature
         * @param {Object} router - The crossroads router instance
         */
        registerRoutes(router) {
            return {
                classes: router.addRoute('classes:?query:', function(query) {
                    window.ToMECore.versions.fromQuery(query);
                    window.ToMECore.masteries.fromQuery(query);
                    ClassesFeature.fixupClasses();
                    
                    window.ToMECore.updatePage({
                        title: 'Classes',
                        nav: ClassesFeature.navClasses(),
                        content: '<p>Select a class from the navigation to see details.</p>'
                    });
                }),

                classes_class: router.addRoute("classes/{cls}:?query:", function(cls, query) {
                    window.ToMECore.versions.fromQuery(query);
                    window.ToMECore.masteries.fromQuery(query);
                    ClassesFeature.fixupClasses();
                    
                    const content = ClassesFeature.listClasses(null, cls);
                    if (content) {
                        window.ToMECore.updatePage({
                            title: 'Classes - ' + cls,
                            nav: ClassesFeature.navClasses(),
                            content: content
                        });
                    } else {
                        window.ToMECore.showNotFound('Class not found: ' + cls);
                    }
                }),

                classes_class_subclass: router.addRoute("classes/{cls}/{subclass}:?query:", function(cls, subclass, query) {
                    // For now, redirect to the class page
                    // TODO: Implement subclass-specific view
                    window.location.hash = 'classes/' + cls + (query ? '?' + query : '');
                })
            };
        }
    };

    // Register the feature
    window.ToMEFeatures.classes = ClassesFeature;

    // Auto-initialize when DOM is ready
    $(document).ready(function() {
        ClassesFeature.init().then(() => {
            ClassesFeature.setupEventHandlers();
        }).catch(console.error);
    });

})(window);