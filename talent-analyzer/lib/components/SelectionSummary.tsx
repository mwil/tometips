'use client';

import { useTalentSelection } from '../hooks';

export function SelectionSummary() {
  const { getSelectionAnalysis, hasSelections } = useTalentSelection();
  const analysis = getSelectionAnalysis();

  if (!hasSelections || !analysis) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
          <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            Class Talents Total:
          </label>
          <input
            type="text"
            readOnly
            value="0"
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-600 rounded-md text-center font-mono text-lg text-blue-900 dark:text-blue-100"
          />
        </div>
        
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg border border-green-200 dark:border-green-700">
          <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
            Generic Talents Total:
          </label>
          <input
            type="text"
            readOnly
            value="0"
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-600 rounded-md text-center font-mono text-lg text-green-900 dark:text-green-100"
          />
        </div>
      </div>
    );
  }

  const { totalsByCategory } = analysis;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
        <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
          Class Talents Total:
        </label>
        <input
          type="text"
          readOnly
          value={totalsByCategory.class.toString()}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-600 rounded-md text-center font-mono text-lg text-blue-900 dark:text-blue-100"
        />
      </div>
      
      <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg border border-green-200 dark:border-green-700">
        <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
          Generic Talents Total:
        </label>
        <input
          type="text"
          readOnly
          value={totalsByCategory.generic.toString()}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-600 rounded-md text-center font-mono text-lg text-green-900 dark:text-green-100"
        />
      </div>
    </div>
  );
}