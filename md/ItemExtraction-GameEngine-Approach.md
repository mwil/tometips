# Item Extraction Using Game Engine Approach

## Current Status

We successfully identified and partially solved the missing items issue using a comprehensive stub approach. However, this method has significant data completeness problems.

### What We Achieved
- ✅ **Fixed missing items**: Found Shieldsmaiden and extracted 598 items (vs previous 312)
- ✅ **Fixed world-artifacts.lua processing**: Main artifact file now processes successfully
- ✅ **Identified root cause**: Missing stubs in extraction script caused file execution failures

### What We Lost with Stub Approach
- ❌ **Resolver values**: `resolvers.rngrange(10, 20)` → fixed average instead of actual range
- ❌ **Accurate colors**: Most items show default white instead of actual colors
- ❌ **Image paths**: Many show "default_image.png" instead of real paths
- ❌ **Computed values**: Ego chances, material properties, etc. are oversimplified

## Recommended Next Approach: Game Engine Method

Based on how the talent extraction worked successfully, we should:

### 1. Use Actual Game Engine
Instead of stubs, run the actual ToME game engine with minimal safety modifications:
- Let resolvers compute real values
- Get accurate colors, images, statistics
- Preserve all computed game mechanics

### 2. Target Only Essential Stubs
From our analysis, only these functions cause extraction failures:
```lua
-- Critical stubs needed (minimal set):
game.state:getWorldArtifacts() -- Returns empty table
interface.* -- Game UI access
engine.* -- Runtime engine access
getSchematics() -- Tinker system
```

### 3. Investigation Steps

#### Step 1: Examine Current Talent Extraction
- **File to examine**: Look for talent extraction scripts in this codebase
- **Key question**: How does it avoid execution errors while preserving data?
- **What to learn**: Which stubs are actually essential vs. which can be computed

#### Step 2: Identify Game Engine Loading
- **Find**: How talents load the ToME engine safely
- **Understand**: Game loading sequence and dependencies
- **Locate**: Entry points that don't require full game initialization

#### Step 3: Adapt for Items
- **Copy**: Successful talent extraction pattern
- **Modify**: For object files instead of talent files
- **Test**: Start with single file (world-artifacts.lua) that we know works

## Key Files and Discoveries

### Files That Work with Current Stubs
- `world-artifacts.lua` - **183 entities** (includes Shieldsmaiden!)
- `boss-artifacts-maj-eyal.lua` - **37 entities**
- `random-artifacts.lua` - **80 entities**

### Files That Still Fail
- Most base item files (weapons.lua, armor.lua, etc.) - **0 entities** extracted
- Tinker files - Missing tformat method calls
- Some lore files - Interface access issues

### Critical Missing Data Examples
From our current JSON output:
```json
// What we get (stub approach):
"egos_chance": {"suffix": 45, "prefix": 45}
"color": {"r": 255, "g": 255, "b": 255}
"image": "default_image.png"

// What we should get (game engine approach):  
"egos_chance": {"prefix": {"resolvers": "mbonus", "value": [40, 5]}, "suffix": {"resolvers": "mbonus", "value": [40, 5]}}
"color": {"r": 139, "g": 69, "b": 19}  // Actual UMBER color
"image": "object/artifact/shieldmaiden.png"  // Real path
```

## Implementation Plan

### Phase 1: Research (1 session)
1. **Find talent extraction method** in current codebase
2. **Document** how it loads game engine safely
3. **Identify** minimal stub requirements

### Phase 2: Adapt (1-2 sessions)  
1. **Create** game engine loading script for items
2. **Test** on single file (world-artifacts.lua)
3. **Compare** data quality: stub vs game engine output

### Phase 3: Full Implementation (2-3 sessions)
1. **Process all item files** with game engine method
2. **Verify** complete data extraction (images, colors, computed values)
3. **Generate** high-quality JSON files with accurate game data

## Expected Outcomes

### Data Quality Improvement
- **Colors**: Real game colors instead of white defaults
- **Images**: Actual file paths instead of placeholders  
- **Values**: Computed ranges, bonuses, statistics instead of averages
- **Properties**: Complete resolver-computed data

### Item Count Verification
- **Current stub method**: 598 items extracted
- **Expected game engine method**: 700+ items (all non-template items)
- **Verification**: Compare against known item count from game documentation

## Success Criteria
1. **Shieldsmaiden extracted** with complete, accurate data
2. **All item files process** without stub-related data loss
3. **Image paths and colors** are real game values
4. **Total item count** matches or exceeds stub method
5. **Data quality** suitable for production website

## Files to Reference in Next Session
- `ItemListFeature.md` - Contains item structure analysis
- `fixed_item_extractor.lua` - Working stub-based extractor (reference only)
- `debug_world_artifacts_stubs.lua` - Shows what comprehensive stubs look like
- Talent extraction scripts (need to locate in codebase)

## Key Insight
The talent extraction approach in this project is the gold standard - it gets complete, accurate data by using the actual game engine instead of guessing with stubs. We should replicate that approach for items.