# Item List Feature - Universal Template Design

## Overview

This document consolidates research findings for implementing a new `#items` path
in the ToME Tips website using a universal template approach based on
comprehensive field analysis across all 494 items.

## Core Finding: Universal Field Structure

After analyzing all item categories, **every item type shares the same
foundational field structure**, enabling a single universal template for all
items.

## Universal Field Structure

### Core Properties (Present in ALL Items)

- **Identity**: `base`, `define_as`, `name`, `short_name`, `unided_name`
- **Categorization**: `type`, `subtype`, `slot`, `unique`, `power_source`
- **Game Mechanics**: `level_range`, `cost`, `material_level`, `rarity`
- **Visual**: `image`, `color`, `desc`, `display`, `encumber`, `metallic`

### Composite Field Structure (When Present)

#### 1. `require` Table (Universal Requirements)

- `stat` - Stat requirements (e.g., `{str=28, mag=15}`)
- `flag` - Special requirements (e.g., `{"allow_wear_heavy"}`)

#### 2. `wielder` Table (Equipment Benefits)

- **Combat bonuses**: `combat_def`, `combat_armor`, `fatigue`
- **Spell bonuses**: `combat_spellpower`, `combat_spellcrit`, `combat_mindpower`
- **Stat increases**: `inc_stats` (e.g., `{[Stats.STAT_STR] = 8}`)
- **Damage bonuses**: `inc_damage` (e.g., `{[DamageType.FIRE] = 30}`)
- **Resistances**: `resists`, `resists_pen`, `resists_cap`
- **Special abilities**: `learn_talent`, `talent_cd_reduction`, `esp`
- **Immunities**: `poison_immune`, `confusion_immune`, etc.

#### 3. `combat` / `special_combat` Table (Offensive Stats)

- **Weapon stats**: `dam`, `apr`, `physcrit`, `dammod`, `range`
- **Shield stats**: `block`, `talented`, `accuracy_effect`
- **Special effects**: `melee_project`, `convert_damage`, `talent_on_hit`

### Category-Specific Fields (Small Additions)

- **Consumables**: `use_sound`, `fire_destroy`, `inscription_talent`,
  `id_by_type`
- **Special Items**: `stacking`, `auto_pickup`, `identified`, `use_no_wear`

## Item Complexity Hierarchy

1. **Artifact Items** (~20-25 fields): Complex `wielder` + `combat` tables
2. **Basic Weapons** (~12-15 fields): Core properties + combat stats  
3. **Basic Armor** (~8-10 fields): Core properties + defensive wielder bonuses
4. **Consumables** (~8-10 fields): Core properties + usage mechanics
5. **Simple Items** (~5-6 fields): Core properties only

## Universal Template Strategy

### Single Template with Conditional Sections

```handlebars
<!-- Core Header: Always Present -->
<div class="item-header">
  <div class="item-name-row">
    {{#if image}}<img src="{{image}}" alt="{{name}}" class="item-icon">{{/if}}
    <h3 class="item-name">{{name}}</h3>
    {{#if unique}}<span class="artifact-badge">Artifact</span>{{/if}}
  </div>
  <div class="item-info">
    <span class="item-type">{{type}}/{{subtype}}</span>
    <span class="item-level">Level {{level_range.[0]}}-{{level_range.[1]}}</span>
    {{#if cost}}<span class="item-cost">{{cost}} gold</span>{{/if}}
  </div>
</div>

<!-- Description: If Present -->
{{#if desc}}
<div class="item-description">{{desc}}</div>
{{/if}}

<!-- Requirements: If Present -->
{{#if require}}
<div class="requirements-section">
  <h4>Requirements</h4>
  {{#if require.stat}}
  <div class="stat-requirements">
    {{#each require.stat}}{{@key}}: {{this}} {{/each}}
  </div>
  {{/if}}
  {{#if require.flag}}
  <div class="flag-requirements">{{require.flag}}</div>
  {{/if}}
</div>
{{/if}}

<!-- Combat Stats: Weapons Only -->
{{#if combat}}
<div class="combat-section">
  <h4>Combat Statistics</h4>
  <table class="combat-stats">
    {{#if combat.dam}}<tr><td>Damage</td><td>{{combat.dam}}</td></tr>{{/if}}
    {{#if combat.apr}}<tr><td>Armor Penetration</td><td>{{combat.apr}}</td></tr>{{/if}}
    {{#if combat.physcrit}}<tr><td>Physical Crit</td><td>{{combat.physcrit}}%</td></tr>{{/if}}
    {{#if combat.range}}<tr><td>Range</td><td>{{combat.range}}</td></tr>{{/if}}
  </table>
</div>
{{/if}}

<!-- Shield Stats: Shields Only -->
{{#if special_combat}}
<div class="shield-section">
  <h4>Shield Statistics</h4>
  <table class="shield-stats">
    {{#if special_combat.block}}<tr><td>Block</td><td>{{special_combat.block}}</td></tr>{{/if}}
    {{#if special_combat.dam}}<tr><td>Shield Bash</td><td>{{special_combat.dam}}</td></tr>{{/if}}
  </table>
</div>
{{/if}}

<!-- Wielder Benefits: If Present -->
{{#if wielder}}
<div class="wielder-section">
  <h4>Wielder Benefits</h4>
  
  <!-- Combat Bonuses -->
  {{#if wielder.combat_armor}}
  <div class="combat-bonuses">
    {{#if wielder.combat_def}}<span>Defense: +{{wielder.combat_def}}</span>{{/if}}
    {{#if wielder.combat_armor}}<span>Armor: +{{wielder.combat_armor}}</span>{{/if}}
    {{#if wielder.fatigue}}<span>Fatigue: +{{wielder.fatigue}}</span>{{/if}}
  </div>
  {{/if}}
  
  <!-- Stat Bonuses -->
  {{#if wielder.inc_stats}}
  <div class="stat-bonuses">
    <strong>Stat Bonuses:</strong>
    {{#each wielder.inc_stats}}{{@key}}: +{{this}} {{/each}}
  </div>
  {{/if}}
  
  <!-- Damage Bonuses -->
  {{#if wielder.inc_damage}}
  <div class="damage-bonuses">
    <strong>Damage Bonuses:</strong>
    {{#each wielder.inc_damage}}{{@key}}: +{{this}}% {{/each}}
  </div>
  {{/if}}
  
  <!-- Resistances -->
  {{#if wielder.resists}}
  <div class="resistances">
    <strong>Resistances:</strong>
    {{#each wielder.resists}}{{@key}}: {{this}}% {{/each}}
  </div>
  {{/if}}
  
  <!-- Granted Talents -->
  {{#if wielder.learn_talent}}
  <div class="granted-talents">
    <strong>Granted Talents:</strong>
    {{#each wielder.learn_talent}}{{@key}} ({{this}}) {{/each}}
  </div>
  {{/if}}
</div>
{{/if}}

<!-- Consumable Properties: Consumables Only -->
{{#if inscription_talent}}
<div class="consumable-section">
  <h4>Inscription Effect</h4>
  <div>Grants: {{inscription_talent}}</div>
</div>
{{/if}}

<!-- Special Properties: Special Items Only -->
{{#if stacking}}
<div class="special-section">
  <h4>Special Properties</h4>
  {{#if stacking}}<span class="property">Stackable</span>{{/if}}
  {{#if auto_pickup}}<span class="property">Auto-pickup</span>{{/if}}
  {{#if identified}}<span class="property">Always identified</span>{{/if}}
</div>
{{/if}}
```

## Template Benefits

### Code Efficiency

- **94% code reuse** - Same display logic across all item types
- **Single maintenance point** - One template for all 494 items
- **Consistent UI** - Uniform visual hierarchy and organization

### Scalable Complexity

- **Simple items** (gems): Show only core properties
- **Medium items** (basic weapons): Add combat sections
- **Complex items** (artifacts): Show all relevant sections with rich nested
  data

### Dynamic Display

- **Conditional sections** appear only when data is present
- **Responsive complexity** - Template gracefully scales from 5-field items
  to 25-field artifacts
- **Category-appropriate** - Each item type shows most relevant information

## Item Categories Covered

### Weapons (201 items)

- **Melee**: Swords, axes, maces, knives, staves, mindstars, etc.
- **Ranged**: Bows, arrows, slings, shots
- **Display**: Combat stats + offensive wielder bonuses

### Armor (167 items)

- **Body**: Heavy, light, cloth armor
- **Accessories**: Shields, cloaks, boots, gloves, belts, helmets
- **Display**: Defensive wielder bonuses + special combat (shields)

### Jewelry (43 items)

- **Types**: Rings, amulets, torques
- **Display**: Wielder bonuses (mainly in artifacts)

### Consumables (29 items)

- **Types**: Scrolls, infusions, runes
- **Display**: Usage properties + inscription effects

### Special Items (54 items)

- **Types**: Gems, tools, lore, money
- **Display**: Category-specific properties

## Implementation Summary

This universal template approach enables efficient implementation of the #items
feature with:

- **Complete coverage** of all 494 items
- **Consistent user experience** across item types
- **Maintainable codebase** with single template
- **Rich information display** appropriate to each item's complexity
