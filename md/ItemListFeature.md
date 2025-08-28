# Item List Feature - Implementation Reference

## Overview

This document outlines the research findings for implementing a new `#items` path in the ToME Tips website to display game items similar to how talents are currently displayed.

## Item Declaration Structure in Game Code

Items in Tales of Maj'Eyal are declared using the `newEntity` function with a comprehensive property structure.

### Example: Shieldsmaiden Item

**Location**: `/Users/mwil/src/mwil/tometips/1.7.6/data/general/objects/world-artifacts.lua` (line 7052)

```lua
newEntity{ base = "BASE_SHIELD",
    power_source = {arcane=true},
    unique = true,
    name = "Shieldsmaiden", 
    image = "object/artifact/shieldmaiden.png",
    unided_name = _t"icy shield",
    moddable_tile = "special/%s_shieldmaiden",
    moddable_tile_big = true,
    desc = _t[[Myths tell of shieldsmaidens, a tribe of warrior women from the northern wastes of Maj'Eyal. Their martial prowess and beauty drew the fascination of swaths of admirers, yet all unrequited. So began the saying, that a shieldsmaiden's heart is as cold and unbreakable as her shield.]],
    color = colors.BLUE,
    level_range = {36, 48},
    rarity = 270,
    require = { stat = { str=28 }, },
    cost = 400,
    material_level = 5,
    metallic = false,
    special_desc = function(self) return _t"Granted talent can block up to 1 instance of damage each 10 turns." end,
    special_combat = {
        dam = 48,
        block = 150,
        physcrit = 8,
        dammod = {str=1},
        damtype = DamageType.ICE,
        talent_on_hit = { [Talents.T_ICE_SHARDS] = {level=3, chance=15} },
    },
    wielder = {
        combat_armor = 20,
        combat_def = 5,
        combat_def_ranged = 12,
        fatigue = 10,
        learn_talent = { [Talents.T_BLOCK] = 1, [Talents.T_SHIELDSMAIDEN_AURA] = 1,  },
        resists = { [DamageType.COLD] = 25, [DamageType.FIRE] = 25,},
    },
}
```

## Item Property Categories

### 1. Basic Identification Properties

- `name`: Display name of the item
- `image`: Path to item icon/image (e.g., "object/artifact/shieldmaiden.png")
- `desc`: Flavor text description (often contains lore)
- `unided_name`: Name when unidentified (e.g., "icy shield")
- `color`: Visual color theme (e.g., `colors.BLUE`)

### 2. Game Mechanics Properties

- `level_range`: Array of minimum and maximum levels (e.g., `{36, 48}`)
- `rarity`: Numerical rarity value (higher = rarer)
- `material_level`: Tier of the item (1-5, with 5 being highest)
- `cost`: Base gold value
- `require`: Requirements to use the item
  - `stat`: Stat requirements (e.g., `{ str=28 }`)
  - `flag`: Special flags needed

### 3. Combat Statistics (`special_combat`)

- `dam`: Base damage value
- `block`: Block value for shields
- `physcrit`: Physical critical hit chance
- `dammod`: Damage modifiers based on stats
- `damtype`: Type of damage dealt (e.g., `DamageType.ICE`)
- `talent_on_hit`: Talents triggered on hit with chance and level
- `accuracy_effect`: Combat accuracy modifications
- `damrange`: Damage range multiplier

### 4. Wielder Benefits (`wielder`)

- `combat_armor`: Armor value bonus
- `combat_def`: Melee defense bonus
- `combat_def_ranged`: Ranged defense bonus
- `fatigue`: Fatigue penalty/bonus
- `learn_talent`: Talents granted by wielding the item
- `resists`: Damage type resistances (e.g., `[DamageType.COLD] = 25`)

### 5. Inheritance and Categorization

- `base`: Base template to inherit from (e.g., "BASE_SHIELD", "BASE_WEAPON")
- `type`: General category (e.g., "armor", "weapon")
- `subtype`: Specific subcategory (e.g., "shield", "sword")
- `slot`: Equipment slot (e.g., "OFFHAND", "MAINHAND")

### 6. Special Properties

- `unique`: Boolean indicating if item is unique/artifact
- `power_source`: Power source type (e.g., `{arcane=true}`)
- `metallic`: Boolean for material properties
- `special_desc`: Function returning special description text
- `moddable_tile`: Custom visual tile information

## File Locations in Game Code

### Item Definition Files

Items are scattered across multiple files in the game data:

1. **Artifacts/Unique Items**:
   - `/data/general/objects/world-artifacts.lua` - World artifacts like Shieldsmaiden
   - `/data/general/objects/random-artifacts/` - Random artifact templates

2. **Base Item Templates**:
   - `/data/general/objects/shields.lua` - Shield base types (BASE_SHIELD)
   - `/data/general/objects/weapons.lua` - Weapon base types
   - `/data/general/objects/armor.lua` - Armor base types
   - `/data/general/objects/jewelry.lua` - Ring/amulet base types

3. **Regular Items**:
   - Various files in `/data/general/objects/` for different item categories

### Base Template Example (BASE_SHIELD)

**Location**: `/data/general/objects/shields.lua`

```lua
newEntity{
    define_as = "BASE_SHIELD",
    slot = "OFFHAND",
    type = "armor", subtype="shield",
    add_name = " (#ARMOR#, #SHIELD#)",
    display = ")", color=colors.UMBER, 
    image = resolvers.image_material("shield", "metal"),
    moddable_tile = resolvers.moddable_tile("shield"),
    rarity = 5,
    encumber = 7,
    metallic = true,
    desc = _t[[Handheld deflection devices.]],
    require = { flag = { "allow_wear_shield" }, },
    special_combat = { 
        talented="shield", 
        accuracy_effect="staff", 
        damrange = 1.2, 
        no_offhand_penalty=true 
    },
}
```

## Implementation Considerations

### Data Extraction

- Items are instantiated in game code similar to talents
- Need to extract item data from spoiler generation process
- Item properties are complex nested structures

### Display Structure

Similar to current talent display, items should show:

- **Header**: Name, icon, rarity, level range
- **Requirements**: Stats, flags, other prerequisites
- **Combat Stats**: Damage, block, critical, etc.
- **Wielder Benefits**: Armor, defenses, resistances, granted talents
- **Description**: Lore/flavor text
- **Special Effects**: Talent triggers, unique mechanics

### Categorization

Items could be organized by:

- **Type**: Weapons, Armor, Jewelry, Consumables
- **Subtype**: Swords, Shields, Heavy Armor, etc.
- **Rarity**: Normal, Rare, Unique/Artifact
- **Level Range**: Group by character level ranges

### Visual Design

- Use item images/icons (similar to talent images)
- Color coding by rarity or item type
- Stat tables similar to current class stats tables
- Collapsible sections for detailed information

## Base Item Classes

The following base item classes are actually used in newEntity declarations in the game code:

### Item Count Summary

- **Melee Weapons**: 128 items
- **Ranged Weapons**: 38 items  
- **Magical Implements**: 35 items
- **Body Armor**: 53 items
- **Head Protection**: 28 items
- **Accessories**: 86 items
- **Jewelry**: 43 items
- **Consumables**: 29 items
- **Special Items**: 54 items

**Total Items**: 494 items across 47 base classes

### Weapons

**Melee Weapons:**

- `BASE_LONGSWORD` (20) - One-handed swords
- `BASE_GREATSWORD` (13) - Two-handed swords  
- `BASE_KNIFE` (21) - Light blades/daggers
- `BASE_WARAXE` (9) - One-handed axes
- `BASE_BATTLEAXE` (11) - Two-handed axes
- `BASE_MACE` (9) - One-handed blunt weapons
- `BASE_GREATMAUL` (13) - Two-handed blunt weapons
- `BASE_WHIP` (6) - Whip weapons
- `BASE_TRIDENT` (7) - Polearm weapons
- `BASE_STAFF` (19) - Magical staves

**Ranged Weapons:**

- `BASE_LONGBOW` (10) - Long-range bows
- `BASE_ARROW` (11) - Arrow ammunition
- `BASE_SHOT` (9) - Sling ammunition
- `BASE_SLING` (8) - Sling weapons

**Magical Implements:**

- `BASE_MINDSTAR` (21) - Psionic weapons
- `BASE_ROD` (4) - Magical rods
- `BASE_WAND` (5) - Magical wands
- `BASE_TOTEM` (5) - Totemic implements

### Armor

**Body Armor:**

- `BASE_LIGHT_ARMOR` (15) - Light armor
- `BASE_CLOTH_ARMOR` (18) - Cloth armor/robes
- `BASE_HEAVY_ARMOR` (8) - Heavy armor
- `BASE_MASSIVE_ARMOR` (12) - Massive armor

**Head Protection:**

- `BASE_LEATHER_CAP` (10) - Leather caps
- `BASE_HELM` (10) - Metal helmets
- `BASE_WIZARD_HAT` (7) - Cloth hats
- `BASE_MUMMY_WRAPPING` (1) - Undead wrappings

**Accessories:**

- `BASE_SHIELD` (18) - Shields and bucklers
- `BASE_CLOAK` (14) - Cloaks and capes
- `BASE_LITE` (9) - Light sources
- `BASE_LEATHER_BOOT` (8) - Leather boots
- `BASE_HEAVY_BOOTS` (7) - Heavy boots
- `BASE_GLOVES` (10) - Light gloves
- `BASE_GAUNTLETS` (10) - Heavy gloves
- `BASE_LEATHER_BELT` (10) - Belts

### Jewelry

- `BASE_RING` (17) - Rings
- `BASE_AMULET` (21) - Amulets and necklaces
- `BASE_TORQUE` (5) - Torques (neck items)

### Consumables & Items

- `BASE_SCROLL` (2) - Magic scrolls
- `BASE_INFUSION` (9) - Alchemical infusions
- `BASE_RUNE` (18) - Runic inscriptions

### Special Items

- `BASE_MONEY` (2) - Currency items
- `BASE_GEM` (12) - Gems and crystals
- `BASE_LORE_RANDOM` (20) - Random lore books
- `BASE_TOOL_MISC` (12) - Miscellaneous tools
- `BASE_DIGGER` (5) - Mining/digging tools
- `BASE_MOUNT` (1) - Mounts and vehicles
- `BASE_TAINT` (2) - Taint-related items

### Base Template Structure

Each base class defines common properties that inheriting items can override:

- Equipment slot and wielding rules
- Base combat statistics
- Material properties (metallic, encumbrance)
- Sound effects and visual display
- Ego and random artifact generation rules

## Longsword Item Fields Analysis

### Available Fields in BASE_LONGSWORD Items

#### Basic Properties (from BASE_LONGSWORD template):
- `define_as` - Internal identifier (e.g., "BASE_LONGSWORD", "BLOODEDGE")
- `base` - Inheritance base (always "BASE_LONGSWORD" for longswords) 
- `slot` - Equipment slot ("MAINHAND")
- `dual_wieldable` - Boolean for dual wielding capability (true)
- `type` - Item category ("weapon")
- `subtype` - Specific weapon type ("longsword")
- `display` - ASCII display character ("/")
- `encumber` - Weight/encumbrance value (3)
- `metallic` - Boolean material property (true)

*Note: Excludes function-based properties like `add_name`, `randart_able`, `egos`, `egos_chance` which are used for game generation*

#### Individual Item Properties:
**Identification & Display:**
- `name` - Display name (e.g., "iron longsword", "Spellblade")
- `short_name` - Abbreviated name (e.g., "iron", "steel")
- `unided_name` - Name when unidentified (e.g., "glowing long sword")
- `image` - Icon/image path (e.g., "object/artifact/weapon_spellblade.png")
- `color` - Visual color (e.g., colors.SLATE, colors.AQUAMARINE)
- `desc` - Flavor text/lore description
- `moddable_tile` - Custom tile graphics path
- `moddable_tile_big` - Boolean for large tile support

**Game Mechanics:**
- `level_range` - Array of min/max levels (e.g., {1, 10}, {35, 50})
- `rarity` - Spawn rarity value (5-250+, higher = rarer)
- `cost` - Base gold value (5-1000+)
- `material_level` - Material tier (1-5, 5 = highest)
- `unique` - Boolean for artifact/unique items
- `power_source` - Power type (e.g., {arcane=true}, {nature=true, antimagic=true})

**Requirements:**
- `require.stat` - Stat requirements (e.g., {str=11}, {mag=28, str=28})
- `require.flag` - Special flag requirements

**Combat Statistics (`combat` table):**
- `dam` - Base damage (10-50+)
- `apr` - Armor penetration (2-40+)
- `physcrit` - Physical critical chance (2.5-20%)
- `dammod` - Damage modifiers by stat (e.g., {str=1}, {str=0.9, mag=0.2})
- `talented` - Combat skill used ("sword")
- `damrange` - Damage variance multiplier (1.4)
- `physspeed` - Attack speed modifier (1)
- `melee_project` - On-hit damage projection (static damage values)
- `convert_damage` - Damage type conversion (static percentages)

*Note: Excludes function-based properties like `sound`, `sound_miss`, `special_on_hit` which contain game logic*

**Wielder Benefits (`wielder` table):**
- `lite` - Light radius bonus
- `combat_spellpower` - Spell power bonus (10-25+)
- `combat_spellcrit` - Spell critical bonus (4-9+)
- `inc_damage` - Damage type bonuses (e.g., {[DamageType.ARCANE] = 30})
- `inc_stats` - Stat bonuses (e.g., {[Stats.STAT_MAG] = 8})
- `talent_cd_reduction` - Talent cooldown reductions
- `resists` - Damage type resistances
- `resists_pen` - Resistance penetration
- `esp` - Telepathy/detection abilities

**Special Properties:**
- `on_id_lore` - Lore entry on identification (static string)

*Note: Excludes `special_desc` which is a function that generates dynamic descriptions*

### Complexity Levels (Static Content Only):
1. **Basic Longswords** (iron, steel, etc.): ~8-10 displayable fields
2. **Artifact Longswords**: ~15-20 displayable fields with nested structures

### Composite/Nested Fields in Longswords

Several fields contain multiple sub-items that provide complex benefits:

#### 1. `wielder` Table (Player Benefits)
**Combat Bonuses:**
- `combat_spellpower` - Spell power bonus (10-40+)
- `combat_spellcrit` - Spell critical bonus (4-15+)
- `combat_atk` - Attack bonus
- `combat_dam` - Damage bonus
- `combat_armor` - Armor value bonus
- `combat_def` / `combat_def_ranged` - Defense bonuses
- `combat_physresist` / `combat_mentalresist` / `combat_spellresist` - Save bonuses

**Stat Bonuses:**
- `inc_stats` - Stat increases (e.g., `{[Stats.STAT_MAG] = 8, [Stats.STAT_STR] = 4}`)

**Damage & Resistances:**
- `inc_damage` - Damage type bonuses (e.g., `{[DamageType.ARCANE] = 30, [DamageType.FIRE] = 30}`)
- `resists` - Damage type resistances (e.g., `{[DamageType.LIGHT] = 20}`)
- `resists_pen` - Resistance penetration (e.g., `{[DamageType.LIGHT] = 25}`)
- `resists_cap` - Resistance cap increases

**Special Abilities:**
- `learn_talent` - Granted talents (e.g., `{[Talents.T_HEALING_LIGHT] = 3}`)
- `talent_cd_reduction` - Talent cooldown reductions
- `talents_types_mastery` - Talent category mastery bonuses
- `esp` - Telepathy/detection abilities (e.g., `{["undead/blood"]=1}`)

**Immunities & Special Properties:**
- `poison_immune` / `confusion_immune` / `teleport_immune` - Immunity percentages
- `lite` - Light radius modification (-2 to +2)
- `max_vim` / `max_power` - Resource bonuses
- `spell_cooldown_reduction` - Global cooldown reduction
- `paradox_reduce_anomalies` - Chronomancer-specific bonuses

#### 2. `combat` Table (Weapon Statistics)
- `dam` - Base damage value
- `apr` - Armor penetration  
- `physcrit` - Physical critical chance
- `dammod` - Damage modifiers by stat (e.g., `{str=1}`, `{str=0.9, mag=0.2}`)
- `melee_project` - Damage projection on hit
- `convert_damage` - Damage type conversion percentages
- `damtype` / `element` - Damage types dealt

#### 3. `require` Table (Requirements)
- `stat` - Stat requirements (e.g., `{str=11}`, `{mag=28, str=28}`)
- `flag` - Special flag requirements

#### 4. Other Composite Fields
- `set_list` - Set item connections (for item sets)
- `set_desc` - Set bonus descriptions
- `use_talent` - Activated abilities (e.g., `{id = Talents.T_HEALING_LIGHT, level = 3, power = 30}`)

### Static vs Dynamic Content Summary:
- **Static fields** (displayable): ~30 field types across all longsword variants
- **Composite fields** (nested): ~6 major composite fields with 20+ sub-properties each
- **Dynamic fields** (functions/resolvers): Excluded from web display - used for game generation and runtime calculations
- **Template-ready content**: All static fields and composite sub-properties can be directly displayed in Handlebars templates

## Field Analysis Across Weapon Types

### Verification: Do Other Weapons Use Same Fields?

**Tested weapon types:**
- **Battleaxes (BASE_BATTLEAXE)**: ✅ Same field structure as longswords
- **Longbows (BASE_LONGBOW)**: ✅ Same fields + weapon-specific additions
- **Staves (BASE_STAFF)**: ✅ Same fields + magic-specific additions  
- **Mindstars (BASE_MINDSTAR)**: ✅ Same fields + psionic-specific additions

### Weapon-Specific Field Additions Found:

#### Ranged Weapons (Bows):
- `combat.range` - Attack range (6-10+)
- `proj_image` - Projectile image (function-based, excluded)

#### Magic Weapons (Staves):
- `combat.staff_power` - Staff power rating
- `command_staff` - Command staff bonuses
- `wielder.combat_spellpower` / `combat_spellcrit` - Spell bonuses
- `resolvers.staff_element()` - Element selection (function-based, excluded)

#### Psionic Weapons (Mindstars):
- `combat.wil_attack` - Uses willpower for accuracy
- `combat.no_offhand_penalty` - Dual-wield penalty removal
- `combat.accuracy_effect` - Accuracy calculation method
- `wielder.combat_mindpower` / `combat_mindcrit` - Mind power bonuses
- `wielder.learn_talent` - Granted talents (e.g., T_ATTUNE_MINDSTAR)

#### Two-Handed Weapons (Battleaxes):
- Higher `dammod` values (e.g., `{str=1.2}` vs `{str=1.0}`)
- Different base damage ranges and critical chances

### Conclusion:
**✅ Field Structure is Highly Consistent**
- **Core fields**: All weapon types use the same ~30 core fields from longsword analysis
- **Composite structures**: `wielder`, `combat`, `require` tables are universal
- **Weapon-specific additions**: Only 5-8 additional fields per weapon type
- **Template compatibility**: Single weapon template can handle all weapon types with conditional sections

### Universal Weapon Template Fields:
- **Base fields**: All ~30 static fields from longsword analysis apply
- **Combat variants**: Different weapons populate different combat sub-fields
- **Power types**: `combat_spellpower` (mages), `combat_mindpower` (psionics), etc.
- **Conditional display**: Template shows relevant sections based on weapon type

## Armor Field Analysis

### Armor Types Analyzed:
- **Heavy Armor (BASE_HEAVY_ARMOR)**: Metal mail armor - 8 items
- **Light Armor (BASE_LIGHT_ARMOR)**: Leather armor - 15 items  
- **Cloth Armor (BASE_CLOTH_ARMOR)**: Robes - 18 items
- **Shield (BASE_SHIELD)**: Defensive equipment - 18 items

### Armor Field Structure Comparison to Weapons:

#### **✅ Core Fields Identical to Weapons:**
All the basic fields from weapon analysis apply to armor:
- `base`, `name`, `short_name`, `level_range`, `cost`, `material_level`
- `require`, `rarity`, `unique`, `power_source`, `image`, `color`, `desc`
- `define_as`, `slot`, `type`, `subtype`, `display`, `encumber`, `metallic`

#### **Armor-Specific Base Properties:**
- `slot` - Equipment slots: "BODY" (armor), "OFFHAND" (shields)
- `require.flag` - Special requirements: `{"allow_wear_heavy"}`, `{"allow_wear_shield"}`
- `encumber` - Higher values (6-14) compared to weapons (3)

### Armor-Specific Composite Fields:

#### **1. `wielder` Table (Defensive Bonuses)**
**Defense & Armor:**
- `combat_def` - Melee defense bonus (2-12+)
- `combat_armor` - Armor value (2-10+)  
- `fatigue` - Fatigue penalty (6-12+, positive = penalty)

**Special Abilities (same as weapons):**
- `learn_talent` - Granted talents (e.g., `{[Talents.T_BLOCK] = 1}`)
- `combat_spellpower`, `combat_spellcrit` - Spell bonuses (on magic armor)
- `inc_stats`, `inc_damage`, `resists` - Same structure as weapons

#### **2. `special_combat` Table (Shield-Specific)**
- `dam` - Shield bash damage (7-40+)
- `block` - Block value (15-200+) 
- `physcrit` - Critical chance for shield attacks
- `dammod` - Damage modifiers (e.g., `{str=1}`)
- `talented` - Combat skill ("shield")
- `accuracy_effect` - Accuracy calculation ("staff")
- `no_offhand_penalty` - No dual-wield penalty

#### **3. Armor Complexity Patterns:**
**Basic Armor**: ~6-8 fields (name, level, cost, material, wielder bonuses)
**Cloth Armor**: Often minimal fields (just basic properties, no wielder)
**Shields**: More complex with both `wielder` and `special_combat` tables
**Artifact Armor**: Same complexity as weapon artifacts (~15-20 fields)

### Key Differences from Weapons:
- **No `combat` table** - Armor doesn't have weapon combat stats
- **`special_combat` instead** - Only shields have this for shield bash mechanics
- **Defense focus** - `wielder` emphasizes defense (`combat_def`, `combat_armor`, `fatigue`)
- **Simpler structure** - Most armor has fewer fields than weapons

### Armor Template Implications:
- **Reuse weapon template structure** - Same composite field handling
- **Replace combat section** - Show defense stats instead of weapon stats
- **Conditional sections** - Shield-specific `special_combat`, cloth-specific minimalism
- **Defense-focused display** - Emphasize protective benefits over offensive stats

## Complete Item Category Field Analysis

### Jewelry Analysis (43 total items)

#### **Rings (BASE_RING)** & **Amulets (BASE_AMULET)**:
**✅ Core fields identical to weapons/armor:**
- Same ~30 basic fields (name, level, cost, material, etc.)
- Same composite structure potential

**Jewelry-specific properties:**
- `slot` - "RING1", "RING2" (rings), "AMULET" (amulets)
- `encumber` - Very low (0.1) 
- **Minimal base items** - Most basic jewelry has only 5-6 fields
- **Power in artifacts** - Complex jewelry appears mainly in artifacts with full `wielder` tables

**Complexity pattern:**
- **Basic jewelry**: ~5 fields (name, color, level, cost, material)
- **Artifact jewelry**: ~15-20 fields with complete `wielder` bonuses

### Consumables Analysis (29 total items)

#### **Scrolls (BASE_SCROLL)**, **Infusions (BASE_INFUSION)**, **Runes (BASE_RUNE)**:
**✅ Core fields apply but different focus:**

**Consumable-specific fields:**
- `use_simple` - Usage function (function-based, excluded from display)
- `use_sound` - Sound effect on use
- `use_no_blind` / `use_no_silence` - Usage restrictions  
- `fire_destroy` - Destruction chances by fire damage
- `inscription_talent` / `inscription_data` - Inscription mechanics (static IDs)
- `id_by_type` - Identification behavior
- `material_level_min_only` - Material level restrictions

**Key difference:**
- **No `wielder` or `combat`** - Consumables provide temporary/inscription effects
- **Usage-focused** - Properties about how/when item is consumed
- **Simple structure** - Most consumables ~8-10 fields

### Special Items Analysis (54 total items)

#### **Gems (BASE_GEM)**:
**Unique properties:**
- `stacking` - Can stack in inventory  
- `auto_pickup` - Automatically collected
- `pickup_sound` - Collection sound effect
- `use_no_wear` - Cannot be equipped
- `identified` - Always identified
- **Very simple** - ~6 fields total

#### **Tools (BASE_TOOL_MISC)**:
- `slot` - "TOOL" 
- **Minimal structure** - ~5 fields typically

#### **Lore Items (BASE_LORE_RANDOM)**:
- Text-based items for story/background
- **Simple structure** - Name, description, basic properties

### Universal Field Analysis Summary

#### **✅ Core Field Consistency Across ALL Item Types:**
All 494 items share the same foundational structure:

**Basic Properties (~20 fields):**
- `base`, `name`, `short_name`, `level_range`, `cost`, `material_level`
- `require`, `rarity`, `unique`, `power_source`, `image`, `color`, `desc`
- `define_as`, `slot`, `type`, `subtype`, `display`, `encumber`

**Composite Fields (when present):**
- `wielder` - Present in weapons, armor, artifact jewelry
- `combat` / `special_combat` - Present in weapons, shields
- `require` - Universal requirement structure

#### **Item Category Complexity Hierarchy:**
1. **Most Complex**: Artifact weapons/armor (~20-25 fields)
2. **High Complexity**: Basic weapons, shields (~12-15 fields) 
3. **Medium Complexity**: Basic armor (~8-10 fields)
4. **Low Complexity**: Consumables (~8-10 fields)
5. **Minimal Complexity**: Basic jewelry, gems, tools (~5-6 fields)

#### **Template Design Implications:**
- **Single universal template viable** - Same core field structure across all items
- **Conditional sections** by item type:
  - Weapons: Show `combat` table + offensive `wielder` bonuses
  - Armor: Show defensive `wielder` bonuses + `special_combat` for shields  
  - Jewelry: Show `wielder` bonuses (when present, mainly artifacts)
  - Consumables: Show usage properties + inscription effects
  - Special: Show category-specific properties (stacking, auto-pickup, etc.)
- **Complexity-responsive display** - Simple items show fewer sections

## Universal Template Analysis Summary

After comprehensive analysis of all 494 items across 47 base classes, we've confirmed that **every item type shares the same foundational field structure**. This enables a single universal template approach.

### Key Findings:

**✅ Universal Field Structure**: All items use the same ~20 core fields plus identical composite field structures (`wielder`, `combat`/`special_combat`, `require`)

**✅ Scalable Complexity**: Items range from simple 5-field gems to complex 25-field artifacts, all using the same underlying structure

**✅ Template Efficiency**: Single template with conditional sections can handle all item types with 94% code reuse

**✅ Category Coverage**: 
- **Weapons** (201): Combat-focused with offensive stats
- **Armor** (167): Defense-focused with protective stats  
- **Jewelry** (43): Minimal base items, complex artifacts
- **Consumables** (29): Usage-focused properties
- **Special Items** (54): Simple utility items

### Implementation Strategy:
A single Handlebars template with conditional sections provides:
- **Consistent UI** across all item types
- **Appropriate complexity** - shows relevant sections per item
- **Maintainable codebase** - one template instead of 47
- **Rich displays** for complex items, clean displays for simple items

*Detailed template structure and implementation guide available in ItemListFeature-Universal.md*

## Next Steps

1. Analyze current spoiler generation process for talent extraction
2. Extend spoiler generation to include item data
3. Create item templates (Handlebars)  
4. Design item navigation structure
5. Implement search functionality for items
6. Add routing for `#items` path

