'use client';

import { useTalentFilters, useTalentSelection } from '../hooks';
import { getInvestmentColorClassesWithSelection } from '../utils/colorUtils';

export function TalentGrid() {
  const { filteredData } = useTalentFilters();
  const { selectedCells, toggleCellSelection, isCellSelected } = useTalentSelection();
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="border border-gray-300 dark:border-gray-600 p-2 text-center text-gray-900 dark:text-gray-100 font-semibold">Icon</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2 text-left text-gray-900 dark:text-gray-100 font-semibold">Talent</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2 text-center text-gray-900 dark:text-gray-100 font-semibold">Tree</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2 text-center text-gray-900 dark:text-gray-100 font-semibold">0</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2 text-center text-gray-900 dark:text-gray-100 font-semibold">1</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2 text-center text-gray-900 dark:text-gray-100 font-semibold">2</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2 text-center text-gray-900 dark:text-gray-100 font-semibold">3</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2 text-center text-gray-900 dark:text-gray-100 font-semibold">4</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2 text-center text-gray-900 dark:text-gray-100 font-semibold">5</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2 text-center text-gray-900 dark:text-gray-100 font-semibold">Investment</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}>
              <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                {item.iconPath && (
                  <img 
                    src={`/img/talents/48/${item.iconPath}`} 
                    alt={item.skill} 
                    className="w-8 h-8 mx-auto"
                    title={item.skill}
                  />
                )}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 p-2 font-medium text-gray-900 dark:text-gray-100">{item.skill}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-600 dark:text-gray-300">{item.tree}</td>
              {[0, 1, 2, 3, 4, 5].map(points => {
                const isSelected = isCellSelected(item.skill, points);
                const value = item[`p${points}` as keyof typeof item] as number;
                const colorClasses = getInvestmentColorClassesWithSelection(value, isSelected);
                
                return (
                  <td 
                    key={points}
                    className={`border border-gray-300 dark:border-gray-600 p-2 text-center cursor-pointer hover:opacity-80 transition-opacity ${colorClasses}`}
                    onClick={() => toggleCellSelection(item.skill, points)}
                  >
                    {value}%
                  </td>
                );
              })}
              <td className="border border-gray-300 dark:border-gray-600 p-2 text-center font-medium text-gray-900 dark:text-gray-100">
                {item.investmentRate?.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}