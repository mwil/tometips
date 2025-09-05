# Mobile Popup Debugging Guide

## Quick Test Instructions:

1. **Force refresh** your browser: `Ctrl+F5` or `Cmd+Shift+R`
2. **Open DevTools** (F12) and switch to mobile device emulation
3. **Go to**: `http://localhost:8000/#classes/adventurer`
4. **Click any talent icon** - should show debug info in console

## Expected Behavior:
- **Desktop**: Popup max-width 600px (centered, normal size)
- **Mobile** (<768px): Popup fills nearly entire screen with small margins

## Debug Checklist:

### 1. Check CSS is loaded:
```javascript
// In browser console:
console.log($('#talent-popup').css('max-width'));
// Should show: "calc(100vw - 20px)" on mobile, "600px" on desktop
```

### 2. Check popup HTML structure:
```javascript
// In browser console after clicking talent:
console.log($('#talent-popup-overlay').html());
// Should show: nested divs with correct IDs
```

### 3. Check viewport size:
```javascript
// In browser console:
console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
// Should show: something like 375x667 for iPhone simulation
```

### 4. Manual CSS test:
```javascript
// In browser console (after clicking talent):
$('#talent-popup').css({
    'max-width': 'calc(100vw - 20px)',
    'max-height': 'calc(100vh - 40px)',
    'margin': '20px 10px',
    'background': 'red'  // temporary visual indicator
});
```

## CSS Rules Applied:
- **Specificity**: `html body #talent-popup-overlay #talent-popup` (very high)
- **Media Query**: `@media screen and (max-width: 767.98px)`
- **All properties**: Have `!important` declarations

## Fallback Test:
If still not working, check if there are any console JavaScript errors preventing the popup from showing.