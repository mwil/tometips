/**
 * Custom hook for talent filtering operations
 * 
 * This hook provides a clean interface for managing talent filters,
 * following React best practices for custom hooks.
 */

import { useTalentAnalyzer } from '../contexts/TalentAnalyzerContext';

export function useTalentFilters() {
  const { state, actions, availableTrees, filteredData } = useTalentAnalyzer();

  return {
    // Current filter state
    selectedTree: state.selectedTree,
    searchTerm: state.searchTerm,
    
    // Available options
    availableTrees,
    
    // Filtered results
    filteredData,
    
    // Filter actions
    setSelectedTree: actions.setSelectedTree,
    setSearchTerm: actions.setSearchTerm,
    resetFilters: actions.resetFilters,
    
    // Filter statistics
    totalResults: filteredData.length,
    isFiltered: state.selectedTree !== 'all' || state.searchTerm !== '',
    
    // Helper functions
    getResultsByCategory: () => {
      const classTalents = filteredData.filter(t => t.category === 'Class');
      const genericTalents = filteredData.filter(t => t.category === 'Generic');
      
      return {
        class: classTalents.length,
        generic: genericTalents.length,
        total: filteredData.length,
      };
    },
  };
}