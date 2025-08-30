# ToME Tips Codebase Restructure Plan

## Goals
1. **Feature-based organization** - Group related files by website features
2. **Maintainable templates** - Break down monolithic template files
3. **Modular JavaScript** - Separate concerns into focused modules
4. **Improved build system** - Modern tooling with module support
5. **Better preprocessing** - Organize data extraction tools

## Proposed Directory Structure

```
/
├── src/                          # Source code (new)
│   ├── core/                     # Core utilities and shared code
│   │   ├── utils.js             # Shared utility functions
│   │   ├── data.js              # Data loading and management
│   │   ├── navigation.js        # Routing and navigation
│   │   └── search.js            # Search functionality
│   │
│   ├── features/                # Feature-based modules
│   │   ├── classes/             # Character classes feature
│   │   │   ├── classes.js       # Class page logic
│   │   │   ├── templates/       # Class-specific templates
│   │   │   │   ├── class.hbs
│   │   │   │   └── class_nav.hbs
│   │   │   └── partials/        # Class-specific partials
│   │   │       └── class_talents.hbs
│   │   │
│   │   ├── races/               # Character races feature
│   │   │   ├── races.js
│   │   │   ├── templates/
│   │   │   │   ├── race.hbs
│   │   │   │   └── race_nav.hbs
│   │   │   └── partials/
│   │   │
│   │   ├── talents/             # Talents feature
│   │   │   ├── talents.js
│   │   │   ├── templates/
│   │   │   │   ├── talent_by_type.hbs
│   │   │   │   ├── talent_modal.hbs
│   │   │   │   └── talent_by_type_nav.hbs
│   │   │   └── partials/
│   │   │       ├── talent_details.hbs
│   │   │       ├── talent_img.hbs
│   │   │       └── talent_mastery.hbs
│   │   │
│   │   ├── items/               # Items feature
│   │   │   ├── items.js
│   │   │   ├── templates/
│   │   │   │   ├── item_detail.hbs
│   │   │   │   ├── item_list.hbs
│   │   │   │   └── item_nav.hbs
│   │   │   └── partials/
│   │   │       └── item_img.hbs
│   │   │
│   │   └── shared/              # Shared templates and partials
│   │       ├── templates/
│   │       │   ├── search_suggestion.hbs
│   │       │   └── changes_talents.hbs
│   │       └── partials/
│   │           └── dlc_notice.hbs
│   │
│   └── main.js                  # Application entry point (much smaller)
│
├── tools/                       # Preprocessing and build tools (new)
│   ├── extractors/              # Data extraction tools
│   │   ├── base-extractor.lua   # Common extraction logic
│   │   ├── class-extractor.lua  # Class data extraction
│   │   ├── race-extractor.lua   # Race data extraction
│   │   ├── talent-extractor.lua # Talent data extraction
│   │   └── item-extractor.lua   # Item data extraction
│   │
│   ├── build/                   # Build system
│   │   ├── build.js             # Main build orchestrator
│   │   ├── template-compiler.js # Template compilation
│   │   └── module-bundler.js    # JavaScript bundling
│   │
│   └── config/                  # Build configuration
│       ├── paths.js             # Path configurations
│       └── handlebars.config.js # Handlebars settings
│
├── dist/                        # Built output (replaces html/)
│   ├── index.html
│   ├── css/
│   ├── js/
│   │   ├── core.js              # Core bundle
│   │   ├── classes.js           # Classes feature bundle
│   │   ├── races.js             # Races feature bundle
│   │   ├── talents.js           # Talents feature bundle
│   │   ├── items.js             # Items feature bundle
│   │   └── templates/           # Compiled templates (organized)
│   │       ├── classes/
│   │       ├── races/
│   │       ├── talents/
│   │       └── items/
│   ├── data/                    # Generated JSON data
│   └── img/                     # Processed images
│
├── scripts/                     # Build and utility scripts (existing)
├── config.lua                   # Configuration (existing)
└── package.json                 # Node.js dependencies (new)
```

## Implementation Phases

### Phase 1: Template Restructuring
1. **Extract templates by feature** - Move templates to feature directories
2. **Update build system** - Modify Makefile to compile templates separately
3. **Create template registry** - System to load templates dynamically

### Phase 2: JavaScript Modularization  
1. **Extract feature modules** - Break down main.js into focused modules
2. **Create core utilities** - Extract shared functionality
3. **Implement module system** - Use ES6 modules or similar

### Phase 3: Build System Modernization
1. **Add Node.js tooling** - Package.json and modern build tools
2. **Template compilation** - Per-feature template compilation
3. **Module bundling** - Bundle features independently for better caching

### Phase 4: Preprocessing Tools Restructure
1. **Organize extractors** - Move to dedicated tools/ directory
2. **Create base extractor** - Common functionality for all extractors
3. **Improve configuration** - Centralized configuration system

## Benefits

1. **Maintainability**: Clear separation of concerns, easier to find and modify code
2. **Performance**: Feature-based bundling allows better caching and loading
3. **Development Experience**: Smaller files, clear dependencies, easier debugging
4. **Scalability**: Easy to add new features without affecting existing code
5. **Team Collaboration**: Multiple developers can work on different features independently

## Migration Strategy

1. **Incremental migration** - Move one feature at a time
2. **Preserve functionality** - Ensure no breaking changes during migration
3. **Maintain compatibility** - Keep existing URLs and functionality working
4. **Test thoroughly** - Verify each phase works correctly before proceeding

## Next Steps

1. Start with template restructuring as it's the least risky
2. Create the new directory structure
3. Begin extracting classes feature as a proof of concept
4. Update build system to support new structure
5. Gradually migrate remaining features