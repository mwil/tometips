/**
 * Custom hook for talent cell selection operations
 * 
 * This hook manages the selection state of talent grid cells,
 * providing utilities for selection tracking and analysis.
 */

import { useTalentAnalyzer } from '../contexts/TalentAnalyzerContext';

export function useTalentSelection() {
  const { state, actions, filteredData } = useTalentAnalyzer();

  return {
    // Current selection state
    selectedCells: state.selectedCells,
    
    // Selection actions
    toggleCellSelection: actions.toggleCellSelection,
    clearCellSelection: actions.clearCellSelection,
    
    // Selection utilities
    isCellSelected: (skillName: string, points: number) => {
      const cellId = `${skillName}-${points}`;
      return state.selectedCells.has(cellId);
    },
    
    // Selection statistics
    selectionCount: state.selectedCells.size,
    hasSelections: state.selectedCells.size > 0,
    
    // Analysis functions
    getSelectionAnalysis: () => {
      if (state.selectedCells.size === 0) return null;
      
      const selections = Array.from(state.selectedCells).map(cellId => {
        const [skillName, pointsStr] = cellId.split('-');
        const points = parseInt(pointsStr, 10);
        const talent = filteredData.find(t => t.skill === skillName);
        
        return {
          skillName,
          points,
          talent,
          percentage: talent ? talent[`p${points}` as keyof typeof talent] as number : 0,
        };
      });
      
      const totalPercentage = selections.reduce((sum, sel) => sum + sel.percentage, 0);
      const averagePercentage = totalPercentage / selections.length;
      
      return {
        selections,
        totalPercentage,
        averagePercentage,
        selectionsByCategory: {
          class: selections.filter(s => s.talent?.category === 'Class').length,
          generic: selections.filter(s => s.talent?.category === 'Generic').length,
        },
        totalsByCategory: {
          class: selections.filter(s => s.talent?.category === 'Class').reduce((sum, sel) => sum + sel.points, 0),
          generic: selections.filter(s => s.talent?.category === 'Generic').reduce((sum, sel) => sum + sel.points, 0),
        },
      };
    },
  };
}