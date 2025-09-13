'use client';

import { useTalentFilters } from '../hooks';

export function TalentStats() {
  const { filteredData } = useTalentFilters();
  
  const classTalents = filteredData.filter(t => t.category === 'Class');
  const genericTalents = filteredData.filter(t => t.category === 'Generic');
  
  const classSum = classTalents.reduce((sum, talent) => sum + (talent.investmentRate || 0), 0);
  const genericSum = genericTalents.reduce((sum, talent) => sum + (talent.investmentRate || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
          Class Talents
        </h3>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
          {classTalents.length}
        </p>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          Total Investment: {classSum.toFixed(1)}%
        </p>
      </div>
      
      <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
          Generic Talents
        </h3>
        <p className="text-2xl font-bold text-green-600 dark:text-green-300">
          {genericTalents.length}
        </p>
        <p className="text-sm text-green-700 dark:text-green-400">
          Total Investment: {genericSum.toFixed(1)}%
        </p>
      </div>
      
      <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
          Total Talents
        </h3>
        <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">
          {filteredData.length}
        </p>
        <p className="text-sm text-purple-700 dark:text-purple-400">
          Combined: {(classSum + genericSum).toFixed(1)}%
        </p>
      </div>
    </div>
  );
}