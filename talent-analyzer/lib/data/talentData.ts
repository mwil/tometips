/**
 * Talent data loaders for JSON-based talent information
 * 
 * This module provides typed access to talent icon mappings and tier data
 * stored in JSON format for better maintainability and performance.
 */

import type { TalentIconMap, TalentTierMap } from '../types';

// Import JSON data
import talentIconsData from '../../data/talents/talent-icons.json';
import talentTiersData from '../../data/talents/talent-tiers.json';

/**
 * Get the complete talent icon mapping
 * @returns Record mapping talent names to icon filenames
 */
export function getTalentIconMap(): TalentIconMap {
  return talentIconsData as TalentIconMap;
}

/**
 * Get the complete talent tier mapping
 * @returns Record mapping talent names to tier numbers (1-4)
 */
export function getTalentTierMap(): TalentTierMap {
  return talentTiersData as TalentTierMap;
}

/**
 * Get icon filename for a specific talent
 * @param talentName - Name of the talent
 * @returns Icon filename or undefined if not found
 */
export function getTalentIcon(talentName: string): string | undefined {
  const iconMap = getTalentIconMap();
  return iconMap[talentName];
}

/**
 * Get tier number for a specific talent
 * @param talentName - Name of the talent
 * @returns Tier number (1-4) or undefined if not found
 */
export function getTalentTier(talentName: string): number | undefined {
  const tierMap = getTalentTierMap();
  return tierMap[talentName];
}

/**
 * Get all talent names that have both icon and tier data
 * @returns Array of talent names
 */
export function getAllTalentNames(): string[] {
  const iconMap = getTalentIconMap();
  const tierMap = getTalentTierMap();
  
  // Return talents that exist in both mappings
  return Object.keys(iconMap).filter(name => name in tierMap);
}

/**
 * Get talents by tier level
 * @param tier - Tier number (1-4)
 * @returns Array of talent names in the specified tier
 */
export function getTalentsByTier(tier: number): string[] {
  const tierMap = getTalentTierMap();
  return Object.entries(tierMap)
    .filter(([, talentTier]) => talentTier === tier)
    .map(([talentName]) => talentName);
}

/**
 * Validate that talent data is consistent
 * @returns Object with validation results
 */
export function validateTalentData(): {
  isValid: boolean;
  missingIcons: string[];
  missingTiers: string[];
  totalTalents: number;
} {
  const iconMap = getTalentIconMap();
  const tierMap = getTalentTierMap();
  
  const iconNames = new Set(Object.keys(iconMap));
  const tierNames = new Set(Object.keys(tierMap));
  
  const missingIcons = Array.from(tierNames).filter(name => !iconNames.has(name));
  const missingTiers = Array.from(iconNames).filter(name => !tierNames.has(name));
  
  return {
    isValid: missingIcons.length === 0 && missingTiers.length === 0,
    missingIcons,
    missingTiers,
    totalTalents: Math.max(iconNames.size, tierNames.size)
  };
}