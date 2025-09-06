/**
 * Data loading and caching logic for ToME Tips
 * Extracted from main.js for better organization
 */
var DATA_LOADER = (function() {
    'use strict';
    
    return {
        /**
         * Get current data based on version and mastery
         * @returns {Object} - Current tome data
         */
        getData: function() {
            return tome[versions.current + '-' + masteries.current];
        },
        
        /**
         * Load data file with AJAX
         * @param {string} data_file - Data file name to load
         * @param {Function} success - Success callback function
         */
        loadData: function(data_file, success) {
            // Defensive check: prevent malformed talent URLs
            if (data_file && data_file.indexOf('talents.') === 0 && data_file.length <= 8) {
                success({}); // Return empty data to prevent 404
                return;
            }
            
            var url = CONFIG.DATA_PATH + versions.current + "/" + data_file;
            // talent files include the mastery, but only if data_file is not empty
            if (data_file && data_file.substr(0, 8) == 'talents.')
                url += '-' + ((masteries.current == '1.0') ? '1' : masteries.current);

            $.ajax({
                url: url + '.json',
                dataType: "json"
            }).done(success);
            // TODO: Add proper error handling
        },
        
        /**
         * Loads a section of JSON data into the tome object if needed, then executes
         * the success function handler.
         *
         * For example, if data_file is "talents.chronomancy", then this function
         * loads talents_chronomancy.json to tome.talents.chronomancy then calls
         * success(tome.talents.chronomancy).
         * 
         * @param {string} data_file - Data file name to load
         * @param {Function} success - Success callback function
         */
        loadDataIfNeeded: function(data_file, success) {
            var parts, last_part, tome_part;

            // Special case: No data has been loaded at all.
            // Load top-level data, then reissue the request.
            if (!DATA_LOADER.getData()) {
                DATA_LOADER.loadData('tome', function(data) {
                    data.hasMajorChanges = versions.asMajor(data.version) != versions.asMajor(versions.ALL[0]);
                    data.hasMinorChanges = data.version != versions.ALL[0] &&
                        !versions.isMajor(data.version) &&
                        data.version != 'master';

                    data.version = versions.name(data.version);
                    data.majorVersion = versions.asMajor(data.version);

                    data.fixups = {};

                    tome[versions.current + '-' + masteries.current] = data;
                    DATA_LOADER.loadDataIfNeeded(data_file, success);
                });
                return;
            }

            // Special case: No data file requested.
            if (!data_file) {
                success(tome);
                return;
            }

            // General case: Walk the object tree to find where the requested file
            // should go, and load it.
            parts = data_file.split(".");
            last_part = parts.pop();
            tome_part = DATA_LOADER.getData();

            for (var i = 0; i < parts.length; i++) {
                if (typeof(tome_part[parts[i]]) === 'undefined') {
                    tome_part[parts[i]] = {};
                }
                tome_part = tome_part[parts[i]];
            }

            if (!tome_part[last_part]) {
                DATA_LOADER.loadData(data_file, function(data) {
                    tome_part[last_part] = data;
                    success(data);
                });
            } else {
                success(tome_part[last_part]);
            }
        }
    };
})();