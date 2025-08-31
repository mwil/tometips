var VERSION = '2017-03-11';

// http://stackoverflow.com/a/2548133/25507
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

/**Parses query string-like parameters out of the end of the hash.
 * Based on http://stackoverflow.com/a/2880929/25507
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

function getData()
{
    return tome[versions.current + '-' + masteries.current];
}

function escapeHtml(s)
{
    return s.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function locationHashNoQuery()
{
    return location.hash.replace(/\?.*/, '');
}

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

function setActiveNav(active_nav_route)
{
    $(".nav li").removeClass("active");
    if (active_nav_route) {
        $(".nav a[data-base-href='" + active_nav_route + "']").parent().addClass("active");
    }
}

///Updates navigation after a change
function updateNav() {
    // Update nav links to use the current version query.
    $("a[data-base-href]").each(function () {
        $(this).attr('href', $(this).attr('data-base-href') + currentQuery());
    });
}


// Removed old scrollToId function - using the updated one below

function createMobileNavigation(contentNav) {
    // Always create main navigation menu - CSS will handle visibility
    var mainNav = '<div class="mobile-main-nav">';
    mainNav += '<ul class="mobile-main-nav-list">';
    mainNav += '<li><a href="#races" data-nav="races">📊 Races</a></li>';
    mainNav += '<li><a href="#classes" data-nav="classes">⚔️ Classes</a></li>';
    mainNav += '<li><a href="#talents" data-nav="talents">🔮 Talents</a></li>';
    mainNav += '<li><a href="#items" data-nav="items">🗡️ Items</a></li>';
    mainNav += '</ul></div>';
    
    return mainNav + (contentNav || '');
}

function adjustSidebarLayout() {
    // Function to adjust content margin and width based on actual sidebar width
    function updateContentMargin() {
        var $sidebar = $('#side-nav-container');
        var $content = $('#content');
        
        // Skip adjustments on mobile - let CSS media queries handle it
        if (window.innerWidth <= 767.98) {
            $content.css({
                'margin-left': '',
                'width': ''
            });
            return;
        }
        
        // Wait for sidebar to be populated and measure its actual width
        if ($sidebar.length && $sidebar.children().length > 0) {
            var sidebarWidth = $sidebar.outerWidth();
            var margin = sidebarWidth + 20; // Add 20px buffer
            $content.css({
                'margin-left': margin + 'px',
                'width': 'calc(100% - ' + margin + 'px)' // Update width to fill remaining space
            });
        }
    }
    
    // Initial adjustment
    setTimeout(updateContentMargin, 100);
    
    // Re-adjust when sidebar content changes (navigation loads)
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                setTimeout(updateContentMargin, 50);
            }
        });
    });
    
    // Observe changes to sidebar content
    if ($('#side-nav').length) {
        observer.observe($('#side-nav')[0], {
            childList: true,
            subtree: true
        });
    }
    
    // Re-adjust on window resize
    $(window).on('resize', function() {
        setTimeout(updateContentMargin, 100);
    });
}

function enableExpandCollapseAll()
{
    $(".expand-all").addClass('fa fa-caret-down')
        .attr('title', 'Expand All');
    $(".collapse-all").addClass('fa fa-caret-up')
        .attr('title', 'Collapse All');
    $(".expand-all, .collapse-all").addClass('clickable')
        .click(function() {
            
            $($(this).attr('data-target')).find('.collapse').collapse($(this).hasClass('expand-all') ? 'show' : 'hide');
        });
}

/**Enforces sidebar accordion behavior by closing other open nav collapsibles */
function enforceSidebarAccordion(targetNavId) {
    if (!targetNavId.startsWith('#nav-')) return;
    
    // Disable automatic accordion behavior for items navigation - handle manually
    if (targetNavId.includes('artifacts') || targetNavId.includes('equipment') || 
        targetNavId.includes('consumables') || targetNavId.includes('special')) {
        return;
    }
    
    var targetId = targetNavId.substring(1);
    
    // Close all other sidebar nav collapsibles
    $('#side-nav .collapse.show').each(function() {
        if (this.id !== targetId) {
            $(this).collapse('hide');
            $('[data-target="#' + this.id + '"]').addClass('collapsed');
        }
    });
}

function showCollapsed(html_id, disable_transitions)
{
    if (html_id[0] != '#') {
        html_id = '#' + html_id;
    }

    // Hack: If requested, temporarily disable transitions.  Bootstrap's default
    // transition is 0.35s, so we do just a bit longer.
    // Based on http://stackoverflow.com/a/22428493/25507
    if (disable_transitions) {
        $(html_id).addClass('disable-transition');
        setTimeout(function() { $(html_id).removeClass('disable-transition'); }, 400);
    }

    $(html_id).collapse('show');
    // Hack: Update "collapsed" class, since Bootstrap doesn't seem to do it
    // for us (unless, presumably, we use data-parent for full-blown accordion
    // behavior, and I don't really want to do that).
    $("[data-target='" + html_id + "']").removeClass('collapsed');
}

/**Shows a collapsible with accordion behavior for sidebar navigation */
function showCollapsedWithAccordion(html_id, disable_transitions) {
    enforceSidebarAccordion(html_id);
    showCollapsed(html_id, disable_transitions);
}

/**Gets the HTML IDs of currently expanded collapsed items. 
 * Only captures sidebar nav items, not talent panels. */
function getExpandedIds()
{
    return $.map($(".collapse.show"), function(n, i) {
        // Only capture navigation items (nav-*) and not talent panels (collapse-*)
        // This prevents talent panels from being auto-restored when clicking tree names
        if (n.id && n.id.startsWith('nav-')) {
            return n.id;
        }
        return null;
    }).filter(function(id) { return id !== null; });
}

function expandIds(id_list, disable_transitions)
{
    for (var i = 0; i < id_list.length; i++) {
        showCollapsed(id_list[i], disable_transitions);
    }
}

// List of collapsible IDs which are currently expanded, so that we can
// maintain expanded/collapsed state when switching versions.
var prev_expanded = null;

function updateFinished() {
    
    if (prev_expanded) {
        // Only restore the first nav item to maintain accordion behavior
        var navItems = prev_expanded.filter(function(id) { return id.startsWith('nav-'); });
        
        if (navItems.length > 0) {
            showCollapsedWithAccordion('#' + navItems[0], true);
        }
        
        // DO NOT restore talent panel expanded state - let them start collapsed
        // This prevents clicking tree names from expanding all talent panels
        // var nonNavItems = prev_expanded.filter(function(id) { return !id.startsWith('nav-'); });
        // expandIds(nonNavItems, true);
        
        prev_expanded = null;
    }
}

// Header is now always fixed - no sticky behavior needed

var options = {
    imgSize: 48
};

///Simplistic title-case function that capitalizes the beginning of every word.
function toTitleCase(s)
{
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

///ToME-specific function that makes a ToME ID a valid and standard HTML ID
function toHtmlId(s)
{
    // Replace characters known to cause issues in CSS selectors, then collapse multiple underscores
    return s.toLowerCase().replace(/[':\/\s&]/g, '_').replace(/_+/g, '_');
}

///As toHtmlId, but leaves slashes intact, for code like talents that
///legitimately uses them (e.g., "spells/fire").
function toUnsafeHtmlId(s)
{
    return s.toLowerCase().replace(/[':]/, '_');
}

/**Given an object, return a new object that indexes the object's properties by
 * HTML ID.
 *
 * For example, if classes = { 'WARRIOR': { 'short_name': 'WARRIOR', ... }, ...},
 * then indexByHtmlId(classes, 'short_name') will return
 * { 'warrior': { 'short_name': 'WARRIOR', ... }, ...}
 */
function indexByHtmlId(obj, property) {
    return _.object(_.map(obj, function(elem) { return [ toHtmlId(elem[property]), elem ]; }));
}

/**Marks up inline links to the ToME wiki */
function markupHintLinks() {
    // TODO: Try FontAwesome instead. I think it might look nicer than glyphicon here.
    $('.hint-link[target!=_blank]').append(' <span class="fa fa-external-link-alt"></span>')
        .attr('target', '_blank');
}

function enableTalentTooltips() {
    $(".html-tooltip").tooltip({ html: true });
    $(".variable, .talent-variable, .stat-variable")
        .attr('data-toggle', 'tooltip')
        .tooltip({ html: true });
}

Handlebars.registerHelper('tome_git_url', function() {
    return 'http://git.net-core.org/tome/t-engine4';
});

// Helper to detect DLC content based on source_code path
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

///Iterates over properties, sorted. Based on http://stackoverflow.com/a/9058854/25507.
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
    return context.toLowerCase();
});

Handlebars.registerHelper('capitalize', function(context, options) {
    if (!context) return '';
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
   return toTitleCase(context).replace(' ', '_');
});

Handlebars.registerHelper('tag', function(context, options) {
    return getData().tag;
});

Handlebars.registerHelper('currentQuery', function(context, options) {
    return currentQuery();
});

Handlebars.registerHelper('opt', function(opt_name) {
    return options[opt_name];
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

// Old configureImgSize function removed - replaced by new imgSizeSettings system

var typeahead = (function() {
    var categories = [ 'races', 'classes', 'talents-types', 'talents' ];
    var category_header = {
        'races': 'Races',
        'classes': 'Classes',
        'talents-types': 'Talent Categories',
        'talents': 'Talents'
    };

    // Bloodhound search objects.  These are indexed by version number and have
    // subkeys for each data source.
    var search = {};

    function updateSearch(version) {
        if (search[version]) {
            return;
        }

        search[version] = {};
        for (var i = 0; i < categories.length; i++) {
            search[version][categories[i]] = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.nonword('name'),
                queryTokenizer: Bloodhound.tokenizers.nonword,
                limit: 10,
                prefetch: {
                    url: 'data/' + version + '/search.' + categories[i] + '.json',
                    thumbprint: VERSION
                }
            });

            // FIXME: Do this if we detect a version change
            //search[version][categories[i]].clearPrefetchCache();

            search[version][categories[i]].initialize();
        }
    }

    function initTypeahead(version) {
        var datasets = [];
        for (var i = 0; i < categories.length; i++) {
            datasets.push({
                name: version.replace(/\./g, '_') + '-' + categories[i],
                displayKey: 'name',
                source: search[version][categories[i]].ttAdapter(),
                templates: {
                    header: '<h4>' + category_header[categories[i]] + '</h4>',
                    suggestion: Handlebars.templates.search_suggestion
                }
            });
        }
        $('.typeahead').typeahead({ highlight: true, minLength: 1 }, datasets);
        
        // Add clear button functionality (using event delegation)
        $(document).off('click', '.search-clear').on('click', '.search-clear', function() {
            var $input = $('.typeahead');
            $input.typeahead('val', '');
            $input.val('');
            $input.trigger('input');
            $('.search-container').removeClass('has-content');
        });
        
        // Show/hide clear button based on input content (using event delegation)
        $(document).off('input', '.typeahead').on('input', '.typeahead', function() {
            if ($(this).val().length > 0) {
                $('.search-container').addClass('has-content');
            } else {
                $('.search-container').removeClass('has-content');
            }
        });
        
        // Handle Enter key to navigate to highlighted result - try multiple approaches
        $('.typeahead').on('typeahead:select', function(e, suggestion) {
            if (suggestion && suggestion.href) {
                window.location.hash = toUnsafeHtmlId(suggestion.href) + currentQuery();
            }
        });
        
        $('.typeahead').on('typeahead:autocomplete', function(e, suggestion) {
            if (suggestion && suggestion.href) {
                window.location.hash = toUnsafeHtmlId(suggestion.href) + currentQuery();
            }
        });
        
        var currentHighlighted = null;
        
        // Function to enhance talent URLs for direct panel linking
        function enhanceTalentUrl(href, $element) {
            // For now, just return the original href
            // TODO: Implement logic to detect individual talents and construct direct URLs
            return href;
        }
        
        // Debug: check what happens with keyboard navigation (using event delegation)
        $(document).off('keydown', '.typeahead').on('keydown', '.typeahead', function(e) {
            if (e.which === 38 || e.which === 40) { // Up/Down arrows
                setTimeout(function() {
                    var $highlighted = $('.tt-suggestion.tt-cursor, .tt-suggestion:hover, .tt-suggestion.tt-is-under-cursor');
                    // Add visual highlighting if missing
                    $('.tt-suggestion').removeClass('manual-highlight');
                    $highlighted.addClass('manual-highlight');
                    // Store the currently highlighted element
                    currentHighlighted = $highlighted.length > 0 ? $highlighted.find('a').attr('href') : null;
                }, 10);
            }
            if (e.which === 13) { // Enter
                e.preventDefault();
                
                // Try immediate check first
                var $highlighted = $('.tt-suggestion.tt-cursor, .tt-suggestion:hover, .tt-suggestion.tt-is-under-cursor, .tt-suggestion.manual-highlight');
                
                if ($highlighted.length > 0) {
                    var $link = $highlighted.find('a');
                    if ($link.length > 0) {
                        window.location.hash = $link.attr('href').substring(1); // Remove the leading #
                        // Clear search field after navigation
                        $('.typeahead').typeahead('val', '');
                        $('.typeahead').val('');
                        $('.search-container').removeClass('has-content');
                        return;
                    }
                }
                
                // Fall back to stored href
                if (currentHighlighted) {
                    // Remove leading # if present
                    var hash = currentHighlighted.startsWith('#') ? currentHighlighted.substring(1) : currentHighlighted;
                    window.location.hash = hash;
                    // Clear search field after navigation
                    $('.typeahead').typeahead('val', '');
                    $('.typeahead').val('');
                    $('.search-container').removeClass('has-content');
                }
            }
        });
    }

    function updateTypeahead(version) {
        $('.typeahead').typeahead('destroy');
        initTypeahead(version);
    }

    return {
        init: function(version) {
            updateSearch(version);
            initTypeahead(version);
        },

        update: function(version) {
            updateSearch(version);
            updateTypeahead(version);
        },
    };
})();

// ToME versions.
var versions = (function() {
    var $_dropdown;

    // List of collapsible IDs which are currently expanded, so that we can
    // maintain expanded/collapsed state when switching versions.

    function onChange() {
        $_dropdown.val(versions.current);

        // Hack: If version changes, then save what IDs are expanded so
        // we can restore their state after we recreate them for the
        // new version, and also assume that the side nav needs to be
        // refreshed.  (This is a hack because it ties the versions
        // module too closely to our DOM organization.)
        prev_expanded = getExpandedIds();
        $("#side-nav").html("");

        updateNav();
        typeahead.update(versions.current);
    }

    var versions = {
        DEFAULT: '1.7.6',
        ALL: [ '1.7.6' ],
        DISPLAY: { 'master': 'next' },

        name: function(ver) {
            return versions.DISPLAY[ver] || ver;
        },

        isMajor: function(ver) {
            return ver.endsWith('.0');
        },

        asMajor: function(ver) {
            return ver.replace(/\.\d+$/, '');
        },

        update: function(query) {
            query = query || {};
            query.ver = query.ver || versions.DEFAULT;
            if (versions.current != query.ver) {
                versions.current = query.ver;
                onChange();
            }
        },

        asQuery: function() {
            if (versions.current == versions.DEFAULT) {
                return '';
            } else {
                return 'ver=' + versions.current;
            }
        },

        // Lists available versions in the given <option> element(s).
        list: function($el, $container) {
            var html = '';
            for (var i = 0; i < versions.ALL.length; i++) {
                html += '<option value="' + versions.ALL[i] + '"';
                if (versions.ALL[i] == versions.DEFAULT) {
                    html += ' selected';
                }
                html += '>' + versions.name(versions.ALL[i]) + '</option>';
            }
            ($container || $el).removeClass("hidden").show();
            $el.html(html);
        },

        // Listens for version change events in the given <option> element(s).
        listen: function($el) {
            $el.change(function() {
                versions.current = $(this).val();
                onChange();
                hasher.setHash(locationHashNoQuery() + currentQuery());
            });
        },

        // If 'master' isn't shown, then redirect queries to current release.
        redirectMasterToDefault: function(new_hash, old_hash) {
            if (parseHashQueryString().ver == 'master') {
                hasher.replaceHash(locationHashNoQuery());
                return true;
            }
        },

        init: function($el, $container) {
            $_dropdown = $el;
            versions.list($el, $container);
            versions.listen($el);
            updateNav();
            typeahead.init(versions.current);
        }
    };
    versions.current = versions.DEFAULT;
    return versions;
}());

// talent masteries.
var masteries = (function() {
    var $_dropdown;

    function onChange() {
        $_dropdown.val(masteries.current);

        prev_expanded = getExpandedIds();
        $("#side-nav").html("");

        updateNav();
    }

    var masteries = {
        DEFAULT: '1.3',
        ALL: [ '0.8', '1.0', '1.1', '1.2', '1.3', '1.5' ],

        name: function(ver) {
            return ver;
        },

        update: function(query) {
            query = query || {};
            query.ver = query.mastery || versions.DEFAULT;
            if (masteries.current != query.mastery) {
                masteries.current = query.mastery;
                onChange();
            }
        },

        asQuery: function() {
            if (masteries.current == masteries.DEFAULT) {
                return '';
            } else {
                return 'mastery=' + masteries.current;
            }
        },

        // Lists available versions in the given <option> element(s).
        list: function($el, $container) {
            var html;
            if (masteries.ALL.length < 2) {
                ($container || $el).hide();
            } else {
                html = '';
                for (var i = 0; i < masteries.ALL.length; i++) {
                    html += '<option value="' + masteries.ALL[i] + '"';
                    if (masteries.ALL[i] == masteries.DEFAULT) {
                        html += ' selected';
                    }
                    html += '>' + masteries.name(masteries.ALL[i]) + '</option>';
                }
                ($container || $el).removeClass("hidden").show();
                $el.html(html);
            }
        },

        // Listens for change events in the given <option> element(s).
        listen: function($el) {
            $el.change(function() {
                masteries.current = $(this).val();
                onChange();
                hasher.setHash(locationHashNoQuery() + currentQuery());
            });
        },

        init: function($el, $container) {
            $_dropdown = $el;
            masteries.list($el, $container);
            masteries.listen($el);
            updateNav();
        }
    };
    masteries.current = masteries.DEFAULT;
    return masteries;
}());

var routes,
    load_nav_data_handler,
    base_title = document.title;

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
            loadDataIfNeeded('changes.talents', function() {
                document.title += ' - New in ' + getData().majorVersion;
                $("#content").html(listChangesTalents(tome));

                enableTalentTooltips();
                updateFinished();
            });
        }),

        recent_changes_talents: crossroads.addRoute('recent-changes/talents:?query:', function(query) {
            // FIXME: Remove duplication with changes_talents route
            routes.talents.matched.dispatch(query);

            $("#content-container").scrollTop(0);
            loadDataIfNeeded('recent-changes.talents', function() {
                document.title += ' - New in ' + getData().version;
                $("#content").html(listRecentChangesTalents(tome));

                enableTalentTooltips();
                updateFinished();
            });
        }),

        talents: crossroads.addRoute('talents:?query:', function(query) {
            versions.update(query);
            document.title = base_title + ' - Talents';
            setActiveNav("#talents");

            if (!$("#nav-talents").length) {
                loadDataIfNeeded('', function() {
                    $("#side-nav").html(createMobileNavigation(navTalents(tome)));
                    load_nav_data_handler = loadNavTalents;
                    $("#content").html($("#news").html());
                });
            }
        }),

        talents_category: crossroads.addRoute("talents/{category}:?query:", function(category, query) {
            
            routes.talents.matched.dispatch(query);
            document.title += ' - ' + toTitleCase(category);

            $("#content-container").scrollTop(0);
            loadDataIfNeeded('talents.' + category, function() {
                
                var this_nav = "#nav-" + category;
                showCollapsedWithAccordion(this_nav);

                fillNavTalents(tome, category);
                $("#content").html(listTalents(tome, category));
                scrollToId();

                // DISABLED: Manual collapse initialization was causing panels to auto-expand in Bootstrap 5
                // Bootstrap 5 handles collapse differently than Bootstrap 3
                // The original issue (first click on Hide All expands all) doesn't occur in Bootstrap 5
                // See https://github.com/twbs/bootstrap/issues/5859
                
                // However, we still need to convert Bootstrap 3 attributes to Bootstrap 5 for the talent panels
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
                    
                    var $panel = $(this);
                    var $contentContainer = $("#content-container");
                    
                    // Use setTimeout to ensure panel is fully expanded
                    setTimeout(function() {
                        if (isScrolling) return;
                        isScrolling = true;
                        
                        var panelTop = $panel.offset().top;
                        var panelHeight = $panel.outerHeight();
                        var panelBottom = panelTop + panelHeight;
                        
                        var containerScrollTop = $contentContainer.scrollTop();
                        var containerTop = $contentContainer.offset().top;
                        var containerHeight = $contentContainer.height();
                        var containerBottom = containerTop + containerHeight;
                        
                        // Check if panel extends beyond visible area
                        if (panelBottom > containerBottom) {
                            var targetScroll = containerScrollTop + (panelBottom - containerBottom) + 20;
                            
                            $contentContainer.animate({
                                scrollTop: targetScroll
                            }, 300, function() {
                                isScrolling = false;
                            });
                        } else {
                            isScrolling = false;
                        }
                    }, 50);
                });

                enableTalentTooltips();

                fillTalentAvailability(tome, category);
                updateFinished();
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
            versions.update(query);
            document.title += ' - Races';
            setActiveNav("#races");

            if (!$("#nav-races").length) {
                loadRacesIfNeeded(function() {
                    $("#side-nav").html(createMobileNavigation(navRaces(tome)));
                    load_nav_data_handler = false;
                    $("#content").html($("#news").html());
                });
            }
        }),

        races_race: crossroads.addRoute("races/{r}:?query:", function(r, query) {
            versions.update(query);

            loadRacesIfNeeded(function() {
                routes.races.matched.dispatch(query);

                var data = getData();
                if (!data.races.races_by_id[r]) {
                    handleUnknownRace(tome, r);
                    return;
                }

                document.title += ' - ' + data.races.races_by_id[r].display_name;

                $("#content-container").scrollTop(0);

                var this_nav = "#nav-" + r;
                showCollapsedWithAccordion(this_nav);

                $("#content").html(listRaces(tome, r));
                
                fillRaceTalents(tome, r, function() {
                    // All race talent data has loaded, now scroll to the target
                    scrollToId();
                });

                updateFinished();
            });
        }),

        races_race_subrace: crossroads.addRoute("races/{r}/{subrace}:?query:", function(r, subrace, query) {
            // For subrace routes, load the parent race page but skip the scroll-to-top behavior
            versions.update(query);

            loadRacesIfNeeded(function() {
                routes.races.matched.dispatch(query);

                var data = getData();
                if (!data.races.races_by_id[r]) {
                    handleUnknownRace(tome, r);
                    return;
                }

                document.title += ' - ' + data.races.races_by_id[r].display_name;

                // Skip the scrollTop(0) for subrace navigation

                var this_nav = "#nav-" + r;
                showCollapsedWithAccordion(this_nav);

                $("#content").html(listRaces(tome, r));
                
                fillRaceTalents(tome, r, function() {
                    // All race talent data has loaded, now scroll to the target
                    scrollToId();
                });

                updateFinished();
            });
        }),

        classes: crossroads.addRoute('classes:?query:', function(query) {
            versions.update(query);
            document.title += ' - Classes';
            setActiveNav("#classes");

            if (!$("#nav-classes").length) {
                loadClassesIfNeeded(function() {
                    $("#side-nav").html(createMobileNavigation(navClasses(tome)));
                    load_nav_data_handler = false;
                    $("#content").html($("#news").html());
                });
            }
        }),

        classes_class: crossroads.addRoute("classes/{cls}:?query:", function(cls, query) {
            versions.update(query);

            loadClassesIfNeeded(function() {
                routes.classes.matched.dispatch(query);
                document.title += ' - ' + getData().classes.classes_by_id[cls].display_name;

                $("#content-container").scrollTop(0);

                var this_nav = "#nav-" + cls;
                showCollapsedWithAccordion(this_nav);

                $("#content").html(listClasses(tome, cls));
                
                fillClassTalents(tome, cls, function() {
                    // All class talent data has loaded, now scroll to the target
                    scrollToId();
                });

                updateFinished();
            });
        }),

        classes_class_subclass: crossroads.addRoute("classes/{cls}/{subclass}:?query:", function(cls, subclass, query) {
            // For subclass routes, load the parent class page but skip the scroll-to-top behavior
            versions.update(query);

            loadClassesIfNeeded(function() {
                routes.classes.matched.dispatch(query);
                document.title += ' - ' + getData().classes.classes_by_id[cls].display_name;

                // Skip the scrollTop(0) for subclass navigation
                
                var this_nav = "#nav-" + cls;
                showCollapsedWithAccordion(this_nav);

                $("#content").html(listClasses(tome, cls));
                
                fillClassTalents(tome, cls, function() {
                    // All class talent data has loaded, now scroll to the target
                    scrollToId();
                });

                updateFinished();
            });
        }),

        items: crossroads.addRoute('items:?query:', function(query) {
            versions.update(query);
            document.title = base_title + ' - Items';
            setActiveNav("#items");

            if (!$("#nav-items").length) {
                loadItemsData().then(function() {
                    $("#side-nav").html(createMobileNavigation(navItems()));
                    load_nav_data_handler = false;
                    $("#content").html(listItems('all'));
                });
            }
        }),

        items_category: crossroads.addRoute("items/{category}:?query:", function(category, query) {
            routes.items.matched.dispatch(query);
            document.title += ' - ' + toTitleCase(category);

            $("#content-container").scrollTop(0);
            loadItemsData().then(function() {
                var this_nav = "#nav-" + category;
                showCollapsedWithAccordion(this_nav);

                $("#content").html(listItems(category));
                scrollToId();
                updateFinished();
            });
        }),

        items_subcategory: crossroads.addRoute("items/{category}/{subcategory}:?query:", function(category, subcategory, query) {
            routes.items.matched.dispatch(query);
            document.title += ' - ' + toTitleCase(category) + ' - ' + toTitleCase(subcategory);

            $("#content-container").scrollTop(0);
            loadItemsData().then(function() {
                var this_nav = "#nav-" + category + "-" + subcategory;
                showCollapsedWithAccordion(this_nav);

                $("#content").html(listItems(category, subcategory));
                scrollToId();
                updateFinished();
            });
        }),

        items_subgroup: crossroads.addRoute("items/{category}/{subcategory}/{subgroup}:?query:", function(category, subcategory, subgroup, query) {
            routes.items_subcategory.matched.dispatch(category, subcategory, query);
        }),

        items_item: crossroads.addRoute("items/{category}/{itemId}:?query:", function(category, itemId, query) {
            routes.items_category.matched.dispatch(category, query);
        })
    };

    function parseHash(new_hash, old_hash) {
        
        if (!versions.redirectMasterToDefault()) {
            crossroads.parse(new_hash);
        }
    }

    hasher.prependHash = '';
    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    if (googletag && googletag.pubads) hasher.changed.add(function() { googletag.pubads().refresh([ad_slot]) });
    hasher.init();
}

function loadData(data_file, success) {
    var url = "data/" + versions.current + "/" + data_file;
    // talent files include the mastery
    if (data_file.substr(0, 8) == 'talents.')
        url += '-' + ((masteries.current == '1.0') ? '1' : masteries.current);

    $.ajax({
        url: url + '.json',
        dataType: "json"
    }).done(success);
    // FIXME: Error handling
}

/**Handler for expanding nav items. Takes a jQuery element that's being
 * expanded and does any on-demand loading of the data for that nav item.
 */
load_nav_data_handler = false;

/**Loads a section of JSON data into the tome object if needed, then executes
 * the success function handler.
 *
 * For example, if data_file is "talents.chronomancy", then this function
 * loads talents_chronomancy.json to tome.talents.chronomancy then calls
 * success(tome.talents.chronomancy).
 */
function loadDataIfNeeded(data_file, success) {
    var parts, last_part, tome_part;

    // Special case: No data has been loaded at all.
    // Load top-level data, then reissue the request.
    if (!getData()) {
        loadData('tome', function(data) {
            data.hasMajorChanges = versions.asMajor(data.version) != versions.asMajor(versions.ALL[0]);
            data.hasMinorChanges = data.version != versions.ALL[0] &&
                !versions.isMajor(data.version) &&
                data.version != 'master';

            data.version = versions.name(data.version);
            data.majorVersion = versions.asMajor(data.version);

            data.fixups = {};

            tome[versions.current + '-' + masteries.current] = data;
            loadDataIfNeeded(data_file, success);
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
    tome_part = getData();

    for (var i = 0; i < parts.length; i++) {
        if (typeof(tome_part[parts[i]]) === 'undefined') {
            tome_part[parts[i]] = {};
        }
        tome_part = tome_part[parts[i]];
    }

    if (!tome_part[last_part]) {
        loadData(data_file, function(data) {
            tome_part[last_part] = data;
            success(data);
        });
    } else {
        success(tome_part[last_part]);
    }
}

// Image size settings management
var imgSizeSettings = {
    size: 32, // default size
    
    set: function(size) {
        this.size = size;
        localStorage.setItem('tome-tips-img-size', size);
        this.updateActiveMenuItem(size);
    },
    
    get: function() {
        var saved = localStorage.getItem('tome-tips-img-size');
        return saved ? parseInt(saved) : this.size;
    },
    
    updateActiveMenuItem: function(size) {
        $('.option-img-size').removeClass('active');
        $('.option-img-size[data-img-size="' + size + '"]').addClass('active');
    },
    
    applyIconSizeClasses: function(size) {
        // Remove old size classes and apply new one
        var $containers = $('.class-talents-detail');
        $containers
            .removeClass('icon-size-32 icon-size-48 icon-size-64')
            .addClass('icon-size-' + size);
        
        // Update talent tree spacing based on icon size to prevent overlap
        var marginBottom;
        switch(size) {
            case 32:
                marginBottom = '15px';
                break;
            case 48:
                marginBottom = '25px';
                break;
            case 64:
                marginBottom = '35px';
                break;
            default:
                marginBottom = '15px';
        }
        
        // Apply spacing to both old list items and new table rows
        var $listItems = $('.col-md-4 > ul > li, .class-detail-container .col-md-4 > ul > li'); // Legacy list support
        var $treeTableRows = $('.talent-tree-row'); // New outer table rows for talent trees
        var $iconTableRows = $('.talent-row'); // Inner table rows for individual talent icons
        
        // Compact spacing values for different icon sizes
        var compactMargin;
        switch(size) {
            case 32:
                compactMargin = '8px';
                break;
            case 48:
                compactMargin = '12px';
                break;
            case 64:
                compactMargin = '16px';
                break;
            default:
                compactMargin = '8px';
        }
        
        // Apply spacing to legacy list items (if any remain)
        $listItems.css({
            'margin-bottom': compactMargin,
            'padding-bottom': compactMargin,
            'min-height': 'auto'
        });
        $listItems.removeClass('spacing-32 spacing-48 spacing-64')
                 .addClass('spacing-' + size);
        
        // Apply spacing classes to the new table structure
        $treeTableRows.removeClass('spacing-32 spacing-48 spacing-64')
                      .addClass('spacing-' + size);
        
    }
};

// Handlebars helper for accessing settings
Handlebars.registerHelper('opt', function(option) {
    if (option === 'imgSize') {
        // Get the current menu setting
        var menuSize = imgSizeSettings.get();
        
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
    return '';
});

function handleTalentsPageSizeChange(menuSize) {
    // For talents page, we need to re-render the content to pick up new icon sizes
    // since the images are rendered from Handlebars templates using {{opt "imgSize"}}
    
    var currentHash = window.location.hash || '';
    var hashParts = currentHash.substring(1).split('/');
    
    // Check if we're on a specific talents category page
    if (hashParts.length >= 2 && hashParts[0] === 'talents') {
        var category = hashParts[1];
        
        // Re-render the talents content with new icon size
        var talentData = getData().talents && getData().talents[category];
        if (talentData) {
            $("#content").html(listTalents(tome, category));
            enableTalentTooltips();
            fillTalentAvailability(tome, category);
            scrollToId(); // Maintain scroll position if user was viewing a specific talent
        }
    }
}

function handleItemsPageSizeChange(menuSize) {
    // Map menu size to actual size for items page (same as talents)
    var actualSize;
    switch(menuSize) {
        case 32: actualSize = 32; break; // Small
        case 48: actualSize = 64; break; // Medium  
        case 64: actualSize = 96; break; // Large
        default: actualSize = 64; break; // Default to medium
    }
    
    // Update all item images on the page
    $('.item-card img, .item-header img, .item-header-full img, .item-icon').each(function() {
        var $img = $(this);
        var currentSrc = $img.attr('src');
        if (currentSrc && currentSrc.includes('/object/')) {
            // Update image src to use new size
            var newSrc = currentSrc.replace(/\/\d+\//, '/' + actualSize + '/');
            $img.attr('src', newSrc);
            $img.attr('width', actualSize);
            $img.attr('height', actualSize);
        }
    });
    
    // Update placeholders too
    $('.item-icon-placeholder').css({
        'width': actualSize + 'px',
        'height': actualSize + 'px'
    });
}

function configureImgSize() {
    // Load saved setting
    imgSizeSettings.size = imgSizeSettings.get();
    imgSizeSettings.updateActiveMenuItem(imgSizeSettings.size);
    imgSizeSettings.applyIconSizeClasses(imgSizeSettings.size);
    
    // Handle dropdown clicks
    $(document).on('click', '.option-img-size', function(e) {
        e.preventDefault();
        var newSize = parseInt($(this).data('img-size'));
        imgSizeSettings.set(newSize);
        
        // Apply new size classes for proper spacing
        imgSizeSettings.applyIconSizeClasses(newSize);
        
        // Check if we're on talents, items, or classes page
        var currentHash = window.location.hash || '';
        var isTalentsPage = currentHash.includes('#talents');
        var isItemsPage = currentHash.includes('#items');
        
        if (isTalentsPage) {
            // For talents page, re-render images with size mapping
            handleTalentsPageSizeChange(newSize);
        } else if (isItemsPage) {
            // For items page, update images with size mapping (same as talents)
            handleItemsPageSizeChange(newSize);
        } else {
            // For classes page, update image sources directly
            $('.class-talents-detail').each(function() {
                var $container = $(this);
                if ($container.children().length > 0) {
                    // Re-render this talent tree's icons
                    $container.find('img').each(function() {
                        var $img = $(this);
                        var currentSrc = $img.attr('src');
                        // Update image src to use new size
                        var newSrc = currentSrc.replace(/\/\d+\//, '/' + newSize + '/');
                        $img.attr('src', newSrc);
                        $img.attr('width', newSize);
                        $img.attr('height', newSize);
                    });
                }
            });
        }
    });
}

// Global function for testing from console
window.testSpacing = function(size) {
    size = size || 64;
    if (typeof imgSizeSettings !== 'undefined') {
        imgSizeSettings.set(size);
        imgSizeSettings.applyIconSizeClasses(size);
    }
};

// Helper function to get location hash without query parameters
function locationHashNoQuery() {
    return location.hash.split('?')[0];
}

// Dynamic anchor scrolling function
// HOW DEEP TALENT NAVIGATION WORKS:
// 1. Search results create URLs like: #talents/chronomancy/flux/attenuate
// 2. The talents_category_type_id route delegates to talents_category route
// 3. The talents_category route loads data, renders content, then calls scrollToId()
// 4. The handlebars template (talent_by_type.handlebars) creates elements with IDs like:
//    - talents/chronomancy/flux/t_attenuate (note the t_ prefix!)
// 5. scrollToId() tries multiple ID formats to find the correct element:
//    a) Direct match: talents/chronomancy/flux/attenuate
//    b) With t_ prefix: talents/chronomancy/flux/t_attenuate  
//    c) With t_ prefix + toHtmlId transform for special chars
// 6. Once found, it scrolls directly to the talent element
function scrollToId() {
    var hash = locationHashNoQuery();
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
                var transformedId = talentId.toLowerCase().replace(/[':\/]/, '_');
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
                var transformedId = talentId.toLowerCase().replace(/[':\/]/, '_');
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
        var totalOffset = 4;
        
        // For talent links, scroll to the card header instead of the link itself for better visual positioning
        var $scrollTarget = $target;
        if ($target.closest('.card-header').length) {
            $scrollTarget = $target.closest('.card-header');
        }
        
        // Use the element's position within the content, not relative to container
        var $content = $('#content');
        var contentTop = $content.offset().top;
        var elementTop = $scrollTarget.offset().top;
        
        // Calculate the scroll position needed
        var targetScroll = elementTop - contentTop - totalOffset;
        
        // Scroll to the calculated position
        $("#content-container").scrollTop(Math.max(0, targetScroll));
        
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
}

window.onerror = function(msg, url, line) {
    $("html").removeClass("wait");

    if ($("#content").html() === 'Loading...') {
        $("#content").html('');
    }

    $("#content").prepend(
        '<div class="alert alert-danger">' +
            'Internal error: ' + escapeHtml(msg || '') +
            ' on ' + url + ' line ' + line +
            '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'  +
        '</div>'
    );
};

$(function() {
    // See http://stackoverflow.com/a/10801889/25507
    $(document).ajaxStart(function() { $("html").addClass("wait"); });
    $(document).ajaxStop(function() { $("html").removeClass("wait"); });

    // Clicking on a ".clickable" element triggers the <a> within it.
    $("html").on("click", ".clickable", function(e) {
        // Skip expand-all/collapse-all buttons - they have their own handlers
        if ($(this).hasClass('expand-all') || $(this).hasClass('collapse-all')) {
            return true;
        }
        
        if (e.target.nodeName == 'A') {
            // If the user clicked on the link itself, then simply let
            // the browser handle it.
            return true;
        }

        $(this).find('a').click();
    });

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
    $("#side-nav").on("shown.bs.collapse", ".collapse", function(e) {
        var $collapse = $(this);
        var targetId = $collapse.attr('id');
        var $dropdown = $("#side-nav").find('.dropdown[data-target="#' + targetId + '"], .dropdown[data-bs-target="#' + targetId + '"]');
        $dropdown.removeClass('collapsed').attr('aria-expanded', 'true');
        
        if (load_nav_data_handler) {
            load_nav_data_handler($collapse);
        }
    });
    
    $("#side-nav").on("hidden.bs.collapse", ".collapse", function(e) {
        var $collapse = $(this);
        var targetId = $collapse.attr('id');
        var $dropdown = $("#side-nav").find('.dropdown[data-target="#' + targetId + '"], .dropdown[data-bs-target="#' + targetId + '"]');
        $dropdown.addClass('collapsed').attr('aria-expanded', 'false');
    });
    
    

    $("html").on("error", "img", function() {
        $(this).hide();
    });

    enableExpandCollapseAll();
    versions.init($(".ver-dropdown"), $(".ver-dropdown-container"));
    masteries.init($(".mastery-dropdown"), $(".mastery-dropdown-container"));
    configureImgSize();
    adjustSidebarLayout();
    $('.tt-dropdown-menu').width($('#content-header .header-tools').width());

    // Track Google Analytics as we navigate from one subpage / hash link to another.
    // Based on http://stackoverflow.com/a/4813223/25507
    // Really old browsers don't support hashchange.  A plugin is available, but I don't really care right now.
    $(window).on('hashchange', function() {
        _gaq.push(['_trackPageview', location.pathname + location.search + location.hash]);
        // Don't scroll here - let the route handlers call scrollToId after content loads
    });

    // Dark mode toggle functionality
    function initDarkMode() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
        
        // Apply initial theme
        document.documentElement.setAttribute('data-theme', initialTheme);
        updateThemeToggleText(initialTheme);
        
        // Theme toggle click handler
        $('#theme-toggle').on('click', function(e) {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggleText(newTheme);
        });
        
        function updateThemeToggleText(theme) {
            const $toggle = $('#theme-toggle');
            if (theme === 'dark') {
                $toggle.text('☀️ Light mode');
            } else {
                $toggle.text('🌙 Dark mode');
            }
        }
    }
    
    // Function to refresh current navigation content
    function refreshCurrentNavigation() {
        var currentHash = window.location.hash;
        var $sideNav = $("#side-nav");
        var currentContent = $sideNav.html();
        
        // Only refresh if there's existing content
        if (currentContent) {
            var contentNav = '';
            
            // Extract the content navigation part (everything after mobile-main-nav div)
            if (currentContent.indexOf('mobile-main-nav') !== -1) {
                var mobileNavMatch = currentContent.match(/<div class="mobile-main-nav">.*?<\/div>(.*)/s);
                contentNav = mobileNavMatch ? mobileNavMatch[1] : currentContent;
            } else {
                // No mobile nav found, use all content as content nav
                contentNav = currentContent;
            }
            
            // Regenerate with current screen size logic
            $sideNav.html(createMobileNavigation(contentNav));
        }
    }
    
    // Mobile navigation functionality
    function initMobileNavigation() {
        // Mobile nav toggle
        $('.mobile-nav-toggle').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileNav();
        });
        
        // Close mobile nav when clicking overlay
        $('.mobile-nav-overlay').on('click', function() {
            closeMobileNav();
        });
        
        // Handle main navigation clicks in mobile menu
        $(document).on('click', '.mobile-main-nav a[data-nav]', function(e) {
            e.preventDefault();
            var navType = $(this).data('nav');
            var hash = $(this).attr('href');
            
            // Add active state to clicked button
            $('.mobile-main-nav a').removeClass('active');
            $(this).addClass('active');
            
            // Navigate to the section WITHOUT closing mobile nav
            window.location.hash = hash;
        });
        
        // Close mobile nav when clicking outside sidebar
        $(document).on('click', function(e) {
            if (window.innerWidth <= 767.98) {
                var $target = $(e.target);
                var isMenuOpen = $('#side-nav-container').hasClass('mobile-nav-open');
                var isClickInsideSidebar = $target.closest('#side-nav-container').length > 0;
                var isClickOnToggle = $target.closest('.mobile-nav-toggle').length > 0;
                
                if (isMenuOpen && !isClickInsideSidebar && !isClickOnToggle) {
                    closeMobileNav();
                }
            }
        });
        
        // Handle swipe gestures for mobile nav
        var startX = null;
        var startY = null;
        
        $(document).on('touchstart', function(e) {
            if (window.innerWidth <= 767.98) {
                var touch = e.originalEvent.touches[0];
                startX = touch.clientX;
                startY = touch.clientY;
            }
        });
        
        $(document).on('touchmove', function(e) {
            if (window.innerWidth <= 767.98 && startX !== null) {
                var touch = e.originalEvent.touches[0];
                var currentX = touch.clientX;
                var currentY = touch.clientY;
                var deltaX = currentX - startX;
                var deltaY = currentY - startY;
                
                // Detect horizontal swipe (more horizontal than vertical)
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                    var isMenuOpen = $('#side-nav-container').hasClass('mobile-nav-open');
                    
                    // Swipe right to open (only if starting from left edge)
                    if (deltaX > 0 && !isMenuOpen && startX < 50) {
                        e.preventDefault();
                        openMobileNav();
                        startX = null;
                        startY = null;
                    }
                    // Swipe left to close (only if menu is open)
                    else if (deltaX < -50 && isMenuOpen) {
                        e.preventDefault();
                        closeMobileNav();
                        startX = null;
                        startY = null;
                    }
                }
            }
        });
        
        $(document).on('touchend', function() {
            startX = null;
            startY = null;
        });
        
        // Handle window resize with debounce
        var resizeTimeout;
        $(window).on('resize', function() {
            // Close mobile nav if window becomes desktop size
            if (window.innerWidth > 767.98) {
                closeMobileNav();
            }
            
            // Debounce the refresh to avoid excessive calls
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                refreshCurrentNavigation();
            }, 150);
        });
        
        // Ensure mobile nav is closed on initial load if desktop size
        if (window.innerWidth > 767.98) {
            closeMobileNav();
        }
    }
    
    function toggleMobileNav() {
        var $sidebar = $('#side-nav-container');
        var $overlay = $('.mobile-nav-overlay');
        var $body = $('body');
        
        if ($sidebar.hasClass('mobile-nav-open')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    }
    
    function openMobileNav() {
        var $sidebar = $('#side-nav-container');
        var $overlay = $('.mobile-nav-overlay');
        var $body = $('body');
        
        $sidebar.addClass('mobile-nav-open');
        $overlay.addClass('active');
        $body.addClass('mobile-nav-open');
        
        // Ensure focus accessibility
        $sidebar.attr('aria-hidden', 'false');
        $('.mobile-nav-toggle').attr('aria-expanded', 'true');
    }
    
    function closeMobileNav() {
        var $sidebar = $('#side-nav-container');
        var $overlay = $('.mobile-nav-overlay');
        var $body = $('body');
        
        $sidebar.removeClass('mobile-nav-open');
        $overlay.removeClass('active');
        $body.removeClass('mobile-nav-open');
        
        // Ensure focus accessibility
        $sidebar.attr('aria-hidden', 'true');
        $('.mobile-nav-toggle').attr('aria-expanded', 'false');
    }

    // Initialize dark mode
    initDarkMode();

    // Initialize mobile navigation
    initMobileNavigation();

    // We explicitly do NOT use var, for now, to facilitate inspection in Firebug.
    // (Our route handlers and such currently also rely on tome being global.)
    tome = {};

    initializeRoutes();
});
