/**
 * Custom hook for theme management
 * 
 * This hook manages dark/light theme state and provides
 * utilities for theme switching with persistence.
 */

import { useEffect } from 'react';
import { useTalentAnalyzer } from '../contexts/TalentAnalyzerContext';

export function useTheme() {
  const { state, actions } = useTalentAnalyzer();

  // Apply theme to document on state change
  useEffect(() => {
    const html = document.documentElement;
    
    if (state.darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    // Store preference in localStorage
    try {
      localStorage.setItem('talent-analyzer-theme', state.darkMode ? 'dark' : 'light');
    } catch (error) {
      // Handle localStorage errors gracefully
      console.warn('Failed to save theme preference:', error);
    }
  }, [state.darkMode]);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('talent-analyzer-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Use saved theme, or fall back to system preference
      const shouldUseDarkMode = savedTheme 
        ? savedTheme === 'dark'
        : prefersDark;
      
      if (shouldUseDarkMode !== state.darkMode) {
        actions.toggleDarkMode();
      }
    } catch (error) {
      // Handle localStorage errors gracefully
      console.warn('Failed to load theme preference:', error);
    }
  }, []); // Only run on mount

  return {
    // Current theme state
    darkMode: state.darkMode,
    theme: state.darkMode ? 'dark' : 'light',
    
    // Theme actions
    toggleDarkMode: actions.toggleDarkMode,
    setDarkMode: (isDark: boolean) => {
      if (isDark !== state.darkMode) {
        actions.toggleDarkMode();
      }
    },
    
    // Theme utilities
    getThemeClasses: (lightClass?: string, darkClass?: string) => {
      const light = lightClass || 'bg-white text-black';
      const dark = darkClass || 'bg-gray-900 text-white';
      return state.darkMode ? dark : light;
    },
    
    // CSS custom properties for dynamic theming
    getCSSVariables: () => ({
      '--theme-bg': state.darkMode ? '#111827' : '#ffffff',
      '--theme-text': state.darkMode ? '#ffffff' : '#000000',
      '--theme-border': state.darkMode ? '#374151' : '#d1d5db',
    }),
  };
}