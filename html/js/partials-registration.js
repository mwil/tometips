// Persistent Handlebars partial registrations
// This file ensures all templates are available as partials for cross-access
// It's loaded after both partials.js and templates.js
//
// IMPORTANT: This file solves the recurring issue where partial registrations
// get removed during Handlebars template compilation. By maintaining registrations
// in this separate, persistent file, we avoid having to manually re-add them
// after running: handlebars js/partials/ -f js/partials.js

(function() {
    // Wait for templates and partials to be loaded
    if (typeof Handlebars === 'undefined' || typeof Handlebars.templates === 'undefined') {
        setTimeout(arguments.callee, 100);
        return;
    }

    // Register all compiled templates as partials
    var templates = Handlebars.templates || {};
    
    // Class-related partials
    if (templates.class_talents) {
        Handlebars.partials.class_talents = templates.class_talents;
    }
    if (templates.class_talents_detail) {
        Handlebars.partials.class_talents_detail = templates.class_talents_detail;
    }
    
    // DLC and content partials
    if (templates.dlc_notice) {
        Handlebars.partials.dlc_notice = templates.dlc_notice;
    }
    
    // Talent-related partials
    if (templates.talent_classes) {
        Handlebars.partials.talent_classes = templates.talent_classes;
    }
    if (templates.talent_details) {
        Handlebars.partials.talent_details = templates.talent_details;
    }
    if (templates.talent_img) {
        Handlebars.partials.talent_img = templates.talent_img;
    }
    if (templates.talent_img_small) {
        Handlebars.partials.talent_img_small = templates.talent_img_small;
    }
    if (templates.talent_mastery) {
        Handlebars.partials.talent_mastery = templates.talent_mastery;
    }
    
    // Other modal/UI partials
    if (templates.talent_modal) {
        Handlebars.partials.talent_modal = templates.talent_modal;
    }
    
})();