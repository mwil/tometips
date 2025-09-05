/**
 * Search System Module
 * Manages Bloodhound-based typeahead search functionality
 */

var SEARCH = (function() {
    'use strict';
    
    var categories = [ 'races', 'classes', 'talents-types', 'talents' ];
    var category_header = {
        'races': 'Races',
        'classes': 'Classes',
        'talents-types': 'Talent Categories',
        'talents': 'Talents'
    };

    // Bloodhound search objects indexed by version number with subkeys for each data source
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
                    thumbprint: CONFIG.VERSION
                }
            });

            // TODO: Clear prefetch cache on version change
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
        
        setupSearchHandlers();
    }

    function setupSearchHandlers() {
        var currentHighlighted = null;
        
        // Add clear button functionality (using event delegation)
        $(document).off('click', '.search-clear').on('click', '.search-clear', function() {
            clearSearch();
        });
        
        // Show/hide clear button based on input content (using event delegation)
        $(document).off('input', '.typeahead').on('input', '.typeahead', function() {
            if ($(this).val().length > 0) {
                $('.search-container').addClass('has-content');
            } else {
                $('.search-container').removeClass('has-content');
            }
        });
        
        // Handle typeahead selection
        $('.typeahead').on('typeahead:select', function(e, suggestion) {
            if (suggestion && suggestion.href) {
                navigateToResult(suggestion.href);
            }
        });
        
        $('.typeahead').on('typeahead:autocomplete', function(e, suggestion) {
            if (suggestion && suggestion.href) {
                navigateToResult(suggestion.href);
            }
        });
        
        // Keyboard navigation handling
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
            if (e.which === 13) { // Enter key
                e.preventDefault();
                handleEnterKey(currentHighlighted);
            }
        });
    }

    function handleEnterKey(currentHighlighted) {
        // Try immediate check first
        var $highlighted = $('.tt-suggestion.tt-cursor, .tt-suggestion:hover, .tt-suggestion.tt-is-under-cursor, .tt-suggestion.manual-highlight');
        
        if ($highlighted.length > 0) {
            var $link = $highlighted.find('a');
            if ($link.length > 0) {
                var href = $link.attr('href').substring(1); // Remove the leading #
                navigateToResult(href, true);
                return;
            }
        }
        
        // Fall back to stored href
        if (currentHighlighted) {
            var hash = currentHighlighted.startsWith('#') ? currentHighlighted.substring(1) : currentHighlighted;
            navigateToResult(hash, true);
        }
    }

    function navigateToResult(href, clearAfter) {
        // Add current query parameters if using suggestion object with href
        if (typeof href === 'string' && href.indexOf('?') === -1) {
            window.location.hash = href + currentQuery();
        } else {
            window.location.hash = href;
        }
        
        if (clearAfter) {
            clearSearch();
        }
    }

    function clearSearch() {
        var $input = $('.typeahead');
        $input.typeahead('val', '');
        $input.val('');
        $input.trigger('input');
        $('.search-container').removeClass('has-content');
    }

    function updateTypeahead(version) {
        $('.typeahead').typeahead('destroy');
        initTypeahead(version);
    }

    function enhanceTalentUrl(href, $element) {
        // For now, just return the original href
        // TODO: Implement logic to detect individual talents and construct direct URLs
        return href;
    }

    // Public API
    return {
        /**
         * Initialize search system for given version
         * @param {string} version - Version to initialize search for
         */
        init: function(version) {
            updateSearch(version);
            initTypeahead(version);
        },

        /**
         * Update search system to new version
         * @param {string} version - New version to update to
         */
        update: function(version) {
            updateSearch(version);
            updateTypeahead(version);
        },

        /**
         * Clear current search input and state
         */
        clear: clearSearch,

        /**
         * Navigate to search result
         * @param {string} href - URL to navigate to
         * @param {boolean} clearAfter - Whether to clear search after navigation
         */
        navigate: navigateToResult
    };
})();