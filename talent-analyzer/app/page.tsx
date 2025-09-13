'use client';

import React, { useState, useMemo } from 'react';
import { TALENT_ICON_MAP, TALENT_TIER_MAP } from '../talent_icon_mapping';

const TalentAnalyzer = () => {
  const [selectedTree, setSelectedTree] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleCellSelection = (skillName: string, points: number) => {
    const cellId = `${skillName}-${points}`;
    const newSelected = new Set(selectedCells);
    if (newSelected.has(cellId)) {
      newSelected.delete(cellId);
    } else {
      newSelected.add(cellId);
    }
    setSelectedCells(newSelected);
  };

  const createTalentEntry = (tree: string, skill: string, p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, players: number, category: string) => {
    const investmentRate = 100 - p0;
    return { tree, skill, p0, p1, p2, p3, p4, p5, players, category, investmentRate, tier: 1 };
  };

  const rawTalentData = [
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

  const talentData = useMemo(() => {
    // Special trees that don't use tier system (they use investment-based tiers)
    const noTierTrees = [
      'Technique / Combat training',
      'Race / Doomelf',
      'Race / Halfling',
      'Race / Yeek',
      'Race / Drem', 
      'Race / Dwarf',
      'Undead / Ghoul',
      'Undead / Skeleton'
    ];
    
    // Create a deep copy with investment rates
    const result = rawTalentData.map(t => ({
      ...t,
      investmentRate: 100 - t.p0,
      tier: 1 // default
    }));
    
    // Apply game data tiers for all talents we have mappings for
    result.forEach(talent => {
      if (TALENT_TIER_MAP[talent.skill]) {
        talent.tier = TALENT_TIER_MAP[talent.skill];
      }
    });
    
    // For special trees without complete game data, calculate tiers based on investment rates
    const trees = Array.from(new Set(result.map(t => t.tree)));
    
    trees.forEach(treeName => {
      // Skip trees that we have complete game data for
      if (!noTierTrees.includes(treeName)) {
        return;
      }
      
      // Get all talents for this tree
      const treeTalents = result.filter(t => t.tree === treeName);
      
      // Get unique investment rates for this tree, sorted descending
      const uniqueRates = Array.from(new Set(treeTalents.map(t => t.investmentRate))).sort((a, b) => b - a);
      
      // Assign tier based on investment rate rank
      uniqueRates.forEach((rate, index) => {
        const tier = Math.min(index + 1, 4); // Cap at tier 4
        
        // Update all talents with this investment rate in this tree
        result.forEach(talent => {
          if (talent.tree === treeName && talent.investmentRate === rate) {
            talent.tier = tier;
          }
        });
      });
    });
    
    return result;
  }, []);

  const calculateSelectedSums = () => {
    let classSum = 0;
    let genericSum = 0;
    
    selectedCells.forEach(cellId => {
      const [skillName, pointsStr] = cellId.split('-');
      const points = parseInt(pointsStr);
      
      const talent = talentData.find(t => t.skill === skillName);
      if (talent) {
        if (talent.category === 'Class') {
          classSum += points;
        } else if (talent.category === 'Generic') {
          genericSum += points;
        }
      }
    });
    
    return { classSum, genericSum };
  };

  const { classSum, genericSum } = calculateSelectedSums();

  const treeColors: Record<string, string> = {
    'Corruption / Brutality': '#8B0000',
    'Corruption / Torture': '#DC143C',
    'Technique / Combat techniques': '#4682B4',
    'Corruption / Shadowflame': '#483D8B',
    'Corruption / Heart of Fire': '#FF4500',
    'Technique / Combat veteran': '#5F9EA0',
    'Corruption / Wrath': '#B22222',
    'Corruption / Fearfire': '#FF6347',
    'Technique / Combat training': '#2F4F4F',
    'Corruption / Demonic strength': '#8B008B',
    'Corruption / Oppression': '#9932CC',
    'Cunning / Survival': '#556B2F',
    'Corruption / Hexes': '#6B238E',
    'Race / Ogre': '#8B4513',
  };

  const filteredData = useMemo(() => {
    let data = Array.from(talentData); // Create a copy to sort
    
    // Filter by category/tree
    if (selectedTree === 'class') {
      data = data.filter(item => item.category === 'Class');
    } else if (selectedTree === 'generic') {
      data = data.filter(item => item.category === 'Generic');
    } else if (selectedTree !== 'all') {
      data = data.filter(item => item.tree === selectedTree);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase().trim();
      data = data.filter(item => 
        item.skill.toLowerCase().includes(lowerSearch) ||
        item.tree.toLowerCase().includes(lowerSearch)
      );
    }
    
    // Always sort by: players (descending) → tree name → tier
    data.sort((a, b) => {
      // First sort by number of players (highest first)
      const playerCompare = b.players - a.players;
      if (playerCompare !== 0) return playerCompare;
      
      // Then sort by tree name
      const treeCompare = a.tree.localeCompare(b.tree);
      if (treeCompare !== 0) return treeCompare;
      
      // Within the same tree, sort by tier (1 first, 4 last)
      const tierCompare = a.tier - b.tier;
      if (tierCompare !== 0) return tierCompare;
      
      // Within the same tier, sort by investment rate (highest first)
      return b.investmentRate - a.investmentRate;
    });
    
    return data;
  }, [selectedTree, talentData, searchTerm]);

  return (
    <div className={`p-4 min-h-screen transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Doombringer Talent Analysis
            </h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Click cells to track point allocation. {searchTerm && `Filtering: "${searchTerm}"`}
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        
        <div className={`flex gap-4 mb-6 p-4 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search talents or trees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`px-3 py-2 border rounded transition-colors ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-800'
              }`}
            />
            <button
              onClick={() => setSelectedTree('all')}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                selectedTree === 'all'
                  ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                  : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
              }`}
            >
              All Skills
            </button>
            <button
              onClick={() => setSelectedTree('class')}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                selectedTree === 'class'
                  ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                  : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
              }`}
            >
              Class
            </button>
            <button
              onClick={() => setSelectedTree('generic')}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                selectedTree === 'generic'
                  ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                  : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
              }`}
            >
              Generic Skills
            </button>
          </div>

          <div className="flex gap-4 ml-auto">
            <div className="flex items-center gap-2">
              <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Class:
              </label>
              <div className={`px-3 py-2 border rounded font-bold text-center min-w-16 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-green-400' 
                  : 'bg-gray-50 border-gray-300 text-green-600'
              }`}>
                {classSum}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Generic:
              </label>
              <div className={`px-3 py-2 border rounded font-bold text-center min-w-16 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-blue-400' 
                  : 'bg-gray-50 border-gray-300 text-blue-600'
              }`}>
                {genericSum}
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded shadow p-4 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {filteredData.length === 0 ? (
            <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No results found for "{searchTerm}"
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                  <th className={`p-2 text-left ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Skill</th>
                  <th className={`p-2 text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Tree</th>
                  <th className={`p-2 text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Players</th>
                  <th className={`p-2 text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Invest%</th>
                  <th className={`p-2 text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>0</th>
                  <th className={`p-2 text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>1</th>
                  <th className={`p-2 text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>2</th>
                  <th className={`p-2 text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>3</th>
                  <th className={`p-2 text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>4</th>
                  <th className={`p-2 text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>5</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={`${item.tree}-${item.skill}`} className={
                    index % 2 === 0 
                      ? (darkMode ? 'bg-gray-800' : 'bg-gray-50') 
                      : (darkMode ? 'bg-gray-750' : 'bg-white')
                  }>
                    <td className={`p-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      <div className="flex items-center gap-3">
                        {TALENT_ICON_MAP[item.skill] ? (
                          <img 
                            src={`/img/talents/48/${TALENT_ICON_MAP[item.skill]}`}
                            alt={item.skill}
                            width={48}
                            height={48}
                            className="rounded border border-gray-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-400 rounded border border-gray-300 flex items-center justify-center">
                            <span className="text-xs text-gray-600">?</span>
                          </div>
                        )}
                        <span>{item.skill}</span>
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <span 
                        className="px-2 py-1 rounded text-xs text-white font-semibold"
                        style={{ backgroundColor: treeColors[item.tree] || '#666' }}
                      >
                        {item.tree}
                      </span>
                    </td>
                    <td className={`p-2 text-center font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {item.players}
                    </td>
                    <td className={`p-2 text-center font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {item.investmentRate}%
                    </td>
                    {[0, 1, 2, 3, 4, 5].map(points => {
                      const value = (item as any)[`p${points}`];
                      const intensity = value / 100;
                      const cellId = `${item.skill}-${points}`;
                      const isSelected = selectedCells.has(cellId);
                      return (
                        <td 
                          key={points} 
                          className="p-2 text-center font-medium cursor-pointer transition-all"
                          style={{ 
                            backgroundColor: `rgba(255, 165, 0, ${intensity})`,
                            color: intensity > 0.5 ? 'white' : (darkMode ? '#e5e7eb' : 'black'),
                            border: isSelected ? '3px solid #3b82f6' : '1px solid transparent'
                          }}
                          onClick={() => toggleCellSelection(item.skill, points)}
                          title={`${value}% - Click to add ${points} points`}
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TalentAnalyzer;