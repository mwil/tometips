# Handlebars Naming and Conflict Prevention Strategy

## Problem Addressed
Previous naming conflicts between `templates.js` and `partials-registration.js` caused hard-to-debug issues where:
- Both files defined templates with the same names
- Script loading order determined which version "won"
- The `partials-registration.js` file was manually maintained and overrode compiled templates

## Solution Implemented

### 1. Clear Separation of Concerns
- **`html/js/templates.js`** - Contains ONLY templates (compiled from `html/js/templates/*.handlebars`)
- **`html/js/partials.js`** - Contains ONLY partials (compiled from `html/js/partials/*.handlebars`)
- **Removed** `html/js/partials-registration.js` entirely to eliminate conflicts

### 2. Build Process
- Templates: `handlebars --min html/js/templates > html/js/templates.js`
- Partials: `handlebars --min --partial html/js/partials > html/js/partials.js`
- Both files are auto-generated, no manual maintenance needed

### 3. Script Loading Order
In `html/index.html`:
```html
<script src="js/partials.js"></script>
<script src="js/templates.js"></script>
```
- Partials load first (required by templates)
- Templates load second and can reference partials

## Naming Conventions

### Templates (in `html/js/templates/`)
- Use descriptive names that indicate their purpose
- Examples: `talent_by_type.handlebars`, `class_nav.handlebars`, `item_detail.handlebars`
- Accessed via `Handlebars.templates.template_name`

### Partials (in `html/js/partials/`)
- Use descriptive names that indicate reusable components
- Examples: `talent_img.handlebars`, `class_talents_detail.handlebars`, `item_img.handlebars`
- Accessed via `Handlebars.partials.partial_name` or `{{> partial_name}}`

### Forbidden Patterns
- **Never** manually create files that define both templates and partials
- **Never** use the same name for both a template and a partial
- **Never** manually maintain compiled handlebars files

## Prevention of Future Conflicts

### 1. File Organization
```
html/js/
├── templates/          # Only .handlebars template files
│   ├── talent_by_type.handlebars
│   ├── class.handlebars
│   └── ...
├── partials/           # Only .handlebars partial files
│   ├── talent_img.handlebars
│   ├── class_talents_detail.handlebars
│   └── ...
├── templates.js        # Auto-generated from templates/
├── partials.js         # Auto-generated from partials/
└── main.js            # Contains Handlebars helpers
```

### 2. Build Commands
```bash
# Generate templates
make html/js/templates.js
# or directly:
handlebars --min html/js/templates > html/js/templates.js

# Generate partials  
make html/js/partials.js
# or directly:
handlebars --min --partial html/js/partials > html/js/partials.js
```

### 3. Development Workflow
1. Create/edit `.handlebars` files in appropriate directories
2. Run `make` or specific build commands
3. Verify in browser
4. **Never** manually edit `templates.js` or `partials.js`

## Debugging Template Issues

### Check Script Loading
1. Verify `partials.js` loads before `templates.js` in HTML
2. Check browser console for handlebars errors
3. Ensure no 404s for script files

### Verify Compilation
1. Check that `.handlebars` changes are reflected in compiled files
2. Use browser dev tools to inspect `Handlebars.templates` and `Handlebars.partials`
3. Clear browser cache if needed

### Name Conflicts
- Use unique, descriptive names for all templates and partials
- Avoid generic names like `detail`, `list`, `item` without context
- Use prefixes when appropriate: `talent_img`, `class_nav`, `item_detail`

This strategy eliminates the naming conflicts that previously caused debugging issues and ensures a clean separation between templates and partials.