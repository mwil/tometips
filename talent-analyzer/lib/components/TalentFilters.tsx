'use client';

import { useTalentFilters, useTheme } from '../hooks';

export function TalentFilters() {
  const {
    selectedTree,
    searchTerm,
    availableTrees,
    setSelectedTree,
    setSearchTerm,
    resetFilters,
    isFiltered
  } = useTalentFilters();
  
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center gap-2">
        <label htmlFor="tree-filter" className="text-sm font-medium">
          Filter by Tree:
        </label>
        <select
          id="tree-filter"
          value={selectedTree}
          onChange={(e) => setSelectedTree(e.target.value)}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="all">All Trees</option>
          <option value="class">Class Talents</option>
          <option value="generic">Generic Talents</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="search" className="text-sm font-medium">
          Search:
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search talents..."
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleDarkMode}
          className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        {isFiltered && (
          <button
            onClick={resetFilters}
            className="px-4 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}