import { StoryContent } from '../index';

/**
 * Debug page - only accessible in development mode
 * Provides tools for testing and inspecting application state
 */

const debugPage: StoryContent = {
  title: 'Developer Tools',
  content: `
<strong>Development Mode Active</strong>

This page provides debugging utilities for testing the Primer's behavior. It will not appear in production builds.

<strong>LocalStorage Contents:</strong>

The following data is currently stored in your browser:
  `.trim(),
  choices: [
    {
      text: '🗑️ Clear All Data (Reset Everything)',
      action: 'debug_clear_all'
    },
    {
      text: '👤 Reset to First Time User (Clear Name & Progress)',
      action: 'debug_reset_user'
    },
    {
      text: '🏠 Return to Welcome',
      action: 'welcome'
    }
  ]
};

/**
 * Debug action handlers
 * These are special actions that perform debug operations
 */

const debugClearAll: StoryContent = {
  title: 'Confirm: Clear All Data?',
  content: `
<strong style="color: #dc2626;">⚠️ Warning: Destructive Action</strong>

This will permanently delete ALL data stored in localStorage, including:
- Your reader name
- Story progress and navigation history
- Dark mode preference
- All conversation history

The page will reload after clearing.

Are you sure you want to proceed?
  `.trim(),
  choices: [
    {
      text: '❌ Cancel (Go Back)',
      action: 'debug'
    },
    {
      text: '✓ Yes, Clear Everything',
      action: 'debug_confirm_clear_all'
    }
  ]
};

const debugResetUser: StoryContent = {
  title: 'Confirm: Reset User Data?',
  content: `
<strong style="color: #dc2626;">⚠️ Warning: Partial Reset</strong>

This will clear:
- Your reader name (you'll be prompted to re-enter it)
- Story progress and navigation history
- Conversation history

This will preserve:
- Dark mode preference

The page will reload after resetting.

Are you sure you want to proceed?
  `.trim(),
  choices: [
    {
      text: '❌ Cancel (Go Back)',
      action: 'debug'
    },
    {
      text: '✓ Yes, Reset User Data',
      action: 'debug_confirm_reset_user'
    }
  ]
};

/**
 * Export all debug content
 */
export const debugContent = {
  debug: debugPage,
  debug_clear_all: debugClearAll,
  debug_reset_user: debugResetUser
};
