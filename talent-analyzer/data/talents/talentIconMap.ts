/**
 * Talent Icon Mapping
 * 
 * Maps talent names to their corresponding icon filenames.
 * Icons are located in /public/img/talents/48/ directory.
 * 
 * Extracted from all game data files (513 icons total).
 */

import type { TalentIconMap } from '../../lib/types';
import { getTalentIconMap } from '../../lib/data/talentData';

// Load icon mapping from JSON data
export const TALENT_ICON_MAP: TalentIconMap = getTalentIconMap();
