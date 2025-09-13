/**
 * Core talent data structures for the talent analyzer
 */

/** 
 * Point distribution percentages for talent investment levels (0-5 points)
 */
export interface TalentPointDistribution {
  /** Percentage of players with 0 points */
  p0: number;
  /** Percentage of players with 1 point */
  p1: number;
  /** Percentage of players with 2 points */
  p2: number;
  /** Percentage of players with 3 points */
  p3: number;
  /** Percentage of players with 4 points */
  p4: number;
  /** Percentage of players with 5 points */
  p5: number;
}

/**
 * Talent categories - either class-specific or generic skills
 */
export type TalentCategory = 'Class' | 'Generic';

/**
 * Raw talent data entry from statistical analysis
 */
export interface RawTalentData extends TalentPointDistribution {
  /** Full tree name (e.g., 'Corruption / Brutality') */
  tree: string;
  /** Talent/skill name (e.g., 'Fiery Grasp') */
  skill: string;
  /** Number of players analyzed for this talent */
  players: number;
  /** Whether this is a class-specific or generic talent */
  category: TalentCategory;
}

/**
 * Processed talent data with calculated fields
 */
export interface ProcessedTalentData extends RawTalentData {
  /** Percentage of players who invested in this talent (100 - p0) */
  investmentRate: number;
  /** Game tier (1-4) assigned to this talent */
  tier: number;
  /** Icon filename for this talent */
  iconPath?: string;
}

/**
 * Talent icon mapping - maps talent names to PNG filenames
 */
export type TalentIconMap = Record<string, string>;

/**
 * Talent tier mapping - maps talent names to tier numbers
 */
export type TalentTierMap = Record<string, number>;

/**
 * Point allocation tracking for UI state
 */
export interface PointAllocation {
  /** Talent name */
  skillName: string;
  /** Number of points allocated */
  points: number;
}

/**
 * Cell selection state for the talent table
 */
export type CellSelection = Set<string>; // Format: "skillName-points"

/**
 * Summary of allocated points by category
 */
export interface PointSummary {
  /** Total class points allocated */
  classSum: number;
  /** Total generic points allocated */
  genericSum: number;
}