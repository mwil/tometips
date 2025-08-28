# Talent Parsing Using ToME Game Engine Approach

## Overview

The talent extraction system in this codebase demonstrates a highly successful approach to data extraction that **uses the actual ToME game engine** rather than stubbing it out. This produces complete, accurate data while maintaining proper game logic and calculations.

## Key Success Factors

### 1. Game Engine Integration
The talent parser loads the actual ToME game engine with minimal safety modifications:

```lua
-- From talent_spoilers.lua:1
require 'tip.engine'

-- From tip/engine.lua - loads real game components:
require 'engine.interface.ActorTalents'
local Actor = require 'mod.class.Actor'
DamageType:loadDefinition("/data/damage_types.lua")
ActorTalents:loadDefinition("/data/talents.lua")
```

**Key insight**: Instead of guessing what game functions should return, the system loads the real game engine and lets it compute actual values.

### 2. Minimal Strategic Stubs

Only essential runtime functions are stubbed - those that would prevent execution but don't affect data quality:

```lua
-- Strategic stubs (tip/engine.lua:62-102)
core = { display = {...}, fov = {}, game = {}, shader = {} }  -- UI components
fs = { exists = function() return false end }                 -- File system access
rng = { percent = function() return false end }               -- Random generation

-- Game state stubs
game.state.unlockTalentCheck = function() return false end
player.hasEffect = function() return false end
player.knowTalent = function() return false end
```

**Key insight**: These stubs prevent crashes during execution but don't interfere with talent data calculation or display.

### 3. Smart Player Simulation

The system creates a sophisticated player simulation that tracks which parameters are used:

```lua
-- Parameter tracking system (talent_spoilers.lua:244-279)
player.getStat = function(self, stat, scale, raw, no_inc)
    spoilers.used.stat = spoilers.used.stat or {}
    spoilers.used.stat[Actor.stats_def[stat].id] = true  -- Track usage
    local val = spoilers.active.stat_power
    -- Apply actual game scaling logic
    if scale then
        if not raw then
            val = math.floor(val * scale / self.stats_def[stat].max)
        else
            val = val * scale / self.stats_def[stat].max
        end
    end
    return val
end
```

**Key insight**: The system doesn't just return dummy values - it implements the actual game's stat calculation logic while tracking what parameters affect each talent.

### 4. Multi-Parameter Analysis

The talent system analyzes each talent across multiple parameter combinations to understand dependencies:

```lua
-- Parameter variations (talent_spoilers.lua:44-54)
all_active = {
    { stat_power=10,  _level=1,  talent_level=1},  -- Early game
    { stat_power=25,  _level=10, talent_level=1},  -- Mid game
    { stat_power=50,  _level=25, talent_level=1},  -- Late game
    { stat_power=75,  _level=40, talent_level=1},  -- End game
    { stat_power=100, _level=50, talent_level=1},  -- Max stats
    { stat_power=100, _level=50, talent_level=2},  -- Talent scaling
    { stat_power=100, _level=50, talent_level=3},
    { stat_power=100, _level=50, talent_level=4},
    { stat_power=100, _level=50, talent_level=5},
}
```

**Key insight**: By testing each talent with different parameter combinations, the system can determine exactly which stats, levels, or talent points affect each ability.

### 5. Dynamic HTML Generation

The system automatically generates rich HTML tooltips based on parameter dependencies:

```lua
-- Smart result formatting (talent_spoilers.lua:195-199)
formatResults = function(self, results, prev_results)
    local new_result, disabled = self:determineDisabled(results)
    local message, css_class = self:usedMessage(disabled, prev_results)
    return '<acronym class="' .. css_class .. '" title="' .. message .. '">' .. new_result .. '</acronym>'
end
```

**Key insight**: Instead of static tooltips, the system generates contextual HTML that shows exactly which parameters affect each value, with appropriate CSS classes for styling.

## Architecture Comparison: Talents vs Items

### How Talents Work (Current Success)

1. **Engine Loading**: Loads real ToME engine with actor systems
2. **Player Simulation**: Creates sophisticated player with tracked parameter access  
3. **Multi-Parameter Testing**: Tests each talent across stat/level/talent combinations
4. **Result Analysis**: Determines which parameters actually affect each talent
5. **Dynamic HTML**: Generates rich tooltips showing parameter dependencies

### How Items Currently Fail (Stub Approach)

1. **Heavy Stubbing**: Replaces game logic with guessed return values
2. **Static Values**: Returns fixed averages instead of computed ranges
3. **Lost Context**: Misses color calculations, image paths, ego chances
4. **No Dependencies**: Can't determine what stats/levels affect items

## Data Quality Comparison

### Talent Output (Game Engine Method)
```json
// Rich, contextual data with parameter tracking
"cooldown": "<acronym class=\"talent-variable\" title=\"Values for talent levels 1-5\">22, 20, 18, 16, 14</acronym>",
"range": "<acronym class=\"stat-variable\" title=\"Values for Willpower 10, 25, 50, 75, 100\">6.0, 6.6, 7.5, 8.4, 9.0</acronym>",
"info_text": "Detailed HTML with parameter-dependent calculations..."
```

### Item Output (Stub Method)
```json  
// Static, incomplete data
"egos_chance": {"suffix": 45, "prefix": 45},  // Should be computed ranges
"color": {"r": 255, "g": 255, "b": 255},      // Should be actual UMBER color
"image": "default_image.png"                   // Should be real path
```

## Implementation Strategy for Items

### Phase 1: Adapt Engine Loading
- Use `tip.engine.lua` as foundation (already loads game engine successfully)
- Add object-specific game systems (similar to how talents load `ActorTalents`)
- Load item definition files using same pattern as talent files

### Phase 2: Create Item Player Simulation  
- Extend the player simulation to track item-relevant parameters
- Add methods for item property calculation (ego generation, color determination)
- Implement parameter tracking for item-specific systems

### Phase 3: Multi-Parameter Item Analysis
- Test items across relevant parameter combinations (level, stats, material tiers)
- Track which parameters affect each item property
- Generate dynamic HTML for item tooltips

## Key Files for Item Implementation

### Reference Files (Successful Talent Approach)
- `talent_spoilers.lua` - Main talent extraction logic
- `tip/engine.lua` - Game engine loading and strategic stubs
- Output: `html/data/1.7.6/talents.*.json` - Rich, accurate talent data

### Target Files (Item Extraction Goals)  
- Adapt talent approach for `world-artifacts.lua`, `weapons.lua`, etc.
- Generate `html/data/1.7.6/items.*.json` with same data quality
- Preserve all computed values, colors, images, and game logic

## Success Criteria

1. **Complete Data**: All resolver values computed (not stubbed to averages)
2. **Accurate Colors**: Real game colors instead of white defaults  
3. **Real Images**: Actual file paths instead of placeholders
4. **Parameter Tracking**: HTML tooltips showing which stats affect items
5. **Full Coverage**: All 700+ items extracted with complete data

## Critical Insight

The talent extraction approach proves that **using the actual game engine produces dramatically better results than stubbing**. The talent system generates rich, interactive, contextual data because it preserves the game's logic and calculations.

For items to reach the same quality standard, they must follow the same approach: load the real game engine, simulate parameters intelligently, and let the game compute actual values rather than guessing with stubs.