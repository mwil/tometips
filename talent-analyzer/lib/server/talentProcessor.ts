/**
 * Server-side talent data processing
 * 
 * This module processes raw talent data on the server, adding computed fields
 * like tier information and investment rates. It follows Next.js App Router 
 * patterns for server-side data processing.
 */

import { rawTalentData } from '../../data/talents/rawTalentData';
import { getTalentIcon, getTalentTier } from '../data/talentData';
import type { ProcessedTalentData, RawTalentData } from '../types';

/**
 * Process raw talent data on the server
 * This function adds computed fields and enriches the data with tier and icon information
 */
export async function processTalentData(): Promise<ProcessedTalentData[]> {
  // Special trees that don't use the standard tier system
  // Only Combat training treats everything as tier 1
  const noTierTrees = [
    'Technique / Combat training'
  ];

  return rawTalentData.map((talent: RawTalentData): ProcessedTalentData => {
    const investmentRate = 100 - talent.p0;
    
    // Determine tier based on tree type
    let tier: number;
    if (noTierTrees.includes(talent.tree)) {
      // Combat training: all talents are tier 1
      tier = 1;
    } else {
      // Use tier mapping from game data for all other trees
      tier = getTalentTier(talent.skill) || 1;
    }

    // Get icon path
    const iconPath = getTalentIcon(talent.skill);

    return {
      ...talent,
      investmentRate,
      tier,
      iconPath
    };
  });
}

/**
 * Get unique talent trees for filtering
 */
export async function getTalentTrees(): Promise<string[]> {
  const data = await processTalentData();
  const trees = Array.from(new Set(data.map(talent => talent.tree)));
  return trees.sort();
}

/**
 * Get talent statistics
 */
export async function getTalentStats() {
  const data = await processTalentData();
  
  const classTalents = data.filter(t => t.category === 'Class');
  const genericTalents = data.filter(t => t.category === 'Generic');
  
  const classSum = classTalents.reduce((sum, talent) => sum + (talent.investmentRate || 0), 0);
  const genericSum = genericTalents.reduce((sum, talent) => sum + (talent.investmentRate || 0), 0);

  return {
    total: data.length,
    classTalents: classTalents.length,
    genericTalents: genericTalents.length,
    classInvestmentSum: classSum,
    genericInvestmentSum: genericSum,
    totalInvestmentSum: classSum + genericSum
  };
}