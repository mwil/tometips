# Doombringer Talent Analyzer - Technical Documentation

## Overview

A React-based interactive talent analyzer for the Doombringer class in Tales of Maj'Eyal (ToME), featuring dynamic tier calculation, search functionality, and point allocation tracking.

## Data Parsing and Structure

### Input Data Format

The original data was provided in a hierarchical text format:
```
[[ Tree Name ]] (avg by X of Y players: Z/20x skill points)
  0        1        2        3        4        5
  X%       X%       X%       X%       X%       X%:  Skill Name
```

### Data Transformation Process

#### 1. Creating Talent Entries

We created a helper function `createTalentEntry` to standardize data conversion:

```javascript
const createTalentEntry = (tree, skill, p0, p1, p2, p3, p4, p5, players, category) => {
  const investmentRate = 100 - p0; // Calculate investment rate
  return { tree, skill, p0, p1, p2, p3, p4, p5, players, category, investmentRate, tier: 1 };
};
```

**Key fields:**

- `p0` through `p5`: Percentage of players investing 0-5 points
- `investmentRate`: Percentage of players who invested at least 1 point (100 - p0)
- `category`: Either "Class" or "Generic"
- `tier`: Dynamically calculated based on investment rates within each tree

#### 2. Data Organization

Talents were organized into two main categories:

- **Class Talents**: Tree-specific abilities (Corruption, Technique trees)
- **Generic Talents**: Available to multiple classes (Combat Training, racial abilities)

## Page Structure

### Component Architecture

```
TalentAnalyzer
├── Header Section
│   ├── Title & Description
│   └── Dark Mode Toggle
├── Control Panel
│   ├── Category Filters (All/Class/Generic)
│   ├── Search Box
│   └── Point Counters (Class/Generic)
└── Data Table
    ├── Table Headers
    └── Talent Rows with Heat Map Cells
```

### Visual Design Elements

#### 1. Heat Map Visualization

- Each cell's background color intensity represents the percentage of players choosing that point value
- Formula: `backgroundColor: rgba(255, 165, 0, ${value/100})`
- Higher percentages appear more orange/opaque

#### 2. Tier System Color Coding

- **Tier 1** (Green): Base skills, highest investment rate
- **Tier 2** (Blue): Early progression
- **Tier 3** (Yellow): Mid-game choices
- **Tier 4** (Orange): Late-game options

#### 3. Tree Identification

Each talent tree has a unique color badge for quick visual identification.

## Feature Implementation Timeline

### 1. Initial Setup (Annihilator → Doombringer Conversion)

- Parsed the raw text data into structured JavaScript objects
- Created the basic table layout with heat map visualization
- Implemented category filtering (All/Class/Generic)

### 2. Tier Calculation System

**Challenge**: Determine unlock order based on investment rates

**Solution**:

```javascript
// For each tree:
// 1. Get unique investment rates, sorted descending
const uniqueRates = [...new Set(treeTalents.map(t => t.investmentRate))].sort((a, b) => b - a);

// 2. Assign tiers based on rank (max tier = 4)
uniqueRates.forEach((rate, index) => {
  const tier = Math.min(index + 1, 4);
  // Assign to all talents with this rate
});
```

**Special Cases**:

- Trees like "Technique/Combat Training" don't use tiers (all skills tier 1)
- Racial and undead trees are also tier-agnostic

### 3. Dynamic Sorting

**Evolution of sorting logic**:

1. Started with dropdown menu (Players/Tier/Investment)
2. Simplified to fixed hierarchical sort: Players → Tree → Tier
3. Removed dropdown entirely for cleaner UX

**Current Sort Order**:

```javascript
data.sort((a, b) => {
  // 1. By player count (descending)
  const playerCompare = b.players - a.players;
  if (playerCompare !== 0) return playerCompare;
  
  // 2. By tree name (alphabetical)
  const treeCompare = a.tree.localeCompare(b.tree);
  if (treeCompare !== 0) return treeCompare;
  
  // 3. By tier (ascending)
  const tierCompare = a.tier - b.tier;
  if (tierCompare !== 0) return tierCompare;
  
  // 4. By investment rate (descending)
  return b.investmentRate - a.investmentRate;
});
```

### 4. Point Allocation Tracking

**Feature**: Click cells to track character build planning

**Implementation**:

- Used React state with Set to track selected cells
- Cell ID format: `${skillName}-${points}`
- Visual indicator: Blue border on selected cells
- Automatic sum calculation for Class and Generic points

### 5. Search Functionality

**Latest Addition**: Filter talents by name or tree

**Implementation Details**:

```javascript
if (searchTerm.trim()) {
  const lowerSearch = searchTerm.toLowerCase().trim();
  data = data.filter(item => 
    item.skill.toLowerCase().includes(lowerSearch) ||
    item.tree.toLowerCase().includes(lowerSearch)
  );
}
```

**Features**:

- Case-insensitive search

- Searches both skill names and tree names
- Shows "No results" message when no matches
- Updates subtitle to show active search

### 6. Dark Mode

- Toggle between light and dark themes
- Preserves readability in heat map cells
- Consistent color scheme across all UI elements

## Key Design Decisions

### 1. Investment Rate as Primary Metric

We chose `100 - p0` as the investment rate because it represents the percentage
of players who found a skill worth at least one point, making it the best
indicator of skill popularity and unlock priority.

### 2. Tier Capping at 4

Based on the game's typical progression, we capped tiers at 4 to match the
standard unlock phases in ToME talent trees.

### 3. Fixed Sorting vs. Flexible Options

We removed the sort dropdown after realizing users primarily wanted to see:

1. Most popular trees first (by player count)
2. Logical unlock progression within trees (by tier)

This fixed hierarchy provides the most useful default view.

### 4. Heat Map Over Numbers

While the percentage numbers are displayed, the color-coding provides immediate
visual feedback about popular point investments, making patterns easier to
identify at a glance.

## Technical Stack

- **React**: Component-based UI
- **Tailwind CSS**: Utility-first styling
- **useMemo**: Performance optimization for data filtering and sorting
- **useState**: State management for filters, search, and selection

## Future Enhancement Possibilities

- Export builds as shareable links or codes

- Import actual character files for comparison
- Statistical analysis of optimal builds
- Tooltip information about each talent
- Build templates from high-performing players
