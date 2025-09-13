'use client';

import { createContext, useContext, useReducer, useMemo, ReactNode } from 'react';
import { ProcessedTalentData } from '../types';

// State interface
export interface TalentAnalyzerState {
  selectedTree: string;
  darkMode: boolean;
  selectedCells: Set<string>;
  searchTerm: string;
}

// Action types
export type TalentAnalyzerAction =
  | { type: 'SET_SELECTED_TREE'; payload: string }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'TOGGLE_CELL_SELECTION'; payload: { skillName: string; points: number } }
  | { type: 'CLEAR_CELL_SELECTION' }
  | { type: 'RESET_FILTERS' };

// Initial state
const initialState: TalentAnalyzerState = {
  selectedTree: 'all',
  darkMode: true,
  selectedCells: new Set(),
  searchTerm: '',
};

// Reducer function
function talentAnalyzerReducer(
  state: TalentAnalyzerState,
  action: TalentAnalyzerAction
): TalentAnalyzerState {
  switch (action.type) {
    case 'SET_SELECTED_TREE':
      return {
        ...state,
        selectedTree: action.payload,
      };

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };

    case 'TOGGLE_CELL_SELECTION': {
      const cellId = `${action.payload.skillName}-${action.payload.points}`;
      const newSelectedCells = new Set(state.selectedCells);
      
      if (newSelectedCells.has(cellId)) {
        newSelectedCells.delete(cellId);
      } else {
        newSelectedCells.add(cellId);
      }

      return {
        ...state,
        selectedCells: newSelectedCells,
      };
    }

    case 'CLEAR_CELL_SELECTION':
      return {
        ...state,
        selectedCells: new Set(),
      };

    case 'RESET_FILTERS':
      return {
        ...initialState,
        darkMode: state.darkMode, // Preserve dark mode setting
      };

    default:
      return state;
  }
}

// Context interface
interface TalentAnalyzerContextType {
  state: TalentAnalyzerState;
  dispatch: React.Dispatch<TalentAnalyzerAction>;
  // Computed values
  availableTrees: string[];
  filteredData: ProcessedTalentData[];
  // Helper functions
  actions: {
    setSelectedTree: (tree: string) => void;
    toggleDarkMode: () => void;
    setSearchTerm: (term: string) => void;
    toggleCellSelection: (skillName: string, points: number) => void;
    clearCellSelection: () => void;
    resetFilters: () => void;
  };
}

// Create context
const TalentAnalyzerContext = createContext<TalentAnalyzerContextType | undefined>(undefined);

// Provider component
interface TalentAnalyzerProviderProps {
  children: ReactNode;
  initialData: ProcessedTalentData[];
}

export function TalentAnalyzerProvider({ children, initialData }: TalentAnalyzerProviderProps) {
  const [state, dispatch] = useReducer(talentAnalyzerReducer, initialState);

  // Computed values
  const availableTrees = useMemo(() => {
    const trees = Array.from(new Set(initialData.map(talent => talent.tree)));
    return trees.sort();
  }, [initialData]);

  const filteredData = useMemo(() => {
    let filtered = initialData;

    // Tree filter
    if (state.selectedTree === 'class') {
      filtered = filtered.filter(item => item.category === 'Class');
    } else if (state.selectedTree === 'generic') {
      filtered = filtered.filter(item => item.category === 'Generic');
    } else if (state.selectedTree !== 'all') {
      filtered = filtered.filter(item => item.tree === state.selectedTree);
    }

    // Search filter
    if (state.searchTerm) {
      const term = state.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.skill.toLowerCase().includes(term) ||
        item.tree.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [initialData, state.selectedTree, state.searchTerm]);

  // Action creators
  const actions = useMemo(() => ({
    setSelectedTree: (tree: string) => dispatch({ type: 'SET_SELECTED_TREE', payload: tree }),
    toggleDarkMode: () => dispatch({ type: 'TOGGLE_DARK_MODE' }),
    setSearchTerm: (term: string) => dispatch({ type: 'SET_SEARCH_TERM', payload: term }),
    toggleCellSelection: (skillName: string, points: number) => 
      dispatch({ type: 'TOGGLE_CELL_SELECTION', payload: { skillName, points } }),
    clearCellSelection: () => dispatch({ type: 'CLEAR_CELL_SELECTION' }),
    resetFilters: () => dispatch({ type: 'RESET_FILTERS' }),
  }), []);

  const value = useMemo(() => ({
    state,
    dispatch,
    availableTrees,
    filteredData,
    actions,
  }), [state, availableTrees, filteredData, actions]);

  return (
    <TalentAnalyzerContext.Provider value={value}>
      {children}
    </TalentAnalyzerContext.Provider>
  );
}

// Custom hook to use the context
export function useTalentAnalyzer(): TalentAnalyzerContextType {
  const context = useContext(TalentAnalyzerContext);
  
  if (context === undefined) {
    throw new Error('useTalentAnalyzer must be used within a TalentAnalyzerProvider');
  }
  
  return context;
}