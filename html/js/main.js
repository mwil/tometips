/**
 * Core Utility Functions and Legacy Code
 * Contains shared utility functions, string polyfills, and helper functions
 * used throughout the ToME Tips application. This file serves as a collection
 * of general-purpose utilities that don't belong to specific modules.
 * 
 * Key features:
 * - Hash query string parsing for URL parameters
 * - String formatting utilities (title case conversion)
 * - Statistics display helpers
 * - Legacy browser compatibility functions
 */

var VERSION = '2017-03-11';

// http://stackoverflow.com/a/2548133/25507
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

/**
 * Parses query string-like parameters out of the end of the location hash.
 * Extracts URL parameters from hash fragments like "#page?param1=value1&param2=value2".
 * 
 * @function parseHashQueryString
 * @returns {Object} Object with decoded parameter key-value pairs
 * @example
 * // URL: http://example.com/#races?version=1.7.6&mastery=1.0
 * parseHashQueryString(); // returns {version: "1.7.6", mastery: "1.0"}
 * 
 * @see {@link http://stackoverflow.com/a/2880929/25507|Stack Overflow reference}
 */
function parseHashQueryString() {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.hash.substring(1),
        url_params = {};

    if (query.indexOf('?') != -1) {
        query = query.substring(query.indexOf('?') + 1);

        while ((match = search.exec(query))) {
           url_params[decode(match[1])] = decode(match[2]);
        }
    }

    return url_params;
}

/**
 * Builds current query string from version and mastery settings.
 * Combines version and mastery parameters into a properly formatted query string.
 * 
 * @function currentQuery
 * @returns {string} Query string starting with '?' or empty string if no parameters
 * @example
 * // With version 1.7.6 and mastery 1.0 selected
 * currentQuery(); // returns "?version=1.7.6&mastery=1.0"
 * 
 * // With no version or mastery selected
 * currentQuery(); // returns ""
 */
function currentQuery()
{
    var query = versions.asQuery();
    var mquery = masteries.asQuery();
    if (query) {
        if (mquery) query += '&' + mquery;
    } else {
        query = mquery;
    }
    return query ? '?' + query : '';
}

// Compatibility alias for backward compatibility
var prev_expanded = null;


// Header is now always fixed - no sticky behavior needed

var options = {
    imgSize: 48
};

/**
 * Converts a string to title case by capitalizing the first letter of each word.
 * Handles special cases for common prepositions and possessives.
 * 
 * @function toTitleCase
 * @param {string|number} s - String to convert to title case
 * @returns {string} Title-cased string with proper capitalization
 * @example
 * toTitleCase("the lord of the rings"); // returns "The Lord of the Rings"
 * toTitleCase("berserker's rage"); // returns "Berserker's Rage"
 * toTitleCase(""); // returns ""
 * toTitleCase(null); // returns ""
 */
function toTitleCase(s)
{
    // Handle null/undefined values
    if (!s && s !== 0) {
        return '';
    }
    // Convert to string if it's not already
    s = String(s);
    
    var never_capitalize = {
        // Fix problems like "Berserker's"
        "s":true,
        // Prepositions and internal articles
        "of":true,
        "the":true
    };
    s = s.replace(/\b([a-z])([a-z]+)/g, function(match, p1, p2) { return never_capitalize[match] ? match : (p1.toUpperCase() + p2); });
    // Force the first word to be capitalized, even if it's "of" or "the"
    return s[0].toUpperCase() + s.slice(1);
}

/**Given an object, return a new object that indexes the object's properties by
 * HTML ID.
 *
 * For example, if classes = { 'WARRIOR': { 'short_name': 'WARRIOR', ... }, ...},
 * then indexByHtmlId(classes, 'short_name') will return
 * { 'warrior': { 'short_name': 'WARRIOR', ... }, ...}
 */
function indexByHtmlId(obj, property) {
    return _.object(_.map(obj, function(elem) { return [ UTILS.toHtmlId(elem[property]), elem ]; }));
}

/**
 * @todo Implement ToME wiki link markup functionality
 * @deprecated This function is not implemented
 */


/**
 * Handlebars helper that returns the ToME game's Git repository URL.
 * Provides a constant URL for linking to the game's source code.
 * 
 * @function tome_git_url
 * @returns {string} Git repository URL for ToME game engine
 * @example
 * // In Handlebars template: <a href="{{tome_git_url}}">View Source</a>
 */
Handlebars.registerHelper('tome_git_url', function() {
    return 'http://git.net-core.org/tome/t-engine4';
});

/**
 * Handlebars helper to detect if content belongs to DLC (Downloadable Content).
 * Checks source code path patterns to identify DLC modules like cults, orcs, ashes, etc.
 * 
 * @function isDLC
 * @param {Array<string>} source_code - Array containing source code file paths
 * @returns {boolean} True if content is from DLC, false otherwise
 * @example
 * // In Handlebars template: {{#if (isDLC source_code)}}DLC Content{{/if}}
 * isDLC(["data-cults/something.lua"]); // returns true
 * isDLC(["data/base/something.lua"]); // returns false
 */
Handlebars.registerHelper('isDLC', function(source_code) {
    if (!source_code || !source_code[0]) return false;
    var path = source_code[0];
    var isDlc = path.indexOf('data-cults') !== -1 || 
                path.indexOf('data-orcs') !== -1 ||
                path.indexOf('data-ashes') !== -1 ||
                path.indexOf('data-ashes-urhrok') !== -1 ||
                path.indexOf('data-possessors') !== -1 ||
                // Generic check for any data-<something> pattern that's not data/
                (path.indexOf('data-') === 0 && path !== 'data/' && path !== 'data\\/' && path.indexOf('data/') !== 0 && path.indexOf('data\\/') !== 0);
    
    return isDlc;
});

/**
 * Handlebars helper to iterate over object properties in sorted order.
 * Sorts property keys alphabetically and renders template for each key-value pair.
 * 
 * @function eachProperty
 * @param {Object} context - Object whose properties to iterate
 * @param {Object} options - Handlebars options object with template functions
 * @returns {string} Concatenated HTML from template executions
 * @example
 * // In Handlebars template: {{#eachProperty stats}}{{key}}: {{value}}{{/eachProperty}}
 * // With context {strength: 10, dexterity: 8} renders in alphabetical order
 * 
 * @see {@link http://stackoverflow.com/a/9058854/25507|Stack Overflow reference}
 */
Handlebars.registerHelper('eachProperty', function(context, options) {
    var ret = "",
        keys = _.keys(context || {});
    keys.sort();
    for (var i = 0; i < keys.length; i++) {
        ret = ret + options.fn({key: keys[i], value: context[keys[i]]});
    }
    return ret;
});

/**Renders a partial, with additional arguments. Based on http://stackoverflow.com/a/14618035/25507
 *
 * Usage: Arguments are merged with the context for rendering only
 * (non destructive). Use `:token` syntax to replace parts of the
 * template path. Tokens are replace in order.
 *
 * USAGE: {{$ 'path.to.partial' context=newContext foo='bar' }}
 * USAGE: {{$ 'path.:1.:2' replaceOne replaceTwo foo='bar' }}
 */
Handlebars.registerHelper('$', function (partial) {
    var values, opts, done, value, context;
    if (!partial) {
        return '';
    }
    values = Array.prototype.slice.call(arguments, 1);
    opts = values.pop().hash;
    while (!done) {
        value = values.pop();
        if (value) {
            partial = partial.replace(/:[^\.]+/, value);
        } else {
            done = true;
        }
    }
    partial = Handlebars.partials[partial];
    if (!partial) {
        return '';
    }
    context = _.extend({}, opts.context || this, _.omit(opts, 'context', 'fn', 'inverse'));
    return new Handlebars.SafeString(partial(context));
});

Handlebars.registerHelper('choose', function(context, options) {
  return options.fn(context[Math.floor(Math.random() * context.length)]);
});

Handlebars.registerHelper('toTitleCase', function(context, options) {
    return toTitleCase(context);
});

Handlebars.registerHelper('toLowerCase', function(context, options) {
    if (!context && context !== 0) {
        return '';
    }
    return String(context).toLowerCase();
});

Handlebars.registerHelper('capitalize', function(context, options) {
    if (!context && context !== 0) {
        return '';
    }
    context = String(context);
    return context.charAt(0).toUpperCase() + context.slice(1);
});

Handlebars.registerHelper('itemImagePath', function(imagePath, size, options) {
    if (!imagePath) return '';
    size = size || 32;
    
    // Transform "object/artifact/acera.png" to "object/artifact/32/acera.png"
    // or "object/sword.png" to "object/32/sword.png"
    var parts = imagePath.split('/');
    if (parts.length >= 2) {
        // Insert size folder before filename
        var filename = parts.pop();
        parts.push(size.toString());
        parts.push(filename);
        return parts.join('/');
    }
    return imagePath;
});

Handlebars.registerHelper('toDecimal', function(context, places, options) {
   return context.toFixed(places || 2);
});

// ToME-specific functions that makes a ToME ID a valid and standard HTML ID
Handlebars.registerHelper('toHtmlId', toHtmlId);
Handlebars.registerHelper('toUnsafeHtmlId', toUnsafeHtmlId);

// ToME-specific function that tries to make a name or ID into a te4.org wiki page name
Handlebars.registerHelper('toWikiPage', function(context, options) {
   if (!context && context !== 0) {
       return '';
   }
   return toTitleCase(context).replace(' ', '_');
});

Handlebars.registerHelper('tag', function(context, options) {
    return DATA_LOADER.getData().tag;
});

Handlebars.registerHelper('currentQuery', function(context, options) {
    return currentQuery();
});

Handlebars.registerHelper('labelForChangeType', function(type) {
    var css_class = { "changed": "info", "added": "success", "removed": "danger" },
        text = { "changed": "Changed", "added": "New", "removed": "Removed" };
    return '<span class="label label-' + css_class[type] + '">' + text[type] + ':</span>';
});

/* Displays an entry in a stat block.
 * @param value
 *   the internal value to process
 * @display
 *   how to display the value
 * @mult
 *   If -1, invert the comparison.  If 0, don't prepend with '+'.
 * @compare
 *   if value is > compare, then a bonus; if < compare, a penalty
 */
/**
 * Creates HTML markup for a stat display with appropriate styling based on value comparison.
 * Generates a definition list item with color-coded value indication (bonus/penalty/neutral).
 * 
 * @function stat
 * @param {string} desc - Description label for the stat
 * @param {number} value - Numeric value of the stat
 * @param {string} [display] - Custom display format, defaults to "+value" or "value"
 * @param {number} [mult=1] - Multiplier for internal calculations (-1 to invert comparison)
 * @param {number} [compare=0] - Baseline value for comparison to determine bonus/penalty
 * @returns {Handlebars.SafeString} HTML markup as Handlebars SafeString
 * @example
 * stat("Strength", 5); // returns '<dt>Strength:</dt><dd><span class="stat-bonus">+5</span></dd>'
 * stat("Dexterity", -2); // returns '<dt>Dexterity:</dt><dd><span class="stat-penalty">-2</span></dd>'
 * stat("Constitution", 0); // returns '<dt>Constitution:</dt><dd><span class="stat-neutral">0</span></dd>'
 */
function stat(desc, value, display, mult, compare) {
    var internal_value = value * (mult || 1),
        value_html;
    display = display || (value >= 0 ? '+' + value : value);
    compare = (compare || 0) * (mult || 1);
    if (internal_value == compare) {
        value_html = '<span class="stat-neutral">' + display + '</span>';
    } else if (internal_value > compare) {
        value_html = '<span class="stat-bonus">' + display + '</span>';
    } else {
        value_html = '<span class="stat-penalty">' + display + '</span>';
    }
    return new Handlebars.SafeString("<dt>" + desc + ":</dt><dd>" + value_html + "</dd>");
}

Handlebars.registerHelper('stat', function(desc, value) {
    value = value || 0;
    return stat(desc, value);
});

Handlebars.registerHelper('customStat', function(desc, value, mult, compare) {
    return stat(desc, value, value, mult, compare);
});

Handlebars.registerHelper('percentStat', function(desc, value, mult, compare) {
    var percent = value * 100;
    percent = (mult && percent > 0 ? '+' : '') + percent.toFixed(0) + '%';
    return stat(desc, value, percent, mult, compare);
});

Handlebars.registerHelper('statValue', function(value) {
    value = value || 0;
    var internal_value = value,
        display = value >= 0 ? '+' + value : value,
        compare = 0;
    
    if (internal_value == compare) {
        return new Handlebars.SafeString('<span class="stat-neutral">' + display + '</span>');
    } else if (internal_value > compare) {
        return new Handlebars.SafeString('<span class="stat-bonus">' + display + '</span>');
    } else {
        return new Handlebars.SafeString('<span class="stat-penalty">' + display + '</span>');
    }
});

Handlebars.registerHelper('xpPenalty', function(value) {
    if (!value || value === 0) {
        return new Handlebars.SafeString('<span class="stat-neutral">0</span>');
    }
    
    // Convert to percentage (multiply by 100) and round to integer
    var percent = Math.round(value * 100);
    var display = (percent >= 0 ? '+' : '') + percent;
    
    if (percent === 0) {
        return new Handlebars.SafeString('<span class="stat-neutral">' + display + '</span>');
    } else if (percent > 0) {
        return new Handlebars.SafeString('<span class="stat-penalty">' + display + '</span>');
    } else {
        return new Handlebars.SafeString('<span class="stat-bonus">' + display + '</span>');
    }
});

Handlebars.registerHelper('textStat', function(desc, value) {
    return new Handlebars.SafeString('<dt>' + desc + ':</dt><dd><span class="stat-neutral">' + value + '</span></dd>');
});

Handlebars.registerHelper('negate', function(value) {
    return -value;
});

Handlebars.registerHelper('hasAdditionalStats', function(context) {
    return !!(context.size || 
             context.copy.global_speed_base ||
             context.copy.poison_immune ||
             context.copy.cut_immune ||
             context.copy.silence_immune ||
             context.copy.stun_immune ||
             context.copy.fear_immune ||
             context.copy.no_breath);
});


// MOVED: Search functionality moved to features/search.js
// Alias for backwards compatibility
var typeahead = SEARCH;

// MOVED: Version and mastery management moved to features/version-management.js
// Aliases for backwards compatibility
var versions = VERSION_MANAGEMENT.versions;
var masteries = VERSION_MANAGEMENT.masteries;

var routes,
    load_nav_data_handler,
    base_title = document.title;

/**Handler for expanding nav items. Takes a jQuery element that's being
 * expanded and does any on-demand loading of the data for that nav item.
 */
load_nav_data_handler = false;


// Consolidated Handlebars helper for accessing settings and global options
Handlebars.registerHelper('opt', function(option) {
    if (option === 'imgSize') {
        // Get the current menu setting
        var menuSize = (typeof UI_MANAGEMENT !== 'undefined' && UI_MANAGEMENT.imageSize) 
            ? UI_MANAGEMENT.imageSize.get() : 32;
        
        // Check if we're on the talents or items page vs classes page
        var currentHash = window.location.hash || '';
        var isTalentsPage = currentHash.includes('#talents');
        var isItemsPage = currentHash.includes('#items');
        
        if (isTalentsPage) {
            // Talents page mapping: Small=48, Medium=64, Large=96
            switch(menuSize) {
                case 32: return 48; // Small
                case 48: return 64; // Medium
                case 64: return 96; // Large
                default: return 64; // Default to medium
            }
        } else if (isItemsPage) {
            // Items page mapping: Small=32, Medium=64, Large=96
            switch(menuSize) {
                case 32: return 32; // Small
                case 48: return 64; // Medium
                case 64: return 96; // Large
                default: return 64; // Default to medium
            }
        } else {
            // Classes page mapping: Small=32, Medium=48, Large=64
            return menuSize;
        }
    }
    
    // Handle simple option access for backward compatibility
    if (typeof options !== 'undefined' && options[option]) {
        return options[option];
    }
    
    return '';
});

/**
 * Global function for testing image spacing from browser console.
 * Allows developers to quickly test different icon sizes during development.
 * 
 * @function testSpacing
 * @param {number} [size=64] - Icon size in pixels (32, 48, or 64)
 * @example
 * // In browser console:
 * testSpacing(32); // Sets icons to small size
 * testSpacing(48); // Sets icons to medium size  
 * testSpacing(64); // Sets icons to large size
 * testSpacing();   // Defaults to 64px
 */
window.testSpacing = function(size) {
    size = size || 64;
    if (typeof UI_MANAGEMENT !== 'undefined' && UI_MANAGEMENT.imageSize) {
        UI_MANAGEMENT.imageSize.set(size);
        UI_MANAGEMENT.imageSize.applyIconSizeClasses(size);
    }
};

/**
 * Global error handler for uncaught JavaScript exceptions.
 * Displays user-friendly error messages and cleans up loading states.
 * 
 * @function window.onerror
 * @param {string} msg - Error message
 * @param {string} url - URL where error occurred
 * @param {number} line - Line number where error occurred
 * @example
 * // Automatically called on uncaught errors
 * // Displays: "Internal error: [message] on [url] line [line]"
 */
window.onerror = function(msg, url, line) {
    $("html").removeClass("wait");

    if ($("#content").html() === 'Loading...') {
        $("#content").html('');
    }

    $("#content").prepend(
        '<div class="alert alert-danger">' +
            'Internal error: ' + UTILS.escapeHtml(msg || '') +
            ' on ' + url + ' line ' + line +
            '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'  +
        '</div>'
    );
};

$(function() {
    if (window.APP_INITIALIZED) return;
    // See http://stackoverflow.com/a/10801889/25507
    $(document).ajaxStart(function() { $("html").addClass("wait"); });
    $(document).ajaxStop(function() { $("html").removeClass("wait"); });

    // Flag to prevent dropdown handling after navigation
    // Clean event handling for navigation
    $("#side-nav").off("click");
    $("#nav-items").off("click");
    
    // TALENTS NAVIGATION (#side-nav) - Restore original simple logic
    $("#side-nav").on("click", ".dropdown", function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var $dropdown = $(this);
        var targetSelector = $dropdown.attr('data-target') || $dropdown.attr('data-bs-target');
        var $targetCollapse = $(targetSelector);
        var $parentLi = $dropdown.closest('li');
        var isCurrentlyCollapsed = $dropdown.hasClass('collapsed');
        
        // Simple toggle behavior for talents
        if (isCurrentlyCollapsed) {
            // Check if this is top-level (direct child of #side-nav)
            var isTopLevel = $parentLi.parent().attr('id') === 'side-nav';
            
            if (isTopLevel) {
                // Close all other top-level sections (accordion behavior)
                $parentLi.siblings().each(function() {
                    var $siblingCollapse = $(this).find('> .collapse');
                    var $siblingDropdown = $(this).find('> a > .dropdown');
                    if ($siblingCollapse.hasClass('show')) {
                        $siblingCollapse.collapse('hide');
                        $siblingDropdown.addClass('collapsed').attr('aria-expanded', 'false');
                    }
                });
                
                // Navigate when expanding top-level
                var $link = $dropdown.closest('a');
                var href = $link.attr('href');
                if (href) {
                    window.location.hash = href.substring(1);
                }
            }
            
            $targetCollapse.collapse('show');
        } else {
            $targetCollapse.collapse('hide');
        }
    });
    
    // ITEMS NAVIGATION - Use event delegation for dynamically loaded content
    
    // ITEMS NAVIGATION: Separate handlers for each type to prevent interference
    
    // LEVEL 1: Top-level accordion sections ONLY (not nested)
    $(document).on("click", "#nav-items > li > a", function(e) {
        var $link = $(this);
        var $parentLi = $link.closest('li');
        
        // Only handle if this is truly a direct child (not nested)
        if ($parentLi.parent().attr('id') !== 'nav-items') {
            return; // Skip if this is actually a nested element
        }
        
        var hasDropdown = $link.find('.dropdown').length > 0;
        
        if (hasDropdown) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            var $dropdown = $link.find('.dropdown');
            var targetSelector = $dropdown.attr('data-bs-target');
            var $targetCollapse = $(targetSelector);
            var isCurrentlyCollapsed = $dropdown.hasClass('collapsed');
            
            if (isCurrentlyCollapsed) {
                // Close all other top-level sections (accordion behavior)
                $parentLi.siblings().each(function() {
                    var $siblingCollapse = $(this).find('> .collapse');
                    if ($siblingCollapse.hasClass('show')) {
                        $siblingCollapse.collapse('hide');
                    }
                });
                
                // Navigate when expanding top-level
                var href = $link.attr('href');
                if (href) {
                    window.location.hash = href.substring(1);
                }
                
                // Open this section
                $targetCollapse.collapse('show');
            } else {
                $targetCollapse.collapse('hide');
            }
        }
    });
    
    // LEVEL 2+: Nested sections and leaf items (higher priority, runs first)
    $(document).on("click", "#nav-items .collapse a", function(e) {
        var $link = $(this);
        var hasDropdown = $link.find('.dropdown').length > 0;
        var hasNoDropdown = $link.find('.no-dropdown').length > 0;
        
        if (hasDropdown) {
            e.preventDefault(); // Prevent Bootstrap's automatic data-bs-toggle behavior
            e.stopPropagation(); // Prevent Level 1 handler
            e.stopImmediatePropagation(); // Prevent all other handlers
            
            // Handle collapse manually to avoid Bootstrap's automatic accordion behavior
            var $dropdown = $link.find('.dropdown');
            var targetSelector = $dropdown.attr('data-bs-target');
            var $targetCollapse = $(targetSelector);
            var isCurrentlyCollapsed = $dropdown.hasClass('collapsed');
            
            if (isCurrentlyCollapsed) {
                $targetCollapse.collapse('show');
            } else {
                $targetCollapse.collapse('hide');
            }
        } else if (hasNoDropdown) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            var href = $link.attr('href');
            if (href) {
                window.location.hash = href.substring(1);
            }
        }
    });
    
    // Removed debug catch-all handler to prevent event conflicts

    // Bootstrap collapse events to keep caret states synchronized
    $("#side-nav").on("shown.bs.collapse", ".accordion-collapse", function(e) {
        var $collapse = $(this);
        var targetId = $collapse.attr('id');
        
        // Only call load_nav_data_handler for talent category accordions
        // Check if this is a talent navigation accordion (nav-{category} pattern)
        if (load_nav_data_handler && targetId && targetId.startsWith('nav-')) {
            // Extract category from ID and validate it's a valid talent category
            var category = targetId.replace('nav-', '');
            var validCategories = ['base', 'celestial', 'chronomancy', 'corruption', 'cunning', 'cursed', 
                                 'demented', 'golem', 'inscriptions', 'misc', 'other', 'psionic', 'race', 
                                 'spell', 'steam', 'steamtech', 'technique', 'uber', 'undead', 'wild-gift'];
            
            if (validCategories.indexOf(category) !== -1) {
                load_nav_data_handler($collapse);
            }
        }
    });
    
    $("#side-nav").on("hidden.bs.collapse", ".collapse", function(e) {
        var $collapse = $(this);
        var targetId = $collapse.attr('id');
        var $dropdown = $("#side-nav").find('.dropdown[data-target="#' + targetId + '"], .dropdown[data-bs-target="#' + targetId + '"]');
        $dropdown.addClass('collapsed').attr('aria-expanded', 'false');
    });
    
    

    // enableExpandCollapseAll();
    // versions.init($(".ver-dropdown"), $(".ver-dropdown-container"));
    // masteries.init($(".mastery-dropdown"), $(".mastery-dropdown-container"));
    // configureImgSize();
    // adjustSidebarLayout();
    // $('.tt-dropdown-menu').width($('#content-header .header-tools').width());

    // We explicitly do NOT use var, for now, to facilitate inspection in Firebug.
    // (Our route handlers and such currently also rely on tome being global.)
    tome = {};
});
