/**
 * Tales of Maj'Eyal Talent Analyzer - Server Component
 * 
 * This page follows Next.js App Router best practices:
 * - Server Component for data processing and static rendering
 * - Client Components for interactivity
 * - Proper separation of concerns
 */

import { Suspense } from 'react';
import { processTalentData } from '../lib/server/talentProcessor';
import { TalentAnalyzerClient } from '../lib/components/TalentAnalyzerClient';

/**
 * Server Component - handles data processing on the server
 * This provides better performance and SEO than client-side processing
 */
export default async function TalentAnalyzerPage() {
  // Process talent data on the server
  const processedData = await processTalentData();

  return (
    <main>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg">Loading talent data...</p>
          </div>
        </div>
      }>
        <TalentAnalyzerClient initialData={processedData} />
      </Suspense>
    </main>
  );
}

/**
 * Generate metadata for the page
 */
export const metadata = {
  title: 'ToME Talent Analyzer - Usage Statistics',
  description: 'Analyze talent usage statistics and point distributions for Tales of Maj\'Eyal',
};