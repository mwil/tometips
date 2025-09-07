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
                // Use dynamic scroll offset calculation
                var totalOffset = UTILS.calculateScrollOffset();
                
                // For talent links, scroll to the card header instead of the link itself for better visual positioning
                var $scrollTarget = $target;
                if ($target.closest('.card-header').length) {
                    $scrollTarget = $target.closest('.card-header');
                }
                
                // Auto-expand talent collapsible FIRST if this is a deep talent link
                var parts = targetId.split('/');
                if (targetId.match(/^talents\/[^\/]+\/[^\/]+/) && parts.length >= 3) {
                    // Find the collapse panel associated with this talent
                    // Updated for Bootstrap 5: look for .card instead of .panel, and .collapse instead of .panel-collapse
                    var $collapsePanel = $target.closest('.card').find('.collapse');
                    if ($collapsePanel.length && !$collapsePanel.hasClass('show')) {
                        // Wait for Bootstrap animation to complete, then recalculate and scroll
                        $collapsePanel.one('shown.bs.collapse', function() {
                            // Small delay to ensure layout is fully settled after animation
                            setTimeout(function() {
                                UTILS.performScrollToId(targetId);
                            }, 50);
                        });
                        // Use Bootstrap 5 collapse method
                        $collapsePanel.collapse('show');
                        return; // Exit early - scroll will happen after animation
                    }
                }
                
                // No collapsible to expand, scroll immediately
                UTILS.performScrollToTarget($scrollTarget, totalOffset);
            }
        },
        
        /**
         * Calculates appropriate scroll offset based on page layout
         * @returns {number} Scroll offset in pixels
         */
        calculateScrollOffset: function() {
            // Minimal offset to keep titles close to the top
            var baseOffset = 5;
            
            // Add minimal padding if header exists to prevent overlap
            var $contentHeader = $('#content-header');
            if ($contentHeader.length && $contentHeader.is(':visible')) {
                baseOffset += 15; // Just enough to clear the header with minimal padding
            }
            
            return baseOffset;
        },

        /**
         * Performs the actual scroll calculation and scrolling to a target element
         * @param {jQuery} $scrollTarget - The element to scroll to
         * @param {number} totalOffset - Total offset to apply to scroll position (optional)
         */
        performScrollToTarget: function($scrollTarget, totalOffset) {
            // Ensure element still exists and is visible
            if (!$scrollTarget || !$scrollTarget.length || !$scrollTarget.is(':visible')) {
                return;
            }
            
            // Calculate dynamic offset if not provided
            if (typeof totalOffset === 'undefined') {
                totalOffset = UTILS.calculateScrollOffset();
            }
            
            // Use the element's position within the content, not relative to container
            var $content = $(CONFIG.SELECTORS.CONTENT);
            var contentTop = $content.offset().top;
            var elementTop = $scrollTarget.offset().top;
            
            // Calculate the scroll position needed
            var targetScroll = elementTop - contentTop - totalOffset;
            
            // Scroll to the calculated position
            $(CONFIG.SELECTORS.CONTENT_CONTAINER).scrollTop(Math.max(0, targetScroll));
        },
        
        /**
         * Recalculates and scrolls to a target ID after DOM changes (like animations)
         * @param {string} targetId - The ID to scroll to (without #)
         */
        performScrollToId: function(targetId) {
            // Recalculate target element after DOM changes
            var $target = document.getElementById(targetId) ? $(document.getElementById(targetId)) : null;
            
            // Try alternative ID formats if not found (same logic as scrollToId)
            if (!$target && targetId.match(/^talents\/[^\/]+\/[^\/]+/)) {
                var parts = targetId.split('/');
                if (parts.length === 4) {
                    var talentId = parts[3];
                    var prefixedId = parts[0] + '/' + parts[1] + '/' + parts[2] + '/t_' + talentId;
                    $target = document.getElementById(prefixedId) ? $(document.getElementById(prefixedId)) : null;
                    
                    if (!$target) {
                        var transformedId = talentId.toLowerCase().replace(/[':/]/, '_');
                        var transformedPrefixedId = parts[0] + '/' + parts[1] + '/' + parts[2] + '/t_' + transformedId;
                        $target = document.getElementById(transformedPrefixedId) ? $(document.getElementById(transformedPrefixedId)) : null;
                    }
                }
            }
            
            if ($target && $target.length) {
                // Recalculate scroll target after animation
                var $scrollTarget = $target;
                if ($target.closest('.card-header').length) {
                    $scrollTarget = $target.closest('.card-header');
                }
                
                // Use dynamic offset calculation for better positioning
                UTILS.performScrollToTarget($scrollTarget);
            }
        },

        /**
         * Waits for all images and layout to be fully settled before calling callback
         * @param {jQuery} $container - Container to check for image loading
         * @param {Function} callback - Function to call when ready
         */
        waitForContentReady: function($container, callback) {
            if (!$container || !$container.length) {
                callback();
                return;
            }

            var $images = $container.find('img');
            var totalImages = $images.length;
            
            if (totalImages === 0) {
                // No images, wait for one animation frame then callback
                requestAnimationFrame(function() {
                    requestAnimationFrame(callback);
                });
                return;
            }

            var loadedImages = 0;
            var loadTimeout;

            function checkIfReady() {
                if (loadedImages >= totalImages) {
                    clearTimeout(loadTimeout);
                    // Additional frame to ensure layout is settled after all images loaded
                    requestAnimationFrame(function() {
                        requestAnimationFrame(callback);
                    });
                }
            }

            // Set up load handlers for each image
            $images.each(function() {
                var img = this;
                
                if (img.complete && img.naturalHeight !== 0) {
                    // Image already loaded
                    loadedImages++;
                } else {
                    // Wait for image to load
                    $(img).one('load error', function() {
                        loadedImages++;
                        checkIfReady();
                    });
                }
            });

            // Safety timeout - don't wait forever for images
            loadTimeout = setTimeout(function() {
                console.log('UTILS.waitForContentReady: Timeout reached, proceeding with scroll');
                loadedImages = totalImages; // Force completion
                checkIfReady();
            }, 2000); // 2 second max wait

            // Check if all images were already loaded
            checkIfReady();
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