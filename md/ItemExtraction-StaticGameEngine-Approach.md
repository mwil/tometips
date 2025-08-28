# Item Extraction: Static Game Engine Approach

## Problem Analysis

After examining the current item extraction issues, I've identified the key problems:

### Current Issues with Item Extraction

1. **Function/Callback Problems**: Object definitions contain many functions that can't be serialized:
   ```lua
   -- From world-artifacts.lua
   newEntity{ 
       on_wear = function(self, who) ... end,
       special_on_hit = {desc=_t"...", fct=function(self, who, target) ... end},
       use_power = {name = _t"...", power = 25, use = function(self, who) ... end}
   }
   ```

2. **Game State Dependencies**: Many files depend on runtime game state:
   ```lua
   -- From world-artifacts.lua:24
   for def, e in pairs(game.state:getWorldArtifacts()) do
       importEntity(e)
   end
   ```

3. **Resolver Calculations**: Items use resolvers that need game engine context:
   ```lua
   resolvers.rngrange(10, 20)  -- Needs actual RNG context
   resolvers.image_material("metal", "weapon", "dagger")  -- Needs material system
   ```

## New Approach: Static Game Engine Method

### Core Strategy

Instead of trying to stub everything, we **use the actual ToME game engine** but modify our approach to focus on **static data extraction** rather than dynamic player simulation.

### Key Differences from Talent Approach

| Aspect | Talent Extraction | Item Extraction (New) |
|--------|------------------|----------------------|
| **Goal** | Player-dependent calculations | Static item definitions |
| **Engine Usage** | Full simulation with parameter tracking | Limited engine for data access |
| **Output** | Dynamic HTML with parameter ranges | Clean JSON with static properties |
| **Complexity** | Multi-parameter analysis | Single-pass data extraction |

### Implementation Strategy

#### Phase 1: Engine Setup with Object Support

Extend `tip/engine.lua` to load ToME's Object system:

```lua
-- Add to tip/engine.lua
local Object = require 'mod.class.Object'

-- Create object definition registry (similar to talents_def)
game.objects_def = {}

-- Override newEntity to capture definitions
local original_newEntity = _G.newEntity
_G.newEntity = function(t)
    if t and t.name and not should_skip_object(t) then
        local cleaned = clean_object_definition(t)
        game.objects_def[cleaned.id or cleaned.define_as] = cleaned
    end
    return original_newEntity(t)
end
```

#### Phase 2: Smart Object Cleaning

Create an intelligent cleaning function that preserves useful data while removing problematic elements:

```lua
local function clean_object_definition(obj)
    local cleaned = {}
    
    -- Copy safe properties
    local safe_properties = {
        "name", "unided_name", "desc", "level_range", "rarity", "cost",
        "type", "subtype", "slot", "unique", "identified", "auto_pickup",
        "encumber", "material_level", "power_source", "flavor_name",
        "color", "image", "moddable_tile", "auto_image"
    }
    
    for _, prop in ipairs(safe_properties) do
        if obj[prop] ~= nil then
            cleaned[prop] = obj[prop]
        end
    end
    
    -- Handle complex properties with resolver support
    if obj.wielder then
        cleaned.wielder = clean_wielder_data(obj.wielder)
    end
    
    if obj.combat then
        cleaned.combat = clean_combat_data(obj.combat)
    end
    
    -- Resolve resolvers to static values
    if obj.level_range and type(obj.level_range) == "table" and obj.level_range.resolver then
        cleaned.level_range = resolve_to_static(obj.level_range)
    end
    
    return cleaned
end
```

#### Phase 3: Resolver Resolution

Handle resolver functions by computing their static equivalents:

```lua
local function resolve_to_static(resolver_obj)
    if type(resolver_obj) == "function" then
        -- Try to execute resolver in safe context
        local success, result = pcall(resolver_obj)
        if success then
            return result
        else
            return nil  -- Skip unresolvable functions
        end
    elseif type(resolver_obj) == "table" and resolver_obj.resolver then
        -- Handle specific resolver types
        if resolver_obj.resolver == "rngrange" then
            local min, max = resolver_obj[1], resolver_obj[2]
            return {min = min, max = max, avg = (min + max) / 2}
        elseif resolver_obj.resolver == "image_material" then
            return compute_material_image(resolver_obj[1], resolver_obj[2], resolver_obj[3])
        end
    end
    return resolver_obj
end
```

#### Phase 4: Minimal Game State Stubs

Provide only the essential stubs needed for object file execution:

```lua
-- Minimal stubs for object loading
game.state = {
    getWorldArtifacts = function() return {} end  -- Return empty for static extraction
}

-- Material and color systems
materials = load_material_definitions()
colors = load_color_definitions()

-- Essential object functions
importEntity = function(e) 
    if e then newEntity(e) end 
end
```

### Expected Results

#### Data Quality Improvements

1. **Accurate Colors**: Real game colors instead of white defaults
2. **Real Images**: Actual file paths computed from game logic
3. **Resolved Values**: Proper min/max ranges instead of single averages
4. **Complete Properties**: All object properties that can be statically determined

#### Example Output Comparison

**Current Stub Method**:
```json
{
    "name": "Shieldsmaiden",
    "color": {"r": 255, "g": 255, "b": 255},
    "image": "default_image.png",
    "level_range": [15, 15]
}
```

**New Static Game Engine Method**:
```json
{
    "name": "Shieldsmaiden", 
    "color": {"r": 139, "g": 69, "b": 19},
    "image": "object/artifact/shieldmaiden.png",
    "level_range": {"min": 10, "max": 20, "avg": 15},
    "wielder": {
        "inc_stats": {"str": 4, "con": 6},
        "combat_armor": 8,
        "combat_def": 12
    },
    "combat": {
        "dam": {"min": 12, "max": 18},
        "apr": 6,
        "physcrit": 4
    }
}
```

### Implementation Files

1. **`static_item_extractor.lua`** - Main extraction script using game engine
2. **`tip/object_engine.lua`** - Object system integration (extends tip/engine.lua)  
3. **`object_cleaner.lua`** - Smart object definition cleaning
4. **`resolver_handler.lua`** - Static resolver resolution

### Success Criteria

1. **✅ Shieldsmaiden extracted** with complete, accurate data
2. **✅ All resolver values computed** (not stubbed to averages)
3. **✅ Real colors and images** from game engine calculations
4. **✅ 700+ items extracted** with high data quality
5. **✅ No function serialization errors** due to smart cleaning
6. **✅ Preserved game logic** for color, image, and property calculations

### Key Advantage

This approach **combines the best of both worlds**:
- **Game Engine Accuracy**: Uses real ToME calculations like the talent system
- **Static Simplicity**: Doesn't need complex parameter simulation
- **Clean Output**: Produces serializable JSON without functions/callbacks
- **Complete Coverage**: Handles all object types including artifacts, weapons, armor

The result will be **item data with the same quality as the talent system** - accurate, complete, and properly calculated using the actual game engine.