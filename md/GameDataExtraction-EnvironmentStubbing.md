# Game Data Extraction - Environment Stubbing Issues and Solutions

This document outlines the challenges encountered and solutions implemented when extracting item data from Tales of Maj'Eyal (ToME) game files using Lua environment stubbing.

## Overview

ToME item definitions are written as Lua code that relies heavily on game engine functions, constants, and modules. To extract this data for web display, we need to create a "stub" environment that simulates the game's runtime environment while avoiding complex game logic.

## Major Issues Encountered and Solutions

### 1. Missing Constant Dependencies

**Problem:**
Game files reference numerous constants that don't exist in our stub environment, causing "table index is nil" errors.

**Examples:**
- `Stats.STAT_LCK` - Missing luck stat constant
- `DamageType.FIRE` - Missing damage type constants  
- `Talents.T_FIRE_BREATH` - Missing talent constants
- Color constants like `colors.RED`, `colors.SLATE`

**Solution:**
Created comprehensive constant tables with fallback mechanisms:

```lua
-- Stats constants with all required fields
Stats = {
    STAT_STR = "str", STAT_DEX = "dex", STAT_CON = "con",
    STAT_MAG = "mag", STAT_WIL = "wil", STAT_CUN = "cun",
    STAT_LCK = "lck"  -- This was missing initially!
}

-- DamageType with metatable fallback
DamageType = setmetatable({
    FIRE = "FIRE", COLD = "COLD", LIGHTNING = "LIGHTNING"
    -- ... more types
}, {
    __index = function(t, k) return tostring(k) end
})
```

### 2. Complex Damage Type Definitions

**Problem:**
Some damage types are defined using complex projector functions rather than simple constants, causing extraction failures for weapons like those with `DamageType.FIRE`.

**Root Cause:**
The game's `newDamageType` function creates complex function-based damage types that can't be serialized to JSON.

**Solution:**
Stub out `newDamageType` to prevent complex definitions from overriding our simple string constants:

```lua
-- Prevent complex damage type creation
newDamageType = function(t)
    -- Ignore complex damage type definitions
    return nil
end
```

### 3. Base Entity Inheritance Bug

**Problem:**
Artifacts like "Everpyre Blade" were missing from the final output despite being processed correctly.

**Root Cause:**
During base inheritance, the `define_as` field from base entities (like `"BASE_LONGSWORD"`) was overwriting the derived entity's `define_as` field (which should be `nil`), causing artifacts to be misclassified as base entities.

**Debug Evidence:**
```
Before inheritance: define_as: nil       ✅
After inheritance:  define_as: BASE_LONGSWORD  ❌
Result: Stored as base entity instead of artifact
```

**Solution:**
Preserve the original `define_as` value during inheritance:

```lua
-- Store the original define_as from the current entity
local original_define_as = t.define_as

for k, v in pairs(t) do
    entity[k] = v  -- Apply inheritance
end

-- Restore original define_as (don't inherit from base)
entity.define_as = original_define_as
```

**Impact:**
- Before fix: 322 total items (261 artifacts)
- After fix: 695 total items (450 artifacts)
- **373 additional items recovered!**

### 4. Module Loading Simulation

**Problem:**
Game files use `require()` to load modules like `"engine.interface.ActorStats"` which don't exist in our environment.

**Solution:**
Created a comprehensive `require()` stub that returns appropriate constants:

```lua
require = function(module)
    if module:match("ActorStats") then
        return { STAT_STR = "str", STAT_DEX = "dex", ... }
    elseif module:match("DamageType") then
        return env.DamageType  -- Return our stub version
    else
        return {}  -- Safe fallback
    end
end
```

### 5. Resolver Function Handling

**Problem:**
Many item properties use resolver functions like `resolvers.mbonus(40, 5)` which need to be handled without executing complex game logic.

**Solution:**
Created resolver stubs that return simple values or placeholder data:

```lua
resolvers = setmetatable({}, {
    __index = function(t, k)
        if k == "mbonus" then
            return function(base, bonus) return base + bonus end
        elseif k == "image_material" then
            return function() return "default_image.png" end
        else
            return function(...) 
                return {resolver_type = k, args = {...}}
            end
        end
    end
})
```

### 6. Function Field Filtering

**Problem:**
Many item properties contain functions that can't be serialized to JSON, causing extraction failures.

**Solution:**
Implemented recursive function filtering during entity cleaning:

```lua
-- Exclude function fields and problematic content
exclude_fields = {
    "info", "use_talent", "on_wear", "on_takeoff", 
    "special", "use_power", "tactical", ...
}

-- During cleaning
for k, v in pairs(entity) do
    if not config.exclude_fields[k] and type(v) ~= "function" then
        -- Include this field
    end
end
```

## Best Practices Learned

### 1. Comprehensive Constant Coverage

Always include comprehensive constant definitions with metatable fallbacks:

```lua
local_table = setmetatable({
    KNOWN_CONSTANT = "value"
}, {
    __index = function(t, k) 
        return tostring(k)  -- Fallback for unknown constants
    end
})
```

### 2. Preserve Original Entity Properties

When implementing inheritance, be careful not to override critical classification fields:

```lua
-- BAD: Blindly copy all fields
for k, v in pairs(base_entity) do
    entity[k] = v  -- May override important derived fields
end

-- GOOD: Preserve derived entity's identity
local original_identity = derived.define_as
-- ... do inheritance ...
entity.define_as = original_identity  -- Restore
```

### 3. Error Recovery with pcall

Wrap entity processing in `pcall` to continue extraction even when individual entities fail:

```lua
local success, result = pcall(function()
    -- Entity processing logic
end)

if not success then
    -- Log error but continue with next entity
    return nil
else
    return result
end
```

### 4. Enhanced Error Reporting

Provide detailed error context to help debug stubbing issues:

```lua
if exec_err:match("table index is nil") then
    print("DETAILED ANALYSIS:")
    print("  Stats table exists?", env.Stats and "yes" or "no")
    print("  DamageType table exists?", env.DamageType and "yes" or "no")
    -- ... more debugging info
end
```

## Testing Strategy

### 1. Incremental Constant Addition

Add constants incrementally based on extraction failures rather than trying to anticipate all needs upfront.

### 2. Specific Item Debugging

Use targeted debugging for problematic items:

```lua
if t.name and t.name:match("Everpyre") then
    print("DEBUG: Processing", t.name)
    print("  Fields:", table.concat(keys, ", "))
end
```

### 3. Classification Verification

Always verify that items end up in the correct categories:

```lua
-- Verify artifact counts make sense
print("Artifacts found:", #artifacts)
print("Expected range: 400-500")  -- Based on manual inspection
```

## Conclusion

Environment stubbing for game data extraction requires careful balance between completeness and simplicity. The key lessons are:

1. **Comprehensive stubs** - Cover all constants the game code might reference
2. **Simple fallbacks** - Use string constants instead of complex functions
3. **Preserve identity** - Don't let inheritance corrupt entity classification
4. **Robust error handling** - Continue extraction even when individual items fail
5. **Thorough testing** - Verify extracted data matches expectations

This approach successfully extracted 695 items from ToME 1.7.6, including previously missing artifacts, while maintaining clean separation between game logic and web display data.