/**
 * UI Management Module
 * Handles layout, theming, collapsibles, image sizing, and responsive behavior
 */

var UI_MANAGEMENT = (function() {
    'use strict';
    
    // =======================
    // LAYOUT MANAGEMENT
    // =======================
    
    var LayoutManager = {
        /**
         * Adjust content margin and width based on actual sidebar width
         */
        adjustSidebarLayout: function() {
            var self = this;
            
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
        },
        
        /**
         * Create mobile navigation HTML
         */
        createMobileNavigation: function(contentNav) {
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
    };
    
    // =======================
    // COLLAPSIBLE MANAGEMENT
    // =======================
    
    var CollapsibleManager = {
        // List of collapsible IDs which are currently expanded
        prevExpanded: null,
        
        /**
         * Enable expand/collapse all functionality
         */
        enableExpandCollapseAll: function() {
            $(".expand-all").addClass('fa fa-caret-down')
                .attr('title', 'Expand All');
            $(".collapse-all").addClass('fa fa-caret-up')
                .attr('title', 'Collapse All');
            $(".expand-all, .collapse-all").addClass('clickable')
                .click(function() {
                    $($(this).attr('data-target')).find('.collapse').collapse($(this).hasClass('expand-all') ? 'show' : 'hide');
                });
        },
        
        /**
         * Bootstrap 5 native accordion management
         * No manual enforcement needed - Bootstrap handles accordion behavior automatically
         * via data-bs-parent attributes in templates
         */
        
        /**
         * Show a collapsible panel
         */
        showCollapsed: function(html_id, disable_transitions) {
            if (html_id[0] != '#') {
                html_id = '#' + html_id;
            }

            // Hack: If requested, temporarily disable transitions. Bootstrap's default
            // transition is 0.35s, so we do just a bit longer.
            if (disable_transitions) {
                $(html_id).addClass('disable-transition');
                setTimeout(function() { $(html_id).removeClass('disable-transition'); }, 400);
            }

            $(html_id).collapse('show');
            // Hack: Update "collapsed" class, since Bootstrap doesn't seem to do it
            // for us (unless, presumably, we use data-parent for full-blown accordion
            // behavior, and I don't really want to do that).
            $("[data-target='" + html_id + "']").removeClass('collapsed');
        },
        
        /**
         * Legacy support: Redirect to Bootstrap 5 native collapse
         * Bootstrap 5 handles accordion behavior automatically via data-bs-parent
         */
        showCollapsedWithAccordion: function(html_id, disable_transitions) {
            // Simply use standard collapse - Bootstrap 5 handles the accordion behavior
            this.showCollapsed(html_id, disable_transitions);
        },
        
        /**
         * Gets the HTML IDs of currently expanded collapsed items.
         * Only captures sidebar nav items, not talent panels.
         */
        getExpandedIds: function() {
            return $.map($(".collapse.show"), function(n, i) {
                // Only capture navigation items (nav-*) and not talent panels (collapse-*)
                // This prevents talent panels from being auto-restored when clicking tree names
                if (n.id && n.id.startsWith('nav-')) {
                    return n.id;
                }
                return null;
            }).filter(function(id) { return id !== null; });
        },
        
        /**
         * Expand specific panels by ID list
         */
        expandIds: function(id_list, disable_transitions) {
            for (var i = 0; i < id_list.length; i++) {
                this.showCollapsed(id_list[i], disable_transitions);
            }
        },
        
        /**
         * Restore expanded state after updates
         */
        updateFinished: function() {
            if (this.prevExpanded) {
                // Only restore the first nav item to maintain accordion behavior
                var navItems = this.prevExpanded.filter(function(id) { return id.startsWith('nav-'); });
                
                if (navItems.length > 0) {
                    this.showCollapsedWithAccordion('#' + navItems[0], true);
                }
                
                // DO NOT restore talent panel expanded state - let them start collapsed
                // This prevents clicking tree names from expanding all talent panels
                
                this.prevExpanded = null;
            }
        }
    };
    
    // =======================
    // IMAGE SIZE MANAGEMENT
    // =======================
    
    var ImageSizeManager = {
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
                case 32: marginBottom = '15px'; break;
                case 48: marginBottom = '25px'; break;
                case 64: marginBottom = '35px'; break;
                default: marginBottom = '15px';
            }
            
            // Apply spacing to both old list items and new table rows
            var $listItems = $('.col-md-4 > ul > li, .class-detail-container .col-md-4 > ul > li'); // Legacy list support
            var $treeTableRows = $('.talent-tree-row'); // New outer table rows for talent trees
            var $iconTableRows = $('.talent-row'); // Inner table rows for individual talent icons
            
            // Compact spacing values for different icon sizes
            var compactMargin;
            switch(size) {
                case 32: compactMargin = '8px'; break;
                case 48: compactMargin = '12px'; break;
                case 64: compactMargin = '16px'; break;
                default: compactMargin = '8px';
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
        },
        
        handleTalentsPageSizeChange: function(menuSize) {
            // For talents page, we need to re-render the content to pick up new icon sizes
            // since the images are rendered from Handlebars templates using {{opt "imgSize"}}
            
            var currentHash = window.location.hash || '';
            var hashParts = currentHash.substring(1).split('/');
            
            // Check if we're on a specific talents category page
            if (hashParts.length >= 2 && hashParts[0] === 'talents') {
                var category = hashParts[1];
                
                // Re-render the talents content with new icon size
                var talentData = DATA_LOADER.getData().talents && DATA_LOADER.getData().talents[category];
                if (talentData) {
                    $("#content").html(listTalents(tome, category));
                    if (typeof enableTalentTooltips === 'function') {
                        enableTalentTooltips();
                    }
                    if (typeof fillTalentAvailability === 'function') {
                        fillTalentAvailability(tome, category);
                    }
                    UTILS.scrollToId(); // Maintain scroll position if user was viewing a specific talent
                }
            }
        },
        
        handleItemsPageSizeChange: function(menuSize) {
            // Map menu size to actual size for items page
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
        },
        
        configure: function() {
            var self = this;
            
            // Load saved setting
            this.size = this.get();
            this.updateActiveMenuItem(this.size);
            this.applyIconSizeClasses(this.size);
            
            // Handle dropdown clicks
            $(document).on('click', '.option-img-size', function(e) {
                e.preventDefault();
                var newSize = parseInt($(this).data('img-size'));
                self.set(newSize);
                
                // Apply new size classes for proper spacing
                self.applyIconSizeClasses(newSize);
                
                // Check if we're on talents, items, or classes page
                var currentHash = window.location.hash || '';
                var isTalentsPage = currentHash.includes('#talents');
                var isItemsPage = currentHash.includes('#items');
                
                if (isTalentsPage) {
                    // For talents page, re-render images with size mapping
                    self.handleTalentsPageSizeChange(newSize);
                } else if (isItemsPage) {
                    // For items page, update images with size mapping
                    self.handleItemsPageSizeChange(newSize);
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
    };
    
    // =======================
    // THEME MANAGEMENT
    // =======================
    
    var ThemeManager = {
        init: function() {
            // Check for saved theme preference or default to light mode
            const savedTheme = localStorage.getItem('theme');
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
            
            // Apply initial theme
            document.documentElement.setAttribute('data-theme', initialTheme);
            this.updateThemeToggleText(initialTheme);
            
            var self = this;
            
            // Theme toggle click handler
            $('#theme-toggle').on('click', function(e) {
                e.preventDefault();
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                self.updateThemeToggleText(newTheme);
            });
        },
        
        updateThemeToggleText: function(theme) {
            const $toggle = $('#theme-toggle');
            if (theme === 'dark') {
                $toggle.text('☀️ Light mode');
            } else {
                $toggle.text('🌙 Dark mode');
            }
        }
    };
    
    // =======================
    // TOOLTIP & LINK ENHANCEMENT
    // =======================
    
    var EnhancementManager = {
        /**
         * Enable talent tooltips
         */
        enableTalentTooltips: function() {
            $(".html-tooltip").tooltip({ html: true });
            $(".variable, .talent-variable, .stat-variable")
                .attr('data-toggle', 'tooltip')
                .tooltip({ html: true });
        },
        
        /**
         * Marks up inline links to the ToME wiki
         */
        markupHintLinks: function() {
            $('.hint-link[target!=_blank]').append(' <span class="fa fa-external-link-alt"></span>')
                .attr('target', '_blank');
        }
    };
    
    // =======================
    // MOBILE NAVIGATION
    // =======================
    
    var MobileNavManager = {
        init: function() {
            var self = this;
            
            // Mobile nav toggle
            $('.mobile-nav-toggle').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.toggle();
            });
            
            // Close mobile nav when clicking overlay
            $('.mobile-nav-overlay').on('click', function() {
                self.close();
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
                        self.close();
                    }
                }
            });
            
            this.initSwipeGestures();
            this.initResizeHandler();
            
            // Ensure mobile nav is closed on initial load if desktop size
            if (window.innerWidth > 767.98) {
                this.close();
            }
        },
        
        initSwipeGestures: function() {
            var self = this;
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
                            self.open();
                            startX = null;
                            startY = null;
                        }
                        // Swipe left to close (only if menu is open)
                        else if (deltaX < -50 && isMenuOpen) {
                            e.preventDefault();
                            self.close();
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
        },
        
        initResizeHandler: function() {
            var self = this;
            var resizeTimeout;
            
            $(window).on('resize', function() {
                // Close mobile nav if window becomes desktop size
                if (window.innerWidth > 767.98) {
                    self.close();
                }
                
                // Debounce the refresh to avoid excessive calls
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function() {
                    self.refreshCurrentNavigation();
                }, 150);
            });
        },
        
        refreshCurrentNavigation: function() {
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
                $sideNav.html(LayoutManager.createMobileNavigation(contentNav));
            }
        },
        
        toggle: function() {
            var $sidebar = $('#side-nav-container');
            if ($sidebar.hasClass('mobile-nav-open')) {
                this.close();
            } else {
                this.open();
            }
        },
        
        open: function() {
            var $sidebar = $('#side-nav-container');
            var $overlay = $('.mobile-nav-overlay');
            var $body = $('body');
            
            $sidebar.addClass('mobile-nav-open');
            $overlay.addClass('active');
            $body.addClass('mobile-nav-open');
            
            // Remove inert and aria-hidden when opening to allow focus
            $sidebar[0].inert = false;
            $sidebar.removeAttr('aria-hidden');
            $('.mobile-nav-toggle').attr('aria-expanded', 'true');
        },
        
        close: function() {
            var $sidebar = $('#side-nav-container');
            var $overlay = $('.mobile-nav-overlay');
            var $body = $('body');
            
            $sidebar.removeClass('mobile-nav-open');
            $overlay.removeClass('active');
            $body.removeClass('mobile-nav-open');
            
            // Use inert instead of aria-hidden to prevent focus accessibility issues
            // Only set inert on mobile devices when the nav is actually hidden
            if (window.innerWidth <= 767.98) {
                $sidebar[0].inert = true;
                $sidebar.removeAttr('aria-hidden'); // Remove aria-hidden to prevent conflicts
            }
            $('.mobile-nav-toggle').attr('aria-expanded', 'false');
        }
    };
    
    // =======================
    // PUBLIC API
    // =======================
    
    return {
        // Layout Management
        adjustSidebarLayout: function() { return LayoutManager.adjustSidebarLayout(); },
        createMobileNavigation: function(contentNav) { return LayoutManager.createMobileNavigation(contentNav); },
        
        // Collapsible Management
        enableExpandCollapseAll: function() { return CollapsibleManager.enableExpandCollapseAll(); },
        showCollapsed: function(html_id, disable_transitions) { return CollapsibleManager.showCollapsed(html_id, disable_transitions); },
        showCollapsedWithAccordion: function(html_id, disable_transitions) { return CollapsibleManager.showCollapsedWithAccordion(html_id, disable_transitions); },
        getExpandedIds: function() { return CollapsibleManager.getExpandedIds(); },
        expandIds: function(id_list, disable_transitions) { return CollapsibleManager.expandIds(id_list, disable_transitions); },
        updateFinished: function() { return CollapsibleManager.updateFinished(); },
        
        // Image Size Management
        imageSize: ImageSizeManager,
        configureImgSize: function() { return ImageSizeManager.configure(); },
        
        // Theme Management
        initDarkMode: function() { return ThemeManager.init(); },
        
        // Enhancement
        enableTalentTooltips: function() { return EnhancementManager.enableTalentTooltips(); },
        markupHintLinks: function() { return EnhancementManager.markupHintLinks(); },
        
        // Mobile Navigation
        initMobileNavigation: function() { return MobileNavManager.init(); },
        
        /**
         * Initialize all UI management systems
         */
        init: function() {
            this.adjustSidebarLayout();
            this.enableExpandCollapseAll();
            this.configureImgSize();
            this.initDarkMode();
            this.initMobileNavigation();
        }
    };
})();