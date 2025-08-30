/**
 * Core Utilities Module
 * Shared utility functions used across ToME Tips features
 */

(function(window) {
    'use strict';

    // Ensure namespace exists
    window.ToMECore = window.ToMECore || {};

    /**
     * Utility functions
     */
    const Utils = {
        /**
         * Parse hash query string parameters
         * Based on http://stackoverflow.com/a/2880929/25507
         * @returns {Object} Parsed parameters
         */
        parseHashQueryString() {
            let match,
                pl = /\+/g,  // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
                query = window.location.hash.substring(1),
                url_params = {};

            if (query.indexOf('?') != -1) {
                query = query.substring(query.indexOf('?') + 1);

                while ((match = search.exec(query))) {
                   url_params[decode(match[1])] = decode(match[2]);
                }
            }

            return url_params;
        },

        /**
         * Escape HTML characters
         * @param {string} s - String to escape
         * @returns {string} Escaped string
         */
        escapeHtml(s) {
            if (typeof s !== 'string') return s;
            return s.replace(/&/g, '&amp;')
                    .replace(/>/g, '&gt;')
                    .replace(/</g, '&lt;')
                    .replace(/"/g, '&quot;');
        },

        /**
         * Get location hash without query parameters
         * @returns {string} Hash without query
         */
        locationHashNoQuery() {
            return location.hash.replace(/\?.*/, '');
        },

        /**
         * Create an index by HTML ID
         * @param {Array} collection - Collection to index
         * @param {string} field - Field to use as key
         * @returns {Object} Indexed object
         */
        indexByHtmlId(collection, field) {
            const index = {};
            if (_.isArray(collection)) {
                collection.forEach(item => {
                    if (item[field]) {
                        index[this.toHtmlId(item[field])] = item;
                    }
                });
            } else if (_.isObject(collection)) {
                Object.keys(collection).forEach(key => {
                    const item = collection[key];
                    if (item[field]) {
                        index[this.toHtmlId(item[field])] = item;
                    }
                });
            }
            return index;
        },

        /**
         * Convert string to HTML-safe ID
         * @param {string} str - String to convert
         * @returns {string} HTML-safe ID
         */
        toHtmlId(str) {
            if (typeof str !== 'string') return str;
            return str.toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/^-+|-+$/g, '');
        },

        /**
         * Deep clone an object
         * @param {*} obj - Object to clone
         * @returns {*} Cloned object
         */
        deepClone(obj) {
            return JSON.parse(JSON.stringify(obj));
        },

        /**
         * Debounce function calls
         * @param {Function} func - Function to debounce
         * @param {number} wait - Wait time in milliseconds
         * @param {boolean} immediate - Execute immediately
         * @returns {Function} Debounced function
         */
        debounce(func, wait, immediate) {
            let timeout;
            return function() {
                const context = this, args = arguments;
                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },

        /**
         * Check if a value is empty (null, undefined, empty string, empty array, empty object)
         * @param {*} value - Value to check
         * @returns {boolean} True if empty
         */
        isEmpty(value) {
            if (value == null) return true;
            if (typeof value === 'string') return value.trim() === '';
            if (_.isArray(value)) return value.length === 0;
            if (_.isObject(value)) return Object.keys(value).length === 0;
            return false;
        },

        /**
         * Format number with appropriate suffix (K, M, etc.)
         * @param {number} num - Number to format
         * @returns {string} Formatted number
         */
        formatNumber(num) {
            if (typeof num !== 'number') return num;
            
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + 'M';
            } else if (num >= 1000) {
                return (num / 1000).toFixed(1) + 'K';
            }
            return num.toString();
        },

        /**
         * Create a throttled function
         * @param {Function} func - Function to throttle
         * @param {number} limit - Time limit in milliseconds
         * @returns {Function} Throttled function
         */
        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        },

        /**
         * Get nested object property safely
         * @param {Object} obj - Object to get property from
         * @param {string} path - Dot-separated path (e.g., 'user.profile.name')
         * @param {*} defaultValue - Default value if property doesn't exist
         * @returns {*} Property value or default
         */
        get(obj, path, defaultValue = undefined) {
            if (!obj || typeof path !== 'string') return defaultValue;
            
            const keys = path.split('.');
            let result = obj;
            
            for (const key of keys) {
                if (result == null || typeof result !== 'object') {
                    return defaultValue;
                }
                result = result[key];
            }
            
            return result !== undefined ? result : defaultValue;
        }
    };

    // Export to ToMECore namespace
    Object.assign(window.ToMECore, Utils);

    console.log('Core utilities loaded');

})(window);