/**
 * Raw talent statistical data extracted from game analysis
 * 
 * This file contains the raw talent usage statistics from analyzing player builds.
 * Each entry represents point distribution percentages for individual talents.
 */

import type { RawTalentData, TalentCategory, TalentTreeName } from '../../lib/types';

/**
 * Helper function to create a talent entry with consistent structure
 */
function createTalentEntry(
  tree: TalentTreeName, 
  skill: string, 
  p0: number, 
  p1: number, 
  p2: number, 
  p3: number, 
  p4: number, 
  p5: number, 
  players: number, 
  category: TalentCategory
): RawTalentData {
  return { 
    tree, 
    skill, 
    p0, 
    p1, 
    p2, 
    p3, 
    p4, 
    p5, 
    players, 
    category 
  };
}

/**
 * Raw talent usage data from statistical analysis of player builds
 * 
 * Format: createTalentEntry(tree, skill, p0, p1, p2, p3, p4, p5, players, category)
 * - p0-p5: Percentage of players with 0-5 points in this talent
 * - players: Total number of players analyzed for this tree
 * - category: 'Class' for class-specific talents, 'Generic' for universal talents
 */
export const rawTalentData: RawTalentData[] = [
  // Class Talents
  // Corruption / Brutality (32 players)
  createTalentEntry('Corruption / Brutality', 'Fiery Grasp', 0, 9, 6, 3, 66, 16, 32, 'Class'),
  createTalentEntry('Corruption / Brutality', 'Draining Assault', 0, 9, 3, 12, 0, 75, 32, 'Class'),
  createTalentEntry('Corruption / Brutality', 'Reckless Strike', 3, 28, 3, 0, 6, 59, 32, 'Class'),
  createTalentEntry('Corruption / Brutality', 'Share the Pain', 34, 3, 3, 12, 6, 41, 32, 'Class'),
  
  // Corruption / Torture (32 players)
  createTalentEntry('Corruption / Torture', 'Eternal Suffering', 25, 0, 3, 6, 16, 50, 32, 'Class'),
  createTalentEntry('Corruption / Torture', 'Fiery Torment', 19, 50, 3, 3, 6, 19, 32, 'Class'),
  createTalentEntry('Corruption / Torture', 'Abduction', 0, 6, 3, 9, 12, 69, 32, 'Class'),
  createTalentEntry('Corruption / Torture', 'Incinerating Blows', 0, 38, 3, 9, 19, 31, 32, 'Class'),
  
  // Technique / Combat techniques (32 players)
  createTalentEntry('Technique / Combat techniques', 'Rush', 0, 69, 3, 9, 9, 9, 32, 'Class'),
  createTalentEntry('Technique / Combat techniques', 'Blinding Speed', 9, 0, 3, 3, 9, 75, 32, 'Class'),
  createTalentEntry('Technique / Combat techniques', 'Perfect Strike', 3, 31, 0, 22, 31, 12, 32, 'Class'),
  createTalentEntry('Technique / Combat techniques', 'Precise Strikes', 3, 50, 3, 0, 6, 38, 32, 'Class'),
  
  // Corruption / Shadowflame (32 players)
  createTalentEntry('Corruption / Shadowflame', 'Fearscape', 9, 84, 3, 0, 0, 3, 32, 'Class'),
  createTalentEntry('Corruption / Shadowflame', 'Flame of Urh\'Rok', 6, 0, 6, 3, 3, 81, 32, 'Class'),
  createTalentEntry('Corruption / Shadowflame', 'Darkfire', 6, 91, 0, 0, 0, 3, 32, 'Class'),
  createTalentEntry('Corruption / Shadowflame', 'Wraithform', 0, 72, 22, 3, 0, 3, 32, 'Class'),
  
  // Corruption / Heart of Fire (32 players)
  createTalentEntry('Corruption / Heart of Fire', 'Blazing Rebirth', 22, 28, 3, 22, 12, 12, 32, 'Class'),
  createTalentEntry('Corruption / Heart of Fire', 'Devouring Flames', 16, 81, 0, 0, 0, 3, 32, 'Class'),
  createTalentEntry('Corruption / Heart of Fire', 'Fiery Aegis', 16, 72, 0, 0, 6, 6, 32, 'Class'),
  createTalentEntry('Corruption / Heart of Fire', 'Burning Sacrifice', 3, 78, 6, 0, 0, 12, 32, 'Class'),
  
  // Technique / Combat veteran (32 players)
  createTalentEntry('Technique / Combat veteran', 'Unending Frenzy', 88, 9, 0, 0, 0, 3, 32, 'Class'),
  createTalentEntry('Technique / Combat veteran', 'Spell Shield', 69, 19, 0, 0, 3, 9, 32, 'Class'),
  createTalentEntry('Technique / Combat veteran', 'Fast Metabolism', 59, 38, 0, 0, 0, 3, 32, 'Class'),
  createTalentEntry('Technique / Combat veteran', 'Quick Recovery', 59, 34, 3, 0, 0, 3, 32, 'Class'),
  
  // Corruption / Wrath (31 players)
  createTalentEntry('Corruption / Wrath', 'Destroyer', 0, 0, 0, 0, 6, 94, 31, 'Class'),
  createTalentEntry('Corruption / Wrath', 'Voracious Blade', 0, 84, 0, 10, 0, 6, 31, 'Class'),
  createTalentEntry('Corruption / Wrath', 'Detonating Charge', 0, 42, 19, 16, 6, 16, 31, 'Class'),
  createTalentEntry('Corruption / Wrath', 'Obliterating Smash', 0, 19, 3, 6, 23, 48, 31, 'Class'),
  
  // Corruption / Fearfire (28 players)
  createTalentEntry('Corruption / Fearfire', 'Maw of Urh\'rok', 86, 7, 0, 0, 0, 7, 28, 'Class'),
  createTalentEntry('Corruption / Fearfire', 'Infernal Breath', 68, 14, 0, 7, 4, 7, 28, 'Class'),
  createTalentEntry('Corruption / Fearfire', 'Cauterize Spirit', 0, 0, 36, 14, 46, 4, 28, 'Class'),
  createTalentEntry('Corruption / Fearfire', 'Fearscape Shift', 0, 7, 21, 14, 43, 14, 28, 'Class'),
  
  // Generic Talents
  // Technique / Combat training (32 players)
  createTalentEntry('Technique / Combat training', 'Heavy Armour Training', 0, 50, 0, 28, 3, 19, 32, 'Generic'),
  createTalentEntry('Technique / Combat training', 'Light Armour Training', 44, 19, 6, 19, 0, 12, 32, 'Generic'),
  createTalentEntry('Technique / Combat training', 'Dagger Mastery', 84, 12, 0, 0, 0, 3, 32, 'Generic'),
  createTalentEntry('Technique / Combat training', 'Weapons Mastery', 12, 3, 0, 0, 0, 84, 32, 'Generic'),
  createTalentEntry('Technique / Combat training', 'Combat Accuracy', 0, 3, 19, 16, 16, 47, 32, 'Generic'),
  createTalentEntry('Technique / Combat training', 'Thick Skin', 9, 0, 6, 12, 3, 69, 32, 'Generic'),
  
  // Corruption / Demonic strength (32 players)
  createTalentEntry('Corruption / Demonic strength', 'Demonic Blood', 0, 16, 6, 12, 0, 66, 32, 'Generic'),
  createTalentEntry('Corruption / Demonic strength', 'Abyssal Shield', 3, 6, 0, 0, 6, 84, 32, 'Generic'),
  createTalentEntry('Corruption / Demonic strength', 'Surge of Power', 0, 72, 22, 3, 0, 3, 32, 'Generic'),
  createTalentEntry('Corruption / Demonic strength', 'Dismember', 0, 41, 0, 12, 3, 44, 32, 'Generic'),
  
  // Corruption / Oppression (32 players)
  createTalentEntry('Corruption / Oppression', 'Fearfeast', 50, 44, 0, 3, 0, 3, 32, 'Generic'),
  createTalentEntry('Corruption / Oppression', 'Mass Hysteria', 47, 50, 0, 0, 0, 3, 32, 'Generic'),
  createTalentEntry('Corruption / Oppression', 'Horrifying Blows', 22, 9, 3, 22, 19, 25, 32, 'Generic'),
  createTalentEntry('Corruption / Oppression', 'Hope Wanes', 50, 0, 3, 0, 28, 19, 32, 'Generic'),
  
  // Cunning / Survival (32 players)
  createTalentEntry('Cunning / Survival', 'Danger Sense', 66, 25, 0, 6, 0, 3, 32, 'Generic'),
  createTalentEntry('Cunning / Survival', 'Device Mastery', 19, 38, 3, 3, 6, 31, 32, 'Generic'),
  createTalentEntry('Cunning / Survival', 'Heightened Senses', 12, 84, 0, 0, 0, 3, 32, 'Generic'),
  createTalentEntry('Cunning / Survival', 'Track', 28, 66, 0, 3, 0, 3, 32, 'Generic'),
  
  // Corruption / Hexes (32 players)
  createTalentEntry('Corruption / Hexes', 'Empathic Hex', 91, 6, 0, 0, 0, 3, 32, 'Generic'),
  createTalentEntry('Corruption / Hexes', 'Domination Hex', 91, 6, 0, 0, 0, 3, 32, 'Generic'),
  createTalentEntry('Corruption / Hexes', 'Pacification Hex', 78, 19, 0, 0, 0, 3, 32, 'Generic'),
  createTalentEntry('Corruption / Hexes', 'Burning Hex', 81, 9, 3, 3, 0, 3, 32, 'Generic'),
  
  // Race / Ogre (11 players)
  createTalentEntry('Race / Ogre', 'Ogric Wrath', 0, 91, 0, 0, 0, 9, 11, 'Generic'),
  createTalentEntry('Race / Ogre', 'Grisly Constitution', 0, 0, 0, 0, 0, 100, 11, 'Generic'),
  createTalentEntry('Race / Ogre', 'Scar-Scripted Flesh', 0, 82, 18, 0, 0, 0, 11, 'Generic'),
  createTalentEntry('Race / Ogre', 'Writ Large', 0, 18, 36, 0, 9, 36, 11, 'Generic'),
];