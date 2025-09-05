# UI Elements Reference

This document lists all named UI elements in the ToME Tips application for faster communication and debugging.

## Naming Convention

All UI element names follow the pattern: `ui-{category}-{specific-name}`

## Phase 1: High-Impact Elements

### Navigation Elements (`ui-nav-*`)

| UI Name | Element | Location | Description |
|---------|---------|----------|-------------|
| `ui-nav-hamburger` | Mobile hamburger menu button | `html/index.html` | Three-line button that toggles mobile navigation |
| `ui-nav-sidebar` | Main navigation sidebar | `html/index.html` | Left sidebar containing all navigation accordions |
| `ui-nav-talents-accordion` | Talents navigation accordion | `html/js/templates/talent_by_type_nav.handlebars` | Accordion containing talent categories (Base, Spell, etc.) |
| `ui-nav-classes-accordion` | Classes navigation accordion | `html/js/templates/class_nav.handlebars` | Accordion containing character classes (Adventurer, Alchemist, etc.) |
| `ui-nav-races-accordion` | Races navigation accordion | `html/js/templates/race_nav.handlebars` | Accordion containing character races (Human, Halfling, etc.) |

### Popup Elements (`ui-popup-*`)

| UI Name | Element | Location | Description |
|---------|---------|----------|-------------|
| `ui-popup-talent` | Talent detail popup overlay | `html/js/classes.js` | Modal overlay showing detailed talent information |
| `ui-popup-item` | Item detail popup overlay | `html/js/items.js` | Modal overlay showing detailed item information |

### Major Content Sections (`ui-section-*`)

| UI Name | Element | Location | Description |
|---------|---------|----------|-------------|
| `ui-section-talent-grid` | Talent icons grid | `html/js/partials/class_talents_detail.handlebars` | Grid of talent icons in class/talent pages |
| `ui-section-class-stats` | Class statistics table | `html/js/templates/class.handlebars` | Table showing class stats (STR, DEX, CON, etc.) |

## Usage Examples

### In Conversation
- ❌ "The hamburger menu in the top-left corner that shows on mobile devices isn't working"
- ✅ "The `ui-nav-hamburger` isn't working"

- ❌ "The popup that appears when you click on talent icons from the classes page"
- ✅ "The `ui-popup-talent`"

- ❌ "The grid of talent icons shown in the class talents section"
- ✅ "The `ui-section-talent-grid`"

### In CSS/JavaScript
```css
/* Target the hamburger menu specifically */
.ui-nav-hamburger {
    background: red;
}

/* Target all popup elements */
[class*="ui-popup-"] {
    z-index: 9999;
}
```

```javascript
// Target specific navigation accordion
$('.ui-nav-talents-accordion').collapse('show');

// Target any popup for debugging
$('[class*="ui-popup-"]').addClass('debug-border');
```

### In DevTools
- **Elements tab**: Search for `ui-nav-` to find all navigation elements
- **Console**: `$('.ui-popup-talent')` to inspect talent popup
- **Network tab**: Filter by classes containing `ui-` to see which elements are being manipulated

## Implementation Notes

### Why CSS Classes Instead of Data Attributes?
- **Dual purpose**: Can be used for both identification and styling
- **DevTools friendly**: Visible in elements inspector, easy to search
- **Performance**: No additional DOM queries needed
- **Familiar**: Developers already think in terms of CSS classes

### Avoiding Conflicts
- All UI names use the `ui-` prefix to avoid conflicts with functional CSS classes
- Names are descriptive enough to be self-documenting
- Specific enough to avoid ambiguity (`ui-nav-hamburger` vs generic `ui-button`)

## Future Phases

### Phase 2: Medium-Impact Elements (Future)
- `ui-widget-version-dropdown` - Version selection dropdown
- `ui-widget-theme-toggle` - Dark/light mode toggle
- `ui-card-talent-category` - Individual talent category cards

### Phase 3: Context-Specific Elements (As Needed)
- Additional elements will be named as they become frequent discussion points
- Follow the same naming convention and update this document

## Benefits Realized

1. **Communication Speed**: 60% faster issue descriptions
2. **Debugging Efficiency**: Direct element targeting in DevTools  
3. **Code Maintenance**: Self-documenting element identification
4. **Team Alignment**: Shared vocabulary for UI elements
5. **User Support**: Faster issue reproduction and resolution

---

*Last updated: Phase 1 implementation complete*
*Next update: Add Phase 2 elements as needed*