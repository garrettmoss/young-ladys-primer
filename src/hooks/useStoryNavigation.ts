/**
 * Story Navigation Hook - Young Lady's Primer
 * 
 * Custom React hook that manages all navigation state and history for the interactive
 * primer. Handles story progression, tracks reader's journey, and provides utilities
 * for navigation control.
 * 
 * This hook separates navigation logic from UI rendering, following the principle
 * of separation of concerns. The main component focuses purely on presentation
 * while this hook manages all stateful navigation behavior.
 * 
 * Future enhancements could include:
 * - localStorage persistence for progress across sessions
 * - Achievement tracking based on story completion
 * - Analytics for understanding reader behavior patterns
 * - Branching path recommendations
 */

import { useState } from 'react';

// === TYPE DEFINITIONS ===

/**
 * Represents a single navigation event in the reader's journey
 * Used for tracking reading patterns and potential back-navigation features
 */
interface NavigationHistoryItem {
  from: string;       // Story key the reader came from
  to: string;         // Story key the reader navigated to
  timestamp: Date;    // When the navigation occurred
}

/**
 * Tracks which stories/pages the reader has visited
 * Used for progress indicators and achievement tracking
 */
interface StoryProgress {
  [key: string]: boolean; // story key -> has been visited
}

// === NAVIGATION HOOK ===

/**
 * Custom hook for managing story navigation and progress tracking
 * 
 * @param initialStory - Starting story key (defaults to 'welcome')
 * @returns Navigation state and control functions
 */
export const useStoryNavigation = (initialStory: string = 'welcome') => {
  // Navigation State
  const [currentStory, setCurrentStory] = useState<string>(initialStory);
  const [storyProgress, setStoryProgress] = useState<StoryProgress>({});
  const [conversationHistory, setConversationHistory] = useState<NavigationHistoryItem[]>([]);

  /**
   * Navigate to a new story/page
   * 
   * Marks current story as visited, updates current location, and logs
   * the navigation event for history tracking.
   * 
   * @param action - The story key to navigate to
   */
  const navigateToStory = (action: string): void => {
    // Mark current story as completed/visited
    setStoryProgress(prev => ({ ...prev, [currentStory]: true }));
    
    // Update current location
    setCurrentStory(action);
    
    // Log navigation event for history and analytics
    setConversationHistory(prev => [...prev, {
      from: currentStory,
      to: action,
      timestamp: new Date()
    }]);
  };

  /**
   * Return to the welcome/start screen
   * 
   * Useful for "home" buttons or when reader wants to start over.
   * Does not clear progress - reader can continue where they left off.
   */
  const resetToWelcome = (): void => {
    setCurrentStory('welcome');
  };

  // Return navigation state and control functions
  return {
    currentStory,        // Current story/page identifier
    storyProgress,       // Object tracking visited stories  
    conversationHistory, // Array of all navigation events
    navigateToStory,     // Function to move to new story
    resetToWelcome       // Function to return to start
  };
};