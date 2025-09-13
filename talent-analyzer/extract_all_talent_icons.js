const fs = require('fs');

// Read all the talent JSON files
const files = [
  '../html/data/1.7.6/talents.corruption-1.1.json',
  '../html/data/1.7.6/talents.technique-1.2.json',
  '../html/data/1.7.6/talents.cunning-1.1.json',
  '../html/data/1.7.6/talents.race-1.1.json',
  '../html/data/1.7.6/talents.undead-1.5.json'
];

// Extract talent name to image mappings and tier information
const iconMappings = {};
const tierMappings = {};

function extractIconsFromData(data) {
  for (const tree of data) {
    if (tree.talents) {
      for (const talent of tree.talents) {
        if (talent.name && talent.image) {
          iconMappings[talent.name] = talent.image;
        }
        // Extract tier information from type field [category/tree, tier]
        if (talent.name && talent.type && Array.isArray(talent.type) && talent.type.length >= 2) {
          tierMappings[talent.name] = talent.type[1];
        }
      }
    }
  }
}

// Process all files
for (const file of files) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    console.log(`Processing ${file}...`);
    extractIconsFromData(data);
  } catch (error) {
    console.log(`Could not read ${file}: ${error.message}`);
  }
}

// Output as JavaScript object
console.log('\n// Complete talent icon mapping extracted from all game data files');
console.log('const TALENT_ICON_MAP: Record<string, string> = {');

// Sort alphabetically for easier reading
const sortedNames = Object.keys(iconMappings).sort();
for (const talentName of sortedNames) {
  console.log(`  '${talentName.replace(/'/g, "\\'")}': '${iconMappings[talentName]}',`);
}

console.log('};');
console.log('');

// Output tier mappings
console.log('// Tier mapping extracted from game data');
console.log('const TALENT_TIER_MAP: Record<string, number> = {');

const sortedTierNames = Object.keys(tierMappings).sort();
for (const talentName of sortedTierNames) {
  console.log(`  '${talentName.replace(/'/g, "\\'")}': ${tierMappings[talentName]},`);
}

console.log('};');
console.log('');
console.log(`// Found ${Object.keys(iconMappings).length} talent icons and ${Object.keys(tierMappings).length} tier mappings total`);