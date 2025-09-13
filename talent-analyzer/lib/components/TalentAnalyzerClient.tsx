'use client';

import { ProcessedTalentData } from '../types';
import { TalentAnalyzerProvider } from '../contexts/TalentAnalyzerContext';
import { TalentGrid } from './TalentGrid';
import { TalentFilters } from './TalentFilters';
import { SelectionSummary } from './SelectionSummary';
import { useTheme, useTalentSelection, useTalentFilters } from '../hooks';

interface TalentAnalyzerClientProps {
  initialData: ProcessedTalentData[];
}

function TalentAnalyzerContent() {
  const { getThemeClasses } = useTheme();
  const { selectionCount } = useTalentSelection();

  return (
    <div className={`min-h-screen transition-colors ${getThemeClasses()}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Tales of Maj'Eyal - Talent Usage Analysis
        </h1>

        <TalentFilters />

        <SelectionSummary />

        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          <TalentResultsInfo />
        </div>

        <TalentGrid />
      </div>
    </div>
  );
}

function TalentResultsInfo() {
  const { filteredData } = useTalentFilters();
  const { selectionCount } = useTalentSelection();

  return (
    <>
      Showing {filteredData.length} talents
      {selectionCount > 0 && ` • ${selectionCount} cells selected`}
    </>
  );
}

export function TalentAnalyzerClient({ initialData }: TalentAnalyzerClientProps) {
  return (
    <TalentAnalyzerProvider initialData={initialData}>
      <TalentAnalyzerContent />
    </TalentAnalyzerProvider>
  );
}