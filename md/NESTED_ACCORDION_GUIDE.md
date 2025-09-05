# Nested Accordion Implementation Guide for Bootstrap 5

## Overview

This guide documents how to properly implement nested accordions with Bootstrap 5, based on lessons learned from debugging complex event handling issues in the items navigation system.

## Key Problems with Nested Accordions

### 1. Bootstrap's Automatic Accordion Enforcement
Bootstrap 5 automatically enforces accordion behavior through internal event handling, which can interfere with custom nested accordion logic.

**Problem**: Bootstrap's `enforceSidebarAccordion()` function was automatically closing parent sections when nested elements were manipulated.

**Solution**: Disable automatic accordion behavior for specific navigation sections:
```javascript
function enforceSidebarAccordion(targetNavId) {
    if (!targetNavId.startsWith('#nav-')) return;
    
    // Disable automatic accordion behavior for items navigation - handle manually
    if (targetNavId.includes('artifacts') || targetNavId.includes('equipment') || 
        targetNavId.includes('consumables') || targetNavId.includes('special')) {
        return;
    }
    
    // Original accordion logic for other sections...
}
```

### 2. Event Delegation Timing Issues
Event handlers registered before DOM elements exist will fail.

**Problem**: Direct event binding like `$("#nav-items").on("click", ...)` fails if `#nav-items` doesn't exist yet.

**Solution**: Use document-level event delegation:
```javascript
// BAD - fails if #nav-items doesn't exist
$("#nav-items").on("click", "li > a", handler);

// GOOD - works for dynamically loaded content
$(document).on("click", "#nav-items > li > a", handler);
```

### 3. Event Bubbling and Interference
Multiple event handlers on nested elements can trigger unintended behavior.

**Problem**: Clicking inner elements triggers outer element handlers.

**Solution**: Use `preventDefault()`, `stopPropagation()`, and `stopImmediatePropagation()`:
```javascript
$(document).on("click", "#nav-items .collapse a", function(e) {
    var hasDropdown = $(this).find('.dropdown').length > 0;
    
    if (hasDropdown) {
        e.preventDefault(); // Prevent Bootstrap's automatic data-bs-toggle behavior
        e.stopPropagation(); // Prevent Level 1 handler
        e.stopImmediatePropagation(); // Prevent all other handlers
        
        // Handle collapse manually...
    }
});
```

## Bootstrap 5 Migration Considerations

### Data Attribute Changes
Bootstrap 5 changed several data attributes:
- `data-toggle` → `data-bs-toggle`
- `data-target` → `data-bs-target` 
- `data-dismiss` → `data-bs-dismiss`

**Conversion Function**:
```javascript
function convertBootstrapAttributes() {
    // Convert data-toggle to data-bs-toggle
    document.querySelectorAll('[data-toggle]:not([data-bs-toggle])').forEach(function(element) {
        var toggle = element.getAttribute('data-toggle');
        element.setAttribute('data-bs-toggle', toggle);
        
        if (toggle === 'collapse') {
            var target = element.getAttribute('data-target');
            if (target && target.startsWith('#')) {
                element.setAttribute('data-bs-target', target);
                
                // Remove unwanted accordion behavior
                element.removeAttribute('data-bs-parent');
                element.removeAttribute('data-parent');
            }
        }
    });
}
```

### Collapse API Changes
Bootstrap 5's collapse API is more strict about state management.

**Key Differences**:
- Use `.collapse('show')` and `.collapse('hide')` instead of manual class manipulation
- Bootstrap 5 automatically manages `aria-expanded` and `collapsed` classes
- Manual state tracking may conflict with Bootstrap's internal state

## Nested Accordion Architecture

### Level Structure
For complex navigation like items/artifacts/weapons/swords:

1. **Level 1** (Top-level): Accordion behavior - only one section open at a time
2. **Level 2** (Subcategories): Independent collapsibles - don't affect parent levels
3. **Level 3** (Leaf items): Pure navigation - no collapse behavior

### Event Handler Pattern
Use separate handlers for each level with specific selectors:

```javascript
// LEVEL 1: Top-level accordion sections ONLY
$(document).on("click", "#nav-items > li > a", function(e) {
    var $link = $(this);
    var $parentLi = $link.closest('li');
    
    // Verify this is truly a direct child
    if ($parentLi.parent().attr('id') !== 'nav-items') {
        return;
    }
    
    var hasDropdown = $link.find('.dropdown').length > 0;
    
    if (hasDropdown) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Accordion behavior: close siblings, open this one
        // Navigate when expanding
    }
});

// LEVEL 2+: Nested sections and leaf items
$(document).on("click", "#nav-items .collapse a", function(e) {
    var $link = $(this);
    var hasDropdown = $link.find('.dropdown').length > 0;
    var hasNoDropdown = $link.find('.no-dropdown').length > 0;
    
    if (hasDropdown) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Independent collapse behavior - no accordion
    } else if (hasNoDropdown) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Pure navigation - no collapse behavior
    }
});
```

### HTML Structure Requirements

**Level 1 (Accordion)**:
```html
<ul id="nav-items">
    <li>
        <a href="#items/artifacts">
            <span class="dropdown collapsed" data-bs-target="#nav-artifacts">Artifacts</span>
        </a>
        <div id="nav-artifacts" class="collapse">
            <!-- Level 2 content -->
        </div>
    </li>
</ul>
```

**Level 2 (Independent Collapsibles)**:
```html
<ul>
    <li>
        <a href="#items/artifacts/weapons">
            <span class="dropdown collapsed" data-bs-target="#nav-artifacts-weapons">Weapons</span>
        </a>
        <div id="nav-artifacts-weapons" class="collapse">
            <!-- Level 3 content -->
        </div>
    </li>
</ul>
```

**Level 3 (Pure Navigation)**:
```html
<ul>
    <li>
        <a href="#items/artifacts/weapons/swords">
            <span class="no-dropdown">Swords</span>
        </a>
    </li>
</ul>
```

## Event Handling Best Practices

### 1. Use Semantic CSS Classes
- `.dropdown` - Elements that should have collapse behavior
- `.no-dropdown` - Elements that should only navigate
- Use these classes to determine behavior in event handlers

### 2. Prevent Event Conflicts
```javascript
// Always prevent default browser behavior for custom handling
e.preventDefault();

// Stop events from bubbling to parent elements
e.stopPropagation();

// Stop ALL other handlers on this element
e.stopImmediatePropagation();
```

### 3. Selector Specificity
Use highly specific selectors to avoid conflicts:
```javascript
// GOOD - very specific, only matches intended elements
"#nav-items > li > a"

// BAD - too broad, matches unintended elements  
".nav-link"
```

### 4. State Synchronization
Keep Bootstrap's collapse state in sync with visual indicators:
```javascript
// Listen to Bootstrap's events to update UI
$("#side-nav").on("shown.bs.collapse", ".collapse", function(e) {
    var $collapse = $(this);
    var targetId = $collapse.attr('id');
    var $dropdown = $(".dropdown[data-bs-target='#" + targetId + "']");
    $dropdown.removeClass('collapsed').attr('aria-expanded', 'true');
});

$("#side-nav").on("hidden.bs.collapse", ".collapse", function(e) {
    var $collapse = $(this);
    var targetId = $collapse.attr('id');
    var $dropdown = $(".dropdown[data-bs-target='#" + targetId + "']");
    $dropdown.addClass('collapsed').attr('aria-expanded', 'false');
});
```

### 5. Debug Logging Pattern
Use consistent logging to track event flow:
```javascript
$(document).on("click", "#nav-items > li > a", function(e) {
    console.log('Level 1 click:', $(this).text().trim(), 'hasDropdown:', hasDropdown);
    // Handler logic...
});
```

## Common Pitfalls

### 1. Don't Mix Bootstrap Auto-Accordion with Custom Logic
Bootstrap's `data-bs-parent` attribute creates automatic accordion behavior that conflicts with custom event handlers.

**Avoid**: Setting `data-bs-parent` on elements with custom collapse logic
**Instead**: Handle accordion behavior manually in JavaScript

### 2. Don't Use Direct Element Binding for Dynamic Content
Content loaded via AJAX or template rendering needs event delegation.

**Avoid**: `$("#nav-items").on("click", ...)` 
**Instead**: `$(document).on("click", "#nav-items ...", ...)`

### 3. Don't Assume Event Order
Multiple handlers on the same element may fire in unexpected order.

**Solution**: Use `stopImmediatePropagation()` to ensure only intended handlers run

### 4. Don't Forget Bootstrap State Management
Bootstrap manages internal state that must be kept in sync with UI.

**Solution**: Listen to Bootstrap events (`shown.bs.collapse`, `hidden.bs.collapse`) to update custom UI elements

## Testing Strategy

### 1. Test Each Level Independently
- Level 1: Should close siblings when opening
- Level 2: Should not affect parent or sibling levels
- Level 3: Should only navigate, no collapse behavior

### 2. Test Event Combinations
- Click dropdown caret
- Click link text
- Click between nested levels
- Rapid clicking
- Mobile vs desktop

### 3. Test State Consistency
- Visual caret direction matches actual state
- Bootstrap's internal state matches visual state
- Navigation works after collapse/expand operations

## Implementation Checklist

- [ ] Convert all Bootstrap 3 data attributes to Bootstrap 5
- [ ] Remove `data-bs-parent` from custom accordion elements
- [ ] Use document-level event delegation for dynamic content
- [ ] Implement level-specific event handlers with specific selectors
- [ ] Add proper event prevention (`preventDefault`, `stopPropagation`, `stopImmediatePropagation`)
- [ ] Synchronize custom UI with Bootstrap events
- [ ] Test all interaction combinations
- [ ] Add semantic CSS classes (`.dropdown`, `.no-dropdown`) for behavior identification
- [ ] Disable conflicting automatic Bootstrap behaviors
- [ ] Implement proper state management for visual indicators