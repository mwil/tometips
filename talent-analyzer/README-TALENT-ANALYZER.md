# Talent Analyzer - Automated Build System

This document describes the automated build system for the talent analyzer feature, which extracts talent icons from ToME game data and integrates them into a Next.js application.

## Prerequisites

- Node.js and npm installed
- Python 3 installed
- jq installed (optional, for statistics)
- Tales of Maj'Eyal game data files in `html/data/1.7.6/`

## Available Commands

### Main Project Commands (from project root)

These commands are run from the main project directory (`/Users/mwil/src/mwil/tometips/`):

### Core Commands

#### `make talent-icons`
Extracts talent icons from all game data files and updates the React component.
- Creates `extract_talent_icons.js` extraction script
- Generates `talent_icon_mapping.ts` with 513+ talent mappings
- Updates the React component at `talent-analyzer/app/page.tsx`

```bash
make talent-icons
```

#### `make talent-build`
Builds the talent analyzer Next.js application for production.
- Automatically runs `talent-icons` first
- Builds optimized production bundle

```bash
make talent-build
```

#### `make talent-dev`
Starts the development server for the talent analyzer.
- Automatically runs `talent-icons` first
- Launches Next.js dev server on port 3000

```bash
make talent-dev
```

### Local Commands (from talent-analyzer directory)

For convenience, you can also run commands directly from within the `talent-analyzer/` directory:

#### `make dev`
Start the development server (equivalent to `npm run dev`).

#### `make build` 
Build for production (equivalent to `npm run build`).

#### `make extract-icons`
Extract talent icons and update the component (standalone operation).

#### `make quick`
Extract icons and start development server in one command.

#### `make help`
Show local command help.

### Setup Commands

#### `make talent-install`
Installs all required Node.js dependencies for the talent analyzer.

```bash
make talent-install
```

#### `make talent-validate`
Validates that all required talent data files exist.

```bash
make talent-validate
```

### Utility Commands

#### `make talent-stats`
Shows statistics about the talent data files.

```bash
make talent-stats
```

Example output:
```
📊 Talent Data Statistics:
=========================
talents.corruption-1.1.json: 45 talents
talents.technique-1.2.json: 78 talents
talents.cunning-1.1.json: 92 talents
talents.race-1.1.json: 156 talents
talents.undead-1.5.json: 142 talents
=========================
Total: 513 talents across all files
```

#### `make talent-clean`
Removes generated files and build artifacts.

```bash
make talent-clean
```

## Typical Workflow

### First Time Setup
```bash
# Install dependencies
make talent-install

# Validate data files exist
make talent-validate

# Extract talent icons and build
make talent-build
```

### Development Workflow
```bash
# Start development server
make talent-dev
```

### Production Build
```bash
# Build for production
make talent-build
```

### After Game Data Updates
```bash
# Re-extract talent icons and rebuild
make talent-icons
make talent-build
```

## File Structure

The talent analyzer files are organized within the `talent-analyzer/` directory:

```
talent-analyzer/
├── extract_all_talent_icons.js    # Main extraction script
├── update_talent_component.py     # Component update script
├── talent_icon_mapping.ts         # Generated TypeScript mapping
├── README-TALENT-ANALYZER.md      # This documentation
├── Makefile                       # Local operations
├── app/
│   └── page.tsx                   # React component
└── ...                           # Standard Next.js structure

../html/data/1.7.6/               # Game data files (in project root)
├── talents.corruption-1.1.json
├── talents.technique-1.2.json
├── talents.cunning-1.1.json
├── talents.race-1.1.json
└── talents.undead-1.5.json
```

## Data Sources

The system extracts talent icons from these game data files:

- **Corruption Talents** (`talents.corruption-1.1.json`)
- **Technique Talents** (`talents.technique-1.2.json`) 
- **Cunning Talents** (`talents.cunning-1.1.json`)
- **Race Talents** (`talents.race-1.1.json`) - Includes Ogre, Doomelf, Dwarf, Halfling talents
- **Undead Talents** (`talents.undead-1.5.json`) - Includes Ghoul, Skeleton, Lich talents

## Generated TypeScript Mapping

The extraction process creates a comprehensive mapping file:

```typescript
// talent_icon_mapping.ts
export const TALENT_ICON_MAP: Record<string, string> = {
  'Abduction': 'abduction.png',
  'Ogric Wrath': 'ogre_wrath.png',
  'Grisly Constitution': 'grisly_constitution.png',
  // ... 510+ more mappings
  'Writ Large': 'writ_large.png',
};
```

## Integration with React Component

The automation automatically updates the React component's `TALENT_ICON_MAP` constant, ensuring:

- ✅ All 513+ talent icons are available
- ✅ No duplicate entries (prevents TypeScript errors)
- ✅ Alphabetically sorted for easy maintenance
- ✅ Includes all race-specific talents (Ogre, Doomelf, etc.)
- ✅ Includes all undead talents (Ghoul, Skeleton, etc.)

## Troubleshooting

### Missing Data Files
If you see "❌ Missing: html/data/1.7.6/talents.*.json", ensure you have run the main data extraction:

```bash
make json  # Extract all game data
```

### Build Failures
Clean and rebuild:

```bash
make talent-clean
make talent-icons
make talent-build
```

### Component Not Found
Ensure the talent-analyzer Next.js app exists:

```bash
ls talent-analyzer/app/page.tsx
```

## Benefits of Automation

1. **Consistency**: Guaranteed to include all talent categories
2. **Accuracy**: Eliminates manual errors and duplicate entries  
3. **Maintainability**: Easy to update when game data changes
4. **Reproducibility**: Anyone can recreate the exact same build
5. **Integration**: Seamlessly works with existing ToME Tips build system