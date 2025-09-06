/**
 * Version Management Module
 * Handles version selection (ToME versions) and mastery levels
 */

var VERSION_MANAGEMENT = (function() {
    'use strict';
    
    // Create version dropdown manager
    function createVersionManager(config) {
        var $_dropdown;
        var current = config.DEFAULT;
        
        function onChange() {
            $_dropdown.val(current);
            
            // Save expanded collapsible IDs for state restoration
            if (typeof UI_MANAGEMENT !== 'undefined' && UI_MANAGEMENT.getExpandedIds) {
                prev_expanded = UI_MANAGEMENT.getExpandedIds();
            }
            
            // Clear sidebar for refresh
            $("#side-nav").html("");
            
            // Update navigation and search
            if (typeof ROUTING !== 'undefined' && ROUTING.updateNav) {
                ROUTING.updateNav();
            }
            
            // Update search system if this is version change
            if (config.name === 'versions' && typeof SEARCH !== 'undefined') {
                SEARCH.update(current);
            }
        }
        
        var manager = {
            DEFAULT: config.DEFAULT,
            ALL: config.ALL,
            DISPLAY: config.DISPLAY || {},
            
            get current() {
                return current;
            },
            
            set current(value) {
                current = value;
            },
            
            name: function(ver) {
                return this.DISPLAY[ver] || ver;
            },
            
            isMajor: function(ver) {
                return ver && ver.endsWith && ver.endsWith('.0');
            },
            
            asMajor: function(ver) {
                return ver ? ver.replace(/\.\d+$/, '') : ver;
            },
            
            update: function(query) {
                query = query || {};
                var newValue = query[config.queryParam] || this.DEFAULT;
                if (current != newValue) {
                    current = newValue;
                    onChange();
                }
            },
            
            asQuery: function() {
                if (current == this.DEFAULT) {
                    return '';
                } else {
                    return config.queryParam + '=' + current;
                }
            },
            
            list: function($el, $container) {
                var html = '';
                
                // For masteries, hide if too few options
                if (config.name === 'masteries' && this.ALL.length < 2) {
                    ($container || $el).hide();
                    return;
                }
                
                for (var i = 0; i < this.ALL.length; i++) {
                    html += '<option value="' + this.ALL[i] + '"';
                    if (this.ALL[i] == this.DEFAULT) {
                        html += ' selected';
                    }
                    html += '>' + this.name(this.ALL[i]) + '</option>';
                }
                ($container || $el).removeClass("hidden").show();
                $el.html(html);
            },
            
            listen: function($el) {
                var self = this;
                $el.change(function() {
                    current = $(this).val();
                    onChange();
                    // Update URL hash with new query
                    if (typeof hasher !== 'undefined' && typeof UTILS !== 'undefined') {
                        hasher.setHash(UTILS.locationHashNoQuery() + currentQuery());
                    }
                });
            },
            
            redirectMasterToDefault: function(new_hash, old_hash) {
                if (config.name === 'versions' && parseHashQueryString().ver == 'master') {
                    if (typeof hasher !== 'undefined' && typeof UTILS !== 'undefined') {
                        hasher.replaceHash(UTILS.locationHashNoQuery());
                    }
                    return true;
                }
                return false;
            },
            
            init: function($el, $container) {
                $_dropdown = $el;
                this.list($el, $container);
                this.listen($el);
                
                if (typeof updateNav === 'function') {
                    updateNav();
                }
                
                // Initialize search for versions only
                if (config.name === 'versions' && typeof SEARCH !== 'undefined') {
                    SEARCH.init(current);
                }
            }
        };
        
        return manager;
    }
    
    // Create the versions manager
    var versions = createVersionManager({
        name: 'versions',
        queryParam: 'ver',
        DEFAULT: CONFIG.DEFAULT_VERSION,
        ALL: CONFIG.ALL_VERSIONS,
        DISPLAY: { 'master': 'next' }
    });
    
    // Create the masteries manager  
    var masteries = createVersionManager({
        name: 'masteries',
        queryParam: 'mastery',
        DEFAULT: '1.3',
        ALL: [ '0.8', '1.0', '1.1', '1.2', '1.3', '1.5' ],
        DISPLAY: {}
    });
    
    // Public API
    return {
        versions: versions,
        masteries: masteries,
        
        /**
         * Initialize both version and mastery systems
         * @param {jQuery} $versionDropdown - Version dropdown element
         * @param {jQuery} $versionContainer - Version container element
         * @param {jQuery} $masteryDropdown - Mastery dropdown element
         * @param {jQuery} $masteryContainer - Mastery container element
         */
        init: function($versionDropdown, $versionContainer, $masteryDropdown, $masteryContainer) {
            if ($versionDropdown && $versionDropdown.length) {
                versions.init($versionDropdown, $versionContainer);
            }
            
            if ($masteryDropdown && $masteryDropdown.length) {
                masteries.init($masteryDropdown, $masteryContainer);
            }
        },
        
        /**
         * Update both systems from query parameters
         * @param {Object} query - Query parameters object
         */
        updateFromQuery: function(query) {
            versions.update(query);
            masteries.update(query);
        }
    };
})();