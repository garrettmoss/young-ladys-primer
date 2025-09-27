/**
 * Settings Page Content - Young Lady's Primer
 *
 * Provides the settings interface where readers can customize their experience.
 * Currently includes reader name personalization with plans for additional
 * settings like themes, text size, and accessibility options.
 */

import { ProcessedStoryContent } from '../index';

/**
 * Settings page content with Victorian manuscript styling
 * @param readerName - Current reader's name for personalization
 * @returns Settings page content structure
 */
export const getSettingsContent = (readerName: string): ProcessedStoryContent => ({
  title: "Your Primer's Settings",
  content: `Dear ${readerName || 'Reader'},

Welcome to your Primer's configuration chamber, where you may adjust the sacred texts to better suit your noble preferences.

Here you may change the name by which the Primer shall know you, ensuring all tales and lessons are crafted specifically for your journey through the realms of knowledge.

<div class="mt-6 p-4 border border-amber-200 bg-amber-50/30 rounded">
<strong>Current Name:</strong> ${readerName || 'Not set'}
</div>`,
  choices: [
    {
      text: "Change my name",
      action: "change-name"
    },
    {
      text: "Return to my studies",
      action: "welcome"
    }
  ]
});