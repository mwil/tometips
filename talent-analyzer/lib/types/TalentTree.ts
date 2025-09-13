/**
 * Talent tree and classification types
 */

/**
 * All possible talent tree names in the game
 */
export type TalentTreeName = 
  // Corruption trees
  | 'Corruption / Brutality'
  | 'Corruption / Torture' 
  | 'Corruption / Shadowflame'
  | 'Corruption / Heart of Fire'
  | 'Corruption / Wrath'
  | 'Corruption / Fearfire'
  | 'Corruption / Demonic strength'
  | 'Corruption / Oppression'
  | 'Corruption / Hexes'
  // Technique trees
  | 'Technique / Combat techniques'
  | 'Technique / Combat veteran'
  | 'Technique / Combat training'
  // Cunning trees
  | 'Cunning / Survival'
  // Race trees
  | 'Race / Ogre'
  | 'Race / Doomelf'
  | 'Race / Halfling'
  | 'Race / Yeek'
  | 'Race / Drem'
  | 'Race / Dwarf'
  // Undead trees
  | 'Undead / Ghoul'
  | 'Undead / Skeleton';

/**
 * Tree category groupings for the main talent domains
 */
export type TreeDomain = 'Corruption' | 'Technique' | 'Cunning' | 'Race' | 'Undead';

/**
 * Tree color mapping for UI display
 */
export type TreeColorMap = Record<TalentTreeName, string>;

/**
 * Trees that use investment-rate-based tier calculation instead of game data
 */
export type InvestmentBasedTrees = readonly TalentTreeName[];

/**
 * Filter options for the tree selector
 */
export type TreeFilter = 'all' | 'class' | 'generic' | TalentTreeName;

/**
 * UI state for tree and category filtering
 */
export interface FilterState {
  /** Current tree/category filter */
  selectedTree: TreeFilter;
  /** Search term for talent names */
  searchTerm: string;
}

/**
 * Tree classification configuration
 */
export interface TreeConfig {
  /** Tree display name */
  name: TalentTreeName;
  /** Hex color for UI display */
  color: string;
  /** Domain this tree belongs to */
  domain: TreeDomain;
  /** Whether this tree uses investment-based tier calculation */
  usesInvestmentTiers: boolean;
}

/**
 * Complete tree configuration mapping
 */
export type TreeConfigMap = Record<TalentTreeName, TreeConfig>;