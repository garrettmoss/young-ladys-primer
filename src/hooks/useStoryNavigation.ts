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
 * Features:
 * - localStorage persistence for progress across sessions
 * - Navigation history tracking for analytics
 * - Progress indicators for completed stories
 * 
 * Future enhancements could include:
 * - Achievement tracking based on story completion
 * - Analytics for understanding reader behavior patterns
 * - Branching path recommendations
 */

import { useState, useEffect } from 'react';

// === CONSTANTS ===

/**
 * localStorage keys for persisting navigation state
 */
const STORAGE_KEYS = {
  CURRENT_STORY: 'young-ladys-primer-current-story',
  STORY_PROGRESS: 'young-ladys-primer-progress',
  CONVERSATION_HISTORY: 'young-ladys-primer-history'
} as const;

// === STORAGE HELPERS ===

/**
 * Safely load data from localStorage with fallback
 * @param key - localStorage key
 * @param fallback - default value if not found or error
 */
const loadFromStorage = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback; // SSR safety
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`Failed to load ${key} from localStorage:`, error);
    return fallback;
  }
};

/**
 * Safely save data to localStorage
 * @param key - localStorage key
 * @param value - value to store
 */
const saveToStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return; // SSR safety
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to save ${key} to localStorage:`, error);
  }
};

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
  // Navigation State - initialized from localStorage or defaults
  const [currentStory, setCurrentStory] = useState<string>(() =>
    loadFromStorage(STORAGE_KEYS.CURRENT_STORY, initialStory)
  );
  const [storyProgress, setStoryProgress] = useState<StoryProgress>(() =>
    loadFromStorage(STORAGE_KEYS.STORY_PROGRESS, {})
  );
  const [conversationHistory, setConversationHistory] = useState<NavigationHistoryItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.CONVERSATION_HISTORY, [])
  );

  // Persist state changes to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CURRENT_STORY, currentStory);
  }, [currentStory]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.STORY_PROGRESS, storyProgress);
  }, [storyProgress]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CONVERSATION_HISTORY, conversationHistory);
  }, [conversationHistory]);

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

  /**
   * Navigate back to the previous story
   * 
   * Uses conversation history to return to the last visited story.
   * Does nothing if there's no previous story to return to.
   */
  const goBack = (): boolean => {
    if (conversationHistory.length === 0) return false;

    // Get the last navigation event and go back to where we came from
    const lastNavigation = conversationHistory[conversationHistory.length - 1];
    const previousStory = lastNavigation.from;

    // Remove the last navigation from history to prevent infinite back loops
    setConversationHistory(prev => prev.slice(0, -1));
    
    // Navigate to previous story without adding to history again
    setCurrentStory(previousStory);

    return true; // Successfully went back
  };

  /**
   * Check if back navigation is available
   * @returns true if there are previous stories to navigate back to
   */
  const canGoBack = (): boolean => {
    return conversationHistory.length > 0;
  };

  /**
   * Clear all progress and start fresh
   * 
   * Removes all localStorage data and resets to initial state.
   * Use sparingly - this will lose all reader progress permanently.
   */
  const clearAllProgress = (): void => {
    // Clear localStorage
    Object.values(STORAGE_KEYS).forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn(`Failed to clear ${key} from localStorage:`, error);
      }
    });

    // Reset state
    setCurrentStory(initialStory);
    setStoryProgress({});
    setConversationHistory([]);
  };

  // Return navigation state and control functions
  return {
    currentStory,        // Current story/page identifier
    storyProgress,       // Object tracking visited stories  
    conversationHistory, // Array of all navigation events
    navigateToStory,     // Function to move to new story
    resetToWelcome,      // Function to return to start
    goBack,              // Function to navigate back to previous story
    canGoBack,           // Function to check if back navigation is available
    clearAllProgress     // Function to clear all saved progress
  };
};