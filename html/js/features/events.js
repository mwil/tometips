/**
 * Events Module
 * Centralized event handling and delegation
 */

var EVENTS = (function() {
    'use strict';
    
    // =======================
    // GENERAL EVENT HANDLERS
    // =======================
    
    /**
     * Initialize clickable element delegation
     */
    function initClickableElements() {
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
    }
    
    /**
     * Initialize image error handling
     */
    function initImageErrorHandling() {
        $("html").on("error", "img", function() {
            $(this).hide();
        });
    }
    
    /**
     * Initialize hashchange handling
     */
    function initHashChangeHandling() {
        $(window).on('hashchange', function() {
            // Auto-close mobile navigation on hash change ONLY for deep navigation
            // Keep menu open for top-level section changes (races, classes, talents, items)
            if (window.innerWidth <= 767.98 && typeof closeMobileNav === 'function') {
                var hash = window.location.hash;
                var shouldCloseMenu = false;
                
                // Only close menu for deep navigation (more than 1 level deep)
                if (hash) {
                    var hashParts = hash.substring(1).split('/'); // Remove # and split by /
                    
                    // Don't close for top-level navigation to main sections
                    var topLevelSections = ['races', 'classes', 'talents', 'items'];
                    var isTopLevelNavigation = hashParts.length === 1 && 
                                             topLevelSections.includes(hashParts[0]);
                    
                    if (!isTopLevelNavigation) {
                        // Close menu for deep navigation:
                        // - races/human/shalore (3+ parts)
                        // - classes/warrior/berserker (3+ parts) 
                        // - talents/spell/divination (3+ parts)
                        // - Any navigation with query parameters (?version=1.7.6)
                        if (hashParts.length >= 3 || hash.includes('?')) {
                            shouldCloseMenu = true;
                        }
                        
                        // Also close for specific single-level pages that represent final destinations
                        else if (hashParts.length === 1) {
                            var singlePages = ['changes', 'recent-changes'];
                            if (singlePages.includes(hashParts[0])) {
                                shouldCloseMenu = true;
                            }
                        }
                        
                        // Close for 2-level navigation (e.g., races/human, classes/warrior)
                        else if (hashParts.length === 2) {
                            shouldCloseMenu = true;
                        }
                    }
                }
                
                if (shouldCloseMenu) {
                    closeMobileNav();
                }
            }
            
            // Don't scroll here - let the route handlers call scrollToId after content loads
        });
    }
    
    /**
     * Initialize scroll-based mobile navigation auto-close
     */
    function initScrollAutoClose() {
        var scrollTimeout;
        var lastScrollTop = 0;
        
        $(window).on('scroll', function() {
            // Only apply on mobile devices
            if (window.innerWidth > 767.98) {
                return;
            }
            
            var currentScrollTop = $(this).scrollTop();
            
            // Check if user has scrolled significantly (more than 50px)
            if (Math.abs(currentScrollTop - lastScrollTop) > 50) {
                // Debounce scroll events to avoid excessive calls
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                    // Only close if mobile nav is open
                    if ($('#side-nav-container').hasClass('mobile-nav-open') && typeof closeMobileNav === 'function') {
                        closeMobileNav();
                    }
                }, 100); // 100ms debounce
                
                lastScrollTop = currentScrollTop;
            }
        });
    }
    
    // =======================
    // SIDEBAR NAVIGATION EVENTS
    // =======================
    
    /**
     * Initialize main navigation (header) event handling
     */
    function initMainNavigation() {
        // Handle clicks on main navigation links (.nav-link in header)
        $(document).on('click', '.nav-link[data-base-href]', function(e) {
            e.preventDefault();
            var $link = $(this);
            var href = $link.attr('data-base-href');
            
            if (href) {
                // Navigate to the target hash
                if (typeof hasher !== 'undefined') {
                    hasher.setHash(href.substring(1));
                } else {
                    window.location.hash = href;
                }
            }
        });
    }
    
    /**
     * Initialize sidebar navigation event handling
     */
    function initSidebarNavigation() {
        // UNIFIED ACCORDION MANAGER - Bootstrap 5 Native Approach
        
        // Mobile-specific: Handle sidebar navigation clicks for mobile menu behavior
        $(document).on('click', '#side-nav a', function(e) {
            // Only apply mobile behavior on mobile screens
            if (window.innerWidth <= 767.98) {
                var $link = $(this);
                var href = $link.attr('href');
                
                // EXCLUDE mobile main nav buttons - they have their own handler
                if ($link.closest('.mobile-main-nav').length > 0) {
                    return; // Let the dedicated mobile main nav handler manage this
                }
                
                // Check if this is a leaf navigation item (actual destination link)
                // vs. an accordion toggle or section header
                var isAccordionToggle = $link.hasClass('accordion-button') || 
                                       $link.attr('data-bs-toggle') === 'collapse' ||
                                       $link.attr('data-toggle') === 'collapse';
                
                // Check if this is a navigation link with href that goes to actual content
                var isDestinationLink = href && href.startsWith('#') && 
                                       !isAccordionToggle &&
                                       !href.includes('nav-'); // nav-* are accordion panels
                
                // Close mobile menu ONLY for actual destination links (lowest level)
                if (isDestinationLink && typeof closeMobileNav === 'function') {
                    // Small delay to let the navigation complete first
                    setTimeout(closeMobileNav, 100);
                }
            }
        });
        
        // Only handle leaf navigation items (actual links that navigate)
        // Bootstrap 5 handles all accordion expand/collapse behavior automatically
        $(document).on('click', '.list-group-item-action, .btn-link', function(e) {
            // These are leaf items - allow normal navigation
            return true;
        });
        
        // Handle special navigation buttons (New in Version, etc.)
        $(document).on('click', '.navigation-container .btn', function(e) {
            // These are special navigation items - allow normal navigation
            return true;
        });
        
        // Bootstrap 5 automatically handles:
        // - Accordion expand/collapse via data-bs-toggle and data-bs-parent
        // - ARIA attributes (aria-expanded, aria-controls, etc.)
        // - Keyboard navigation
        // - Focus management
        
        // Custom behavior: Ensure only one main navigation section is open at a time
        // This provides the "accordion" behavior across different navigation types
        $(document).on('shown.bs.collapse', '.navigation-accordion > .accordion-item > .accordion-collapse', function(e) {
            // When a main navigation section opens, close others from different navigation types
            var $currentCollapse = $(this);
            var $currentNavigation = $currentCollapse.closest('.navigation-accordion');
            var currentNavId = $currentNavigation.attr('id');
            
            // Close other main navigation sections (but not nested ones within the same navigation)
            $('.navigation-accordion').not($currentNavigation).find('> .accordion-item > .accordion-collapse.show').each(function() {
                $(this).collapse('hide');
            });
        });
    }
    
    // =======================
    // THEME MANAGEMENT EVENTS
    // =======================
    
    /**
     * Initialize theme toggle events
     */
    function initThemeEvents() {
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
    
    // =======================
    // MOBILE NAVIGATION EVENTS
    // =======================
    
    /**
     * Initialize mobile navigation events
     */
    function initMobileNavigation() {
        var startX = null;
        var startY = null;
        
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
            e.stopPropagation(); // Prevent event bubbling to other handlers
            
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
        
        // Touch events for swipe gestures
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
        
        // Window resize handler for mobile nav
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
        
        // Mobile navigation helper functions - these will be overridden by UI_MANAGEMENT
        // but provide fallback implementations
        function toggleMobileNav() {
            var $sidebar = $('#side-nav-container');
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
            
            // Remove inert and aria-hidden when opening to allow focus
            $sidebar[0].inert = false;
            $sidebar.removeAttr('aria-hidden');
            $('.mobile-nav-toggle').attr('aria-expanded', 'true');
        }
        
        function closeMobileNav() {
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
        
        function refreshCurrentNavigation() {
            var currentHash = window.location.hash;
            var $sideNav = $("#side-nav");
            var currentContent = $sideNav.html();
            
            // Only refresh if there's existing content
            if (currentContent && typeof UI_MANAGEMENT !== 'undefined') {
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
                $sideNav.html(UI_MANAGEMENT.createMobileNavigation(contentNav));
            }
        }
        
        // Expose functions globally (these may be overridden by UI_MANAGEMENT)
        window.toggleMobileNav = toggleMobileNav;
        window.openMobileNav = openMobileNav;
        window.closeMobileNav = closeMobileNav;
    }
    
    // =======================
    // PUBLIC API
    // =======================
    
    return {
        /**
         * Initialize all event handling systems
         */
        init: function() {
            this.initClickableElements();
            this.initImageErrorHandling();
            this.initHashChangeHandling();
            this.initScrollAutoClose();
            this.initMainNavigation();
            this.initSidebarNavigation();
            this.initThemeEvents();
            this.initMobileNavigation();
        },
        
        // Individual initializers for selective use
        initClickableElements: initClickableElements,
        initImageErrorHandling: initImageErrorHandling,
        initHashChangeHandling: initHashChangeHandling,
        initScrollAutoClose: initScrollAutoClose,
        initMainNavigation: initMainNavigation,
        initSidebarNavigation: initSidebarNavigation,
        initThemeEvents: initThemeEvents,
        initMobileNavigation: initMobileNavigation
    };
})();