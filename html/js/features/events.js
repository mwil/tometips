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
     * Initialize analytics tracking
     */
    function initAnalyticsTracking() {
        // Track Google Analytics as we navigate from one subpage / hash link to another.
        // Based on http://stackoverflow.com/a/4813223/25507
        // Really old browsers don't support hashchange. A plugin is available, but I don't really care right now.
        $(window).on('hashchange', function() {
            if (typeof _gaq !== 'undefined') {
                _gaq.push(['_trackPageview', location.pathname + location.search + location.hash]);
            }
            
            // Auto-close mobile navigation on hash change (page navigation)
            if (window.innerWidth <= 767.98 && typeof closeMobileNav === 'function') {
                closeMobileNav();
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
     * Initialize sidebar navigation event handling
     */
    function initSidebarNavigation() {
        // UNIFIED ACCORDION MANAGER - Bootstrap 5 Native Approach
        
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
        
        // Mobile navigation helper functions
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
        
        // Expose functions for backwards compatibility
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
            this.initAnalyticsTracking();
            this.initScrollAutoClose();
            this.initSidebarNavigation();
            this.initThemeEvents();
            this.initMobileNavigation();
        },
        
        // Individual initializers for selective use
        initClickableElements: initClickableElements,
        initImageErrorHandling: initImageErrorHandling,
        initAnalyticsTracking: initAnalyticsTracking,
        initScrollAutoClose: initScrollAutoClose,
        initSidebarNavigation: initSidebarNavigation,
        initThemeEvents: initThemeEvents,
        initMobileNavigation: initMobileNavigation
    };
})();