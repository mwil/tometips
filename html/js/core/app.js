/**
 * Application bootstrap and initialization for ToME Tips
 * Main entry point that coordinates all modules
 */
var APP = (function() {
    'use strict';
    
    return {
        /**
         * Initialize the application
         * Called when DOM is ready
         */
        init: function() {
            // Setup AJAX loading indicators
            $(document).ajaxStart(function() { $("html").addClass("wait"); });
            $(document).ajaxStop(function() { $("html").removeClass("wait"); });

            // Initialize core functionality
            this.initEvents();
            
            // Initialize UI components
            this.initVersions();
            this.initMasteries();
            this.initSearch();
            this.initImageSize();
            this.initLayout();
            this.initDarkMode();
            this.initMobileNavigation();
            
            // Initialize global tome data object
            tome = {};
            
            // Initialize routing last
            this.initRouting();
        },
        
        /**
         * Initialize event handling systems
         */
        initEvents: function() {
            // Use new EVENTS module
            if (typeof EVENTS !== 'undefined') {
                EVENTS.init();
            }
        },
        
        
        
        /**
         * Initialize version and mastery dropdowns
         */
        initVersions: function() {
            if (typeof VERSION_MANAGEMENT !== 'undefined' && VERSION_MANAGEMENT.init) {
                VERSION_MANAGEMENT.init(
                    $(".ver-dropdown"), $(".ver-dropdown-container"),
                    $(".mastery-dropdown"), $(".mastery-dropdown-container")
                );
            }
        },
        
        /**
         * Initialize mastery dropdown - now handled by initVersions
         */
        initMasteries: function() {
            // This is now handled by the unified VERSION_MANAGEMENT system in initVersions
            // Keeping method for backwards compatibility
        },
        
        /**
         * Initialize search system
         */
        initSearch: function() {
            // Search initialization is now handled by VERSION_MANAGEMENT.init()
            // which coordinates between version changes and search updates
            // Keeping method for explicit search-only initialization if needed
            if (typeof SEARCH !== 'undefined' && SEARCH.init) {
                var currentVersion = CONFIG.DEFAULT_VERSION;
                if (typeof VERSION_MANAGEMENT !== 'undefined' && VERSION_MANAGEMENT.versions) {
                    currentVersion = VERSION_MANAGEMENT.versions.current || currentVersion;
                }
                SEARCH.init(currentVersion);
            }
        },
        
        /**
         * Initialize image size configuration
         */
        initImageSize: function() {
            // Use new UI_MANAGEMENT module
            if (typeof UI_MANAGEMENT !== 'undefined') {
                UI_MANAGEMENT.configureImgSize();
            }
        },
        
        /**
         * Initialize layout and sidebar
         */
        initLayout: function() {
            // Use new UI_MANAGEMENT module
            if (typeof UI_MANAGEMENT !== 'undefined') {
                UI_MANAGEMENT.adjustSidebarLayout();
                UI_MANAGEMENT.enableExpandCollapseAll();
            }
            $('.tt-dropdown-menu').width($('#content-header .header-tools').width());
        },
        
        /**
         * Initialize dark mode
         */
        initDarkMode: function() {
            // Use new UI_MANAGEMENT module
            if (typeof UI_MANAGEMENT !== 'undefined') {
                UI_MANAGEMENT.initDarkMode();
            }
        },
        
        /**
         * Initialize mobile navigation
         */
        initMobileNavigation: function() {
            // Use new UI_MANAGEMENT module
            if (typeof UI_MANAGEMENT !== 'undefined') {
                UI_MANAGEMENT.initMobileNavigation();
            }
        },
        
        /**
         * Initialize routing system
         */
        initRouting: function() {
            // Use new ROUTING module
            if (typeof ROUTING !== 'undefined') {
                ROUTING.initializeRoutes();
            }
        }
    };
})();

// Initialize the application when DOM is ready
$(function() {
    // Mark as initialized to prevent duplicate initialization from main.js
    window.APP_INITIALIZED = true;
    APP.init();
});