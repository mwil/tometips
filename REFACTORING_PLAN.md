# ToME Tips Refactoring Plan

## Current Problems Analysis

### Critical Issues Identified:

1. **Monolithic main.js (2029 lines)** - Multiple concerns mixed together
2. **Duplicate Code** - Two `opt` Handlebars helpers (lines 425 & 1348)
3. **Event Handler Conflicts** - Complex nested accordion logic causing interference
4. **Mixed Responsibilities** - Routing, UI, data loading, settings all in one file
5. **CSS Duplication** - Duplicate overflow rules, TODO about LESS/Sass duplication
6. **Dead Code** - Leftover debug code, commented-out implementations
7. **Bootstrap Migration Residue** - Mixed Bootstrap 3/5 patterns

### File Size Analysis:
```
main.js:     2029 lines (CRITICAL - needs breaking down)
main.css:    2566 lines (needs modularization)
items.js:     863 lines (manageable)
templates.js: 1489 lines (generated - OK)
classes.js:   425 lines (manageable)
```

## Proposed Architecture

### 1. Modular JavaScript Structure

```
html/js/
├── core/
│   ├── app.js              # Application bootstrap & initialization
│   ├── config.js           # Global configuration & constants
│   ├── utils.js            # Utility functions (toHtmlId, escapeHtml, etc.)
│   └── data-loader.js      # Data loading & caching logic
├── features/
│   ├── routing/
│   │   ├── router.js       # Route configuration & management
│   │   ├── hash-manager.js # Hash parsing & navigation
│   │   └── scroll-manager.js # scrollToId & positioning logic
│   ├── search/
│   │   ├── typeahead.js    # Search functionality
│   │   └── search-handlers.js # Search event handling
│   ├── navigation/
│   │   ├── sidebar.js      # Sidebar collapse logic
│   │   ├── mobile-nav.js   # Mobile navigation
│   │   └── accordion.js    # Nested accordion system
│   ├── ui/
│   │   ├── theme-manager.js # Dark mode & theming
│   │   ├── image-sizing.js # Icon size management
│   │   └── tooltips.js     # Tooltip initialization
│   └── versions/
│       ├── version-manager.js # Version switching
│       └── mastery-manager.js # Mastery switching
├── templates/
│   └── handlebars-helpers.js # All Handlebars helpers
├── pages/
│   ├── talents.js          # Talents-specific logic
│   ├── classes.js          # Classes-specific logic (existing)
│   ├── races.js            # Races-specific logic (existing)
│   └── items.js            # Items-specific logic (existing)
└── main.js                 # Minimal bootstrap file
```

### 2. CSS Modularization

```
html/css/
├── core/
│   ├── variables.css       # CSS custom properties & constants
│   ├── base.css           # Base styles & resets
│   └── layout.css         # Grid & layout utilities
├── components/
│   ├── navigation.css     # Sidebar & navigation styles
│   ├── accordion.css      # Accordion-specific styles
│   ├── cards.css          # Card component styles
│   ├── buttons.css        # Button variants
│   ├── forms.css          # Form & input styles
│   └── tooltips.css       # Tooltip styles
├── features/
│   ├── talents.css        # Talents page specific styles
│   ├── classes.css        # Classes page specific styles
│   ├── races.css          # Races page specific styles
│   ├── items.css          # Items page specific styles
│   └── search.css         # Search/typeahead styles
├── themes/
│   ├── light-theme.css    # Light mode variables
│   └── dark-theme.css     # Dark mode variables
└── main.css               # Imports all modules in correct order
```

### 3. Event Handling Isolation Strategy

#### Pattern: Feature-Based Event Namespaces
```javascript
// Each feature registers its own events with namespaces
// navigation/accordion.js
$(document).on('click.accordion', '.accordion-trigger', handler);

// features/search/typeahead.js  
$(document).on('keydown.search', '.typeahead', handler);

// features/ui/image-sizing.js
$(document).on('click.imagesize', '.option-img-size', handler);
```

#### Pattern: Event Bus System
```javascript
// core/event-bus.js
var EventBus = {
    events: {},
    
    on: function(event, callback) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    },
    
    emit: function(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(cb => cb(data));
        }
    },
    
    off: function(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
};
```

## Implementation Phases

### Phase 1: Critical Fixes & Deduplication
1. **Remove duplicate `opt` helper** - consolidate into single implementation
2. **Extract Handlebars helpers** into separate file
3. **Clean up dead code** - remove commented code, debug logs, unused functions
4. **Fix Bootstrap 3/5 migration issues** - standardize on Bootstrap 5 patterns

### Phase 2: Core Infrastructure 
1. **Create core modules** (app.js, config.js, utils.js, data-loader.js)
2. **Extract utility functions** from main.js
3. **Create event bus system** for inter-module communication
4. **Setup module loading pattern** with dependency management

### Phase 3: Feature Extraction
1. **Extract routing system** (router.js, hash-manager.js, scroll-manager.js)
2. **Extract UI features** (theme-manager.js, image-sizing.js, tooltips.js)
3. **Extract navigation logic** (sidebar.js, mobile-nav.js, accordion.js)
4. **Extract search functionality** (typeahead.js, search-handlers.js)

### Phase 4: CSS Modularization
1. **Extract CSS variables** - convert hardcoded values to custom properties
2. **Break down main.css** into component-based modules
3. **Remove duplicate styles** - consolidate repeated patterns
4. **Create CSS build system** - proper import order & optimization

### Phase 5: Testing & Optimization
1. **Test each module independently** 
2. **Test feature interactions**
3. **Performance optimization** - lazy loading, bundle splitting
4. **Documentation update** - module documentation

## Detailed Breakdown

### Core Problems to Solve:

#### 1. Duplicate Handlebars Helper Issue
**Current Problem**: Two `opt` helpers with different logic
```javascript
// Line 425 - Simple version
Handlebars.registerHelper('opt', function(opt_name) {
    return options[opt_name];
});

// Line 1348 - Complex version with page-specific logic  
Handlebars.registerHelper('opt', function(option) {
    if (option === 'imgSize') {
        // Complex page-specific logic...
    }
    return '';
});
```

**Solution**: Single, well-designed helper with proper delegation
```javascript
// templates/handlebars-helpers.js
Handlebars.registerHelper('opt', function(option) {
    return SettingsManager.get(option);
});

// features/ui/settings-manager.js
var SettingsManager = {
    get: function(option) {
        switch(option) {
            case 'imgSize':
                return ImageSizing.getCurrentSize();
            default:
                return this.globalOptions[option] || '';
        }
    }
};
```

#### 2. Event Handler Conflicts
**Current Problem**: Multiple event handlers interfering with each other
```javascript
// Multiple conflicting handlers in main.js
$(document).on("click", "#nav-items > li > a", handler1);
$(document).on("click", "#nav-items .collapse a", handler2);
$("#side-nav").on("click", ".dropdown", handler3);
```

**Solution**: Namespaced, feature-specific event handling
```javascript
// navigation/accordion.js
var AccordionManager = {
    init: function() {
        $(document).on('click.accordion', this.selector, this.handleClick.bind(this));
    },
    
    destroy: function() {
        $(document).off('.accordion');
    },
    
    handleClick: function(e) {
        // Isolated logic with proper event prevention
    }
};
```

#### 3. Monolithic Function Concentration
**Current Problem**: Single file contains everything
- 30+ functions in main.js
- Mixed concerns (routing, UI, data, events)
- Global variable pollution
- Hard to test individual features

**Solution**: Feature-based modules with clear APIs
```javascript
// Each module exports a clean interface
var TalentsPage = {
    init: function() { /* Initialize talents-specific logic */ },
    destroy: function() { /* Cleanup */ },
    onSizeChange: function(size) { /* Handle size changes */ },
    getCurrentCategory: function() { /* Get current category */ }
};
```

### Module Dependency Graph:
```
core/app.js
├── core/config.js
├── core/utils.js  
├── core/data-loader.js
├── features/routing/router.js
│   ├── features/routing/hash-manager.js
│   └── features/routing/scroll-manager.js
├── features/navigation/sidebar.js
│   ├── features/navigation/accordion.js
│   └── features/navigation/mobile-nav.js
├── features/ui/theme-manager.js
├── features/ui/image-sizing.js
├── features/search/typeahead.js
├── templates/handlebars-helpers.js
└── pages/[talents|classes|races|items].js
```

### CSS Architecture:
```
main.css (import orchestrator)
├── core/variables.css (CSS custom properties)
├── core/base.css (base styles)
├── core/layout.css (grid & layout)
├── components/*.css (reusable components)
├── features/*.css (page-specific styles)
└── themes/*.css (theme variables)
```

## Risk Mitigation Strategy

### 1. Gradual Migration Approach
- **Phase-by-phase implementation** - test each phase before moving to next
- **Feature flags** - ability to switch between old/new implementations
- **Backward compatibility** - maintain existing APIs during transition
- **Git branching strategy** - separate branches for each major phase

### 2. Testing Strategy
- **Module unit tests** - test each module in isolation
- **Integration tests** - test module interactions
- **Regression tests** - ensure existing functionality works
- **Cross-page testing** - verify navigation between pages works

### 3. Rollback Plan
- **Git commit points** at each phase completion
- **Feature toggle system** to disable new modules if needed
- **Monitoring** for JavaScript errors in production
- **Quick rollback procedure** documented

## Benefits of This Architecture

### 1. Maintainability
- **Single responsibility** - each module has one clear purpose
- **Easy to debug** - problems isolated to specific modules  
- **Clear dependencies** - explicit module relationships
- **Testable** - modules can be tested independently

### 2. Performance
- **Lazy loading** - load modules only when needed
- **Smaller bundles** - reduce main.js size significantly
- **Better caching** - modules can be cached independently
- **Reduced conflicts** - isolated event handling

### 3. Developer Experience
- **Easy to understand** - clear file organization
- **Easy to modify** - changes isolated to relevant modules
- **Easy to extend** - new features don't affect existing code
- **Easy to debug** - clear separation of concerns

### 4. Future-Proofing
- **Modern JavaScript patterns** - ES6 modules ready
- **Build system ready** - prepared for webpack/rollup
- **TypeScript ready** - clear module boundaries for typing
- **Framework migration ready** - loosely coupled architecture

## Next Steps

1. **Start with Phase 1** - Fix critical duplicates and clean dead code
2. **Create core infrastructure** - app.js, config.js, utils.js
3. **Extract one feature at a time** - start with image sizing (smallest)
4. **Test thoroughly** after each extraction
5. **Continue systematically** through all features

This refactoring will transform the codebase from a monolithic, hard-to-maintain structure into a modern, modular architecture that prevents the types of conflicts and duplication issues we've been experiencing.