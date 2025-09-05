/**
 * Global configuration and constants for ToME Tips
 * Extracted from main.js for better organization
 */
var CONFIG = (function() {
    'use strict';
    
    return {
        // Application constants
        VERSION: '2017-03-11',
        BASE_TITLE: document.title,
        
        // Data configuration
        DATA_PATH: 'data/',
        
        // Version configuration
        DEFAULT_VERSION: '1.7.6',
        ALL_VERSIONS: ['1.7.6'],
        VERSION_DISPLAY_MAP: { 'master': 'next' },
        
        // Mastery configuration
        DEFAULT_MASTERY: '1.3',
        ALL_MASTERIES: ['0.8', '1.0', '1.1', '1.2', '1.3', '1.5'],
        
        // UI configuration
        DEFAULT_IMAGE_SIZE: 32,
        IMAGE_SIZES: [32, 48, 64],
        
        // Search configuration
        SEARCH_CATEGORIES: ['races', 'classes', 'talents-types', 'talents'],
        SEARCH_CATEGORY_HEADERS: {
            'races': 'Races',
            'classes': 'Classes',
            'talents-types': 'Talent Categories',
            'talents': 'Talents'
        },
        
        // Animation and timing
        COLLAPSE_TRANSITION_TIME: 400,
        SCROLL_ANIMATION_TIME: 300,
        TYPEAHEAD_DEBOUNCE_TIME: 10,
        
        // Layout constants
        MOBILE_BREAKPOINT: 767.98,
        CONTENT_SCROLL_OFFSET: 4,
        PANEL_SCROLL_OFFSET: 20,
        
        // Local storage keys
        STORAGE_KEYS: {
            IMAGE_SIZE: 'tome-tips-img-size',
            THEME: 'theme'
        },
        
        // CSS selectors (commonly used)
        SELECTORS: {
            CONTENT: '#content',
            CONTENT_CONTAINER: '#content-container',
            SIDE_NAV: '#side-nav',
            NAV_ITEMS: '#nav-items'
        }
    };
})();