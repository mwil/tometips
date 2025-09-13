/**
 * Talent Tier Mapping
 * 
 * Maps talent names to their game tier numbers (1-4).
 * Tier information extracted directly from game data files.
 * 
 * Tier meanings:
 * - Tier 1: Basic/foundational talents
 * - Tier 2: Intermediate talents  
 * - Tier 3: Advanced talents
 * - Tier 4: Master/ultimate talents
 * 
 * Total: 513 tier mappings
 */

import type { TalentTierMap } from '../../lib/types';
import { getTalentTierMap } from '../../lib/data/talentData';

// Load tier mapping from JSON data
export const TALENT_TIER_MAP: TalentTierMap = getTalentTierMap();