/**
 * Utility functions for color coding talent investment values
 */

/**
 * Gets appropriate background color classes for investment percentage values
 * Higher percentages = more investment (deeper/warmer colors)
 * Lower percentages = less investment (lighter/cooler colors)
 * 
 * @param percentage - The investment percentage value (0-100)
 * @returns Tailwind CSS classes for background and text colors
 */
export function getInvestmentColorClasses(percentage: number): string {
  // Higher percentages mean MORE investment, so deeper colors for higher values
  // Dark mode variants provide better contrast against dark table backgrounds
  
  if (percentage >= 90) {
    // Very high investment - dark red/maroon with dark mode variant
    return 'bg-red-900 dark:bg-red-800 text-white';
  } else if (percentage >= 75) {
    // High investment - red with dark mode variant
    return 'bg-red-700 dark:bg-red-600 text-white';
  } else if (percentage >= 60) {
    // Good investment - orange-red with dark mode variant
    return 'bg-red-500 dark:bg-red-500 text-white';
  } else if (percentage >= 45) {
    // Moderate investment - orange with dark mode variant
    return 'bg-orange-500 dark:bg-orange-600 text-white';
  } else if (percentage >= 30) {
    // Some investment - yellow with dark mode variant
    return 'bg-yellow-500 dark:bg-yellow-600 text-black dark:text-white';
  } else if (percentage >= 15) {
    // Low investment - green with dark mode variant
    return 'bg-green-400 dark:bg-green-600 text-black dark:text-white';
  } else {
    // Very low investment - gray with dark mode variant
    return 'bg-gray-300 dark:bg-gray-600 text-black dark:text-white';
  }
}

/**
 * Gets a more subtle color scheme for selected cells
 * @param percentage - The investment percentage value
 * @param isSelected - Whether the cell is currently selected
 * @returns Tailwind CSS classes
 */
export function getInvestmentColorClassesWithSelection(percentage: number, isSelected: boolean): string {
  const baseClasses = getInvestmentColorClasses(percentage);
  
  if (isSelected) {
    return `${baseClasses} shadow-[inset_0_0_0_3px_#2563eb] dark:shadow-[inset_0_0_0_3px_#60a5fa]`;
  }
  
  return baseClasses;
}