/**
 * Core utility functions for ToME Tips
 * Extracted from main.js for better organization and reusability
 */
var UTILS = (function() {
    'use strict';
    
    return {
        /**
         * Escape HTML characters to prevent XSS
         * @param {string} s - String to escape
         * @returns {string} - HTML-escaped string
         */
        escapeHtml: function(s) {
            // Handle null/undefined values
            if (!s && s !== 0) {
                return '';
            }
            // Convert to string if it's not already
            s = String(s);
            return s.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
        },
        
        /**
         * Get location hash without query parameters
         * @returns {string} - Hash without query string
         */
        locationHashNoQuery: function() {
            return location.hash.split('?')[0];
        },
        
        /**
         * Convert string to HTML-safe ID by replacing problematic characters
         * @param {string} s - String to convert
         * @returns {string} - HTML-safe ID string
         */
        toHtmlId: function(s) {
            // Replace characters known to cause issues in CSS selectors, then collapse multiple underscores
            // Handle null/undefined values
            if (!s && s !== 0) {
                return '';
            }
            // Convert to string if it's not already
            s = String(s);
            return s.toLowerCase().replace(/[':\/\s&]/g, '_').replace(/_+/g, '_');
        },
        
        /**
         * As toHtmlId, but leaves slashes intact, for code like talents that
         * legitimately uses them (e.g., "spells/fire").
         * @param {string} s - String to convert
         * @returns {string} - Partially HTML-safe ID string
         */
        toUnsafeHtmlId: function(s) {
            // Handle null/undefined values
            if (!s && s !== 0) {
                return '';
            }
            // Convert to string if it's not already
            s = String(s);
            return s.toLowerCase().replace(/[':]/g, '_');
        },
        
        /**
         * Dynamic anchor scrolling function with intelligent talent navigation
         * HOW DEEP TALENT NAVIGATION WORKS:
         * 1. Search results create URLs like: #talents/chronomancy/flux/attenuate
         * 2. The talents_category_type_id route delegates to talents_category route
         * 3. The talents_category route loads data, renders content, then calls scrollToId()
         * 4. The handlebars template (talent_by_type.handlebars) creates elements with IDs like:
         *    - talents/chronomancy/flux/t_attenuate (note the t_ prefix!)
         * 5. scrollToId() tries multiple ID formats to find the correct element:
         *    a) Direct match: talents/chronomancy/flux/attenuate
         *    b) With t_ prefix: talents/chronomancy/flux/t_attenuate  
         *    c) With t_ prefix + toHtmlId transform for special chars
         * 6. Once found, it scrolls directly to the talent element
         */
        scrollToId: function() {
            var hash = UTILS.locationHashNoQuery();
            if (!hash) return;
            
            // Remove the # and convert to selector
            var targetId = hash.substring(1);
            
            // Try to find the element - first without escaping for modern IDs like "talents/category/type/id"
            var $target = document.getElementById(targetId) ? $(document.getElementById(targetId)) : null;
            
            // If not found and this looks like a deep talent link, try different ID formats
            if (!$target && targetId.match(/^talents\/[^\/]+\/[^\/]+/)) {
                var parts = targetId.split('/');
                
                // Handle both 3-part (talents/category/talent_id) and 4-part (talents/category/type/talent_id) formats
                if (parts.length === 4) {
                    // 4-part format: talents/category/type/talent_id
                    var talentId = parts[3];
                    
                    // Try with t_ prefix (most common case)
                    var prefixedId = parts[0] + '/' + parts[1] + '/' + parts[2] + '/t_' + talentId;
                    $target = document.getElementById(prefixedId) ? $(document.getElementById(prefixedId)) : null;
                    
                    // If still not found, try with t_ prefix and toHtmlId transformation
                    if (!$target) {
                        var transformedId = talentId.toLowerCase().replace(/[':/]/, '_');
                        var transformedPrefixedId = parts[0] + '/' + parts[1] + '/' + parts[2] + '/t_' + transformedId;
                        $target = document.getElementById(transformedPrefixedId) ? $(document.getElementById(transformedPrefixedId)) : null;
                    }
                    
                    // If still not found, try 3-part format (template might use category as type)
                    if (!$target) {
                        var altId = parts[0] + '/' + parts[1] + '/' + talentId;
                        $target = document.getElementById(altId) ? $(document.getElementById(altId)) : null;
                        
                        if (!$target) {
                            var altTransformedId = parts[0] + '/' + parts[1] + '/' + transformedId;
                            $target = document.getElementById(altTransformedId) ? $(document.getElementById(altTransformedId)) : null;
                        }
                    }
                } else if (parts.length === 3) {
                    // 3-part format: talents/category/talent_id
                    var talentId = parts[2];
                    
                    // Try direct match first
                    $target = document.getElementById(targetId) ? $(document.getElementById(targetId)) : null;
                    
                    // If not found, try with toHtmlId transformation
                    if (!$target) {
                        var transformedId = talentId.toLowerCase().replace(/[':/]/, '_');
                        var transformedTargetId = parts[0] + '/' + parts[1] + '/' + transformedId;
                        $target = document.getElementById(transformedTargetId) ? $(document.getElementById(transformedTargetId)) : null;
                    }
                }
            }
            
            // If still not found, fall back to jQuery selector (for backwards compatibility with other page elements)
            if (!$target || $target.length === 0) {
                var escapedId = targetId.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&");
                $target = $('#' + escapedId);
            }
            
            if ($target.length) {
                // Scroll to element with minimal breathing room
                var totalOffset = CONFIG.CONTENT_SCROLL_OFFSET;
                
                // For talent links, scroll to the card header instead of the link itself for better visual positioning
                var $scrollTarget = $target;
                if ($target.closest('.card-header').length) {
                    $scrollTarget = $target.closest('.card-header');
                }
                
                // Use the element's position within the content, not relative to container
                var $content = $(CONFIG.SELECTORS.CONTENT);
                var contentTop = $content.offset().top;
                var elementTop = $scrollTarget.offset().top;
                
                // Calculate the scroll position needed
                var targetScroll = elementTop - contentTop - totalOffset;
                
                // Scroll to the calculated position
                $(CONFIG.SELECTORS.CONTENT_CONTAINER).scrollTop(Math.max(0, targetScroll));
                
                // Auto-expand talent collapsible if this is a deep talent link
                var parts = targetId.split('/');
                if (targetId.match(/^talents\/[^\/]+\/[^\/]+/) && parts.length >= 3) {
                    // Find the collapse panel associated with this talent
                    // Updated for Bootstrap 5: look for .card instead of .panel, and .collapse instead of .panel-collapse
                    var $collapsePanel = $target.closest('.card').find('.collapse');
                    if ($collapsePanel.length && !$collapsePanel.hasClass('show')) {
                        // Use Bootstrap 5 collapse method
                        $collapsePanel.collapse('show');
                    }
                }
            }
        },
        
        /**
         * Given an object, return a new object that indexes the object's properties by
         * HTML ID.
         *
         * For example, if classes = { 'WARRIOR': { 'short_name': 'WARRIOR', ... }, ...},
         * then indexByHtmlId(classes, 'short_name') will return
         * { 'warrior': { 'short_name': 'WARRIOR', ... }, ...}
         */
        indexByHtmlId: function(obj, property) {
            return _.object(_.map(obj, function(elem) { return [ UTILS.toHtmlId(elem[property]), elem ]; }));
        }
    };
})();

// Backwards compatibility - expose indexByHtmlId as global function
function indexByHtmlId(obj, property) {
    return UTILS.indexByHtmlId(obj, property);
}

// Backwards compatibility - expose other utility functions globally
function toHtmlId(s) {
    return UTILS.toHtmlId(s);
}

function toUnsafeHtmlId(s) {
    return UTILS.toUnsafeHtmlId(s);
}

function escapeHtml(s) {
    return UTILS.escapeHtml(s);
}

function locationHashNoQuery() {
    return UTILS.locationHashNoQuery();
}

function scrollToId() {
    return UTILS.scrollToId();
}