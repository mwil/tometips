# CSS Architecture Documentation

## Overview

The ToME Tips CSS has been restructured from a monolithic 2566-line file into a modular architecture that promotes maintainability, reusability, and feature separation.

## Directory Structure

```
css/
├── main-modular.css          # Main entry point with @imports
├── main.css                  # Legacy monolithic file (preserved)
├── core/                     # Core system styles
│   ├── variables.css         # CSS custom properties & theming
│   └── base.css             # Base element styles & resets
├── components/              # Reusable UI components
│   ├── navigation.css       # Sidebar & mobile navigation
│   ├── search.css          # Typeahead search functionality
│   ├── tables.css          # Table styling (to be created)
│   ├── panels.css          # Panel & card components (to be created)
│   └── tooltips.css        # Tooltip styling (to be created)
├── layouts/                 # Layout & responsive styles
│   ├── responsive.css       # Media queries & breakpoints (to be created)
│   └── mobile.css          # Mobile-specific layouts (to be created)
├── pages/                   # Page-specific styles
│   ├── classes.css         # Classes page styling (to be created)
│   ├── talents.css         # Talents page styling (to be created)
│   └── items.css           # Items page styling (to be created)
├── utilities/              # Utility classes
│   ├── helpers.css         # General utility classes
│   └── spacing.css         # Spacing utilities (to be created)
└── vendor/                 # Third-party & print styles
    └── print.css           # Print media queries (to be created)
```

## Module Loading Order

The CSS modules are loaded in a specific order to ensure proper cascade:

1. **Core** - Variables and base styles (foundation)
2. **Components** - Reusable UI elements
3. **Layouts** - Responsive and mobile layouts
4. **Pages** - Page-specific styles
5. **Utilities** - Helper classes and overrides
6. **Vendor** - Third-party and print styles

## Key Features

### 1. CSS Custom Properties (Variables)
- Comprehensive theming system with light/dark mode support
- Consistent spacing, typography, and z-index management
- Easy customization and maintenance

### 2. Component-Based Architecture
- Self-contained CSS modules for specific UI components
- Clear separation of concerns
- Enhanced reusability across pages

### 3. Responsive Design
- Mobile-first approach with progressive enhancement
- Accessibility features (reduced motion, high contrast)
- Touch-friendly interactions

### 4. Modern CSS Features
- CSS Grid and Flexbox for layouts
- CSS custom properties for theming
- CSS animations with respect for user preferences
- Focus management for accessibility

## Implementation Status

### ✅ Completed Modules
- `core/variables.css` - CSS variables and theming system
- `core/base.css` - Base element styles and browser compatibility
- `components/navigation.css` - Complete sidebar and mobile navigation
- `components/search.css` - Typeahead search styling with states
- `utilities/helpers.css` - Comprehensive utility classes
- `main-modular.css` - Import structure and documentation

### 🚧 To Be Created
- Remaining component modules (tables, panels, tooltips)
- Layout modules (responsive, mobile)
- Page-specific modules
- Vendor modules (print styles)

## Migration Strategy

### Phase 1: Parallel Development ✅
- Create modular structure alongside existing main.css
- Maintain backward compatibility
- Test modular approach

### Phase 2: Gradual Migration
- Replace main.css with main-modular.css in HTML
- Extract remaining CSS sections to appropriate modules
- Update build process if needed

### Phase 3: Optimization
- Remove unused CSS rules
- Optimize load performance
- Implement CSS minification per module

## Benefits

### Maintainability
- **Feature Isolation**: Changes to navigation don't affect search styles
- **Clear Structure**: Easy to locate and modify specific functionality
- **Reduced Conflicts**: Modular approach minimizes CSS cascade issues

### Performance
- **Selective Loading**: Load only necessary modules per page
- **Better Caching**: Individual modules can be cached independently
- **Smaller Bundles**: Remove unused styles more easily

### Developer Experience
- **Logical Organization**: Intuitive file structure
- **Easier Debugging**: Isolate issues to specific modules
- **Team Collaboration**: Multiple developers can work on different modules

## Usage Examples

### Adding New Component Styles
```css
/* components/new-component.css */
.new-component {
    background-color: var(--panel-bg);
    border: 1px solid var(--border-color);
    padding: var(--content-padding);
}
```

### Using Utility Classes
```html
<div class="d-flex justify-content-between align-items-center p-3">
    <span class="text-muted">Label</span>
    <button class="clickable">Action</button>
</div>
```

### Custom Theme Variables
```css
:root {
    --custom-accent: #ff6b6b;
    --custom-spacing: 24px;
}
```

## Browser Support

The modular CSS architecture maintains the same browser support as the original:
- Modern browsers with CSS custom properties support
- Graceful degradation for older browsers
- Progressive enhancement approach

## Best Practices

1. **Use CSS Custom Properties** for values that might change or be themed
2. **Follow BEM Methodology** for component class naming
3. **Mobile-First** responsive design approach
4. **Accessibility** considerations in all modules
5. **Performance** optimization through selective loading

This modular architecture provides a solid foundation for maintaining and extending the ToME Tips styling system while ensuring optimal performance and developer experience.