/**
 * Core Data Management Module
 * Handles loading and managing ToME game data
 */

(function(window) {
    'use strict';

    // Ensure namespace exists
    window.ToMECore = window.ToMECore || {};

    /**
     * Data management functions
     */
    const DataManager = {
        // Current data cache
        _currentData: null,

        /**
         * Get current tome data
         * @returns {Object} Current tome data
         */
        getData() {
            if (!this._currentData && window.tome && window.versions && window.masteries) {
                this._currentData = window.tome[window.versions.current + '-' + window.masteries.current];
            }
            return this._currentData || {};
        },

        /**
         * Invalidate data cache (force reload on next getData call)
         */
        invalidateCache() {
            this._currentData = null;
        },

        /**
         * Check if data is available for current version/mastery combination
         * @returns {boolean} True if data is available
         */
        hasData() {
            const data = this.getData();
            return data && Object.keys(data).length > 0;
        },

        /**
         * Get specific data section
         * @param {string} section - Section name (e.g., 'classes', 'races', 'talents')
         * @returns {Object} Section data or empty object
         */
        getSection(section) {
            const data = this.getData();
            return data[section] || {};
        },

        /**
         * Initialize fixups object if it doesn't exist
         */
        initFixups() {
            const data = this.getData();
            if (!data.fixups) {
                data.fixups = {};
            }
        },

        /**
         * Check if a specific fixup has been applied
         * @param {string} fixupName - Name of the fixup
         * @returns {boolean} True if fixup has been applied
         */
        isFixupApplied(fixupName) {
            const data = this.getData();
            return !!(data.fixups && data.fixups[fixupName]);
        },

        /**
         * Mark a fixup as applied
         * @param {string} fixupName - Name of the fixup
         */
        markFixupApplied(fixupName) {
            this.initFixups();
            this.getData().fixups[fixupName] = true;
        },

        /**
         * Load data for a specific version and mastery
         * @param {string} version - Version string
         * @param {string} mastery - Mastery string  
         * @returns {Promise<Object>} Loaded data
         */
        async loadData(version, mastery) {
            return new Promise((resolve, reject) => {
                const key = version + '-' + mastery;
                
                if (window.tome && window.tome[key]) {
                    this._currentData = window.tome[key];
                    resolve(this._currentData);
                } else {
                    // Data not found
                    reject(new Error(`Data not found for ${key}`));
                }
            });
        },

        /**
         * Get available versions
         * @returns {Array} Array of available version strings
         */
        getAvailableVersions() {
            if (!window.versions || !window.versions.list) {
                return [];
            }
            return window.versions.list;
        },

        /**
         * Get available masteries
         * @returns {Array} Array of available mastery strings
         */
        getAvailableMasteries() {
            if (!window.masteries || !window.masteries.list) {
                return [];
            }
            return window.masteries.list;
        },

        /**
         * Get current version
         * @returns {string} Current version string
         */
        getCurrentVersion() {
            return window.versions ? window.versions.current : null;
        },

        /**
         * Get current mastery
         * @returns {string} Current mastery string
         */
        getCurrentMastery() {
            return window.masteries ? window.masteries.current : null;
        },

        /**
         * Update page content and navigation
         * @param {Object} options - Page update options
         * @param {string} options.title - Page title
         * @param {string} options.nav - Navigation HTML
         * @param {string} options.content - Main content HTML
         */
        updatePage(options = {}) {
            // Update page title
            if (options.title) {
                document.title = 'ToME Tips - ' + options.title;
                
                // Update header title if it exists
                const $headerTitle = $('.page-header h1');
                if ($headerTitle.length) {
                    $headerTitle.text(options.title);
                }
            }

            // Update navigation
            if (options.nav) {
                const $nav = $('#nav');
                if ($nav.length) {
                    $nav.html(options.nav);
                }
            }

            // Update main content
            if (options.content) {
                const $content = $('#content');
                if ($content.length) {
                    $content.html(options.content);
                } else {
                    // Fallback to body if no content div
                    $('body').html(options.content);
                }
            }

            // Trigger page update event for other modules
            $(document).trigger('page:updated', options);
        },

        /**
         * Show not found page
         * @param {string} message - Error message to display
         */
        showNotFound(message = 'Page not found') {
            this.updatePage({
                title: '404 - Not Found',
                nav: '',
                content: `
                    <div class="alert alert-danger">
                        <h3>404 - Not Found</h3>
                        <p>${window.ToMECore.escapeHtml(message)}</p>
                        <p><a href="#" onclick="window.history.back()">Go back</a> or <a href="#">return to home</a>.</p>
                    </div>
                `
            });
        },

        /**
         * Show error page
         * @param {string|Error} error - Error message or error object
         */
        showError(error) {
            const message = error instanceof Error ? error.message : error;
            this.updatePage({
                title: 'Error',
                nav: '',
                content: `
                    <div class="alert alert-danger">
                        <h3>Error</h3>
                        <p>${window.ToMECore.escapeHtml(message)}</p>
                        <p><a href="#" onclick="window.history.back()">Go back</a> or <a href="#">return to home</a>.</p>
                    </div>
                `
            });
        }
    };

    // Export to ToMECore namespace
    Object.assign(window.ToMECore, DataManager);

    console.log('Core data manager loaded');

})(window);