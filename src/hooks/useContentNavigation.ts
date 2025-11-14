/**
 * Content Navigation Hook - Young Lady's Primer
 *
 * Custom React hook that manages all navigation state and history for the interactive
 * primer. Handles content progression (stories, lessons, puzzles, etc.), tracks reader's
 * journey, and provides utilities for navigation control.
 *
 * This hook separates navigation logic from UI rendering, following the principle
 * of separation of concerns. The main component focuses purely on presentation
 * while this hook manages all stateful navigation behavior.
 *
 * Features:
 * - localStorage persistence for progress across sessions
 * - Navigation history tracking for analytics
 * - Progress indicators for visited content
 *
 * Future enhancements could include:
 * - Achievement tracking based on content completion
 * - Analytics for understanding reader behavior patterns
 * - Branching path recommendations
 */

import { useState, useEffect } from 'react';

// === CONSTANTS ===

/**
 * localStorage keys for persisting navigation state
 */
const STORAGE_KEYS = {
  CURRENT_CONTENT: 'young-ladys-primer-current-content',
  CONTENT_PROGRESS: 'young-ladys-primer-content-progress',
  CONVERSATION_HISTORY: 'young-ladys-primer-history'
} as const;

/**
 * Maximum number of navigation history items to keep in memory and storage.
 * Prevents unbounded growth of localStorage. With 50 items, storage stays
 * under ~4 KB even with long content keys. Users rarely need more than
 * 50 back-navigation steps.
 */
const MAX_HISTORY_LENGTH = 50;

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
  from: string;       // Content key the reader came from
  to: string;         // Content key the reader navigated to
  timestamp: Date;    // When the navigation occurred
}

/**
 * Tracks which content blocks the reader has visited
 * Used for progress indicators and achievement tracking
 */
interface ContentProgress {
  [key: string]: boolean; // content key -> has been visited
}

// === NAVIGATION HOOK ===

/**
 * Custom hook for managing content navigation and progress tracking
 *
 * Handles navigation for all content types: stories, lessons, puzzles, settings, etc.
 *
 * @param initialContent - Starting content key (defaults to 'welcome')
 * @returns Navigation state and control functions
 */
export const useContentNavigation = (initialContent: string = 'welcome') => {
  // Navigation State - initialized from localStorage or defaults
  const [currentContent, setCurrentContent] = useState<string>(() =>
    loadFromStorage(STORAGE_KEYS.CURRENT_CONTENT, initialContent)
  );
  const [contentProgress, setContentProgress] = useState<ContentProgress>(() =>
    loadFromStorage(STORAGE_KEYS.CONTENT_PROGRESS, {})
  );
  const [conversationHistory, setConversationHistory] = useState<NavigationHistoryItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.CONVERSATION_HISTORY, [])
  );

  // Persist state changes to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CURRENT_CONTENT, currentContent);
  }, [currentContent]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CONTENT_PROGRESS, contentProgress);
  }, [contentProgress]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CONVERSATION_HISTORY, conversationHistory);
  }, [conversationHistory]);

  /**
   * Navigate to new content (story, lesson, puzzle, settings, etc.)
   *
   * Marks current content as visited, updates current location, and logs
   * the navigation event for history tracking.
   *
   * @param action - The content key to navigate to
   */
  const navigateToContent = (action: string): void => {
    // Mark current content as completed/visited
    setContentProgress(prev => ({ ...prev, [currentContent]: true }));

    // Update current location
    setCurrentContent(action);

    // Log navigation event for history and analytics
    setConversationHistory(prev => {
      const newHistory = [...prev, {
        from: currentContent,
        to: action,
        timestamp: new Date()
      }];

      // Trim history to MAX_HISTORY_LENGTH to prevent unbounded growth
      // Keep only the most recent items since users rarely need 50+ back steps
      if (newHistory.length > MAX_HISTORY_LENGTH) {
        return newHistory.slice(-MAX_HISTORY_LENGTH);
      }

      return newHistory;
    });
  };

  /**
   * Return to the welcome/start screen
   *
   * Useful for "home" buttons or when reader wants to start over.
   * Does not clear progress - reader can continue where they left off.
   * Clears navigation history since the back button is not shown on welcome screen.
   */
  const resetToWelcome = (): void => {
    setCurrentContent('welcome');
    // Clear history when returning to welcome since back button won't be shown anyway
    // This prevents history from accumulating across multiple reading sessions
    setConversationHistory([]);
  };

  /**
   * Navigate back to the previous content
   *
   * Uses conversation history to return to the last visited content.
   * Does nothing if there's no previous content to return to.
   */
  const goBack = (): boolean => {
    if (conversationHistory.length === 0) return false;

    // Get the last navigation event and go back to where we came from
    const lastNavigation = conversationHistory[conversationHistory.length - 1];
    const previousContent = lastNavigation.from;

    // Remove the last navigation from history to prevent infinite back loops
    setConversationHistory(prev => prev.slice(0, -1));

    // Navigate to previous content without adding to history again
    setCurrentContent(previousContent);

    return true; // Successfully went back
  };

  /**
   * Check if back navigation is available
   * @returns true if there are previous content blocks to navigate back to
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
    setCurrentContent(initialContent);
    setContentProgress({});
    setConversationHistory([]);
  };

  // Return navigation state and control functions
  return {
    currentContent,        // Current content identifier (story, lesson, puzzle, etc.)
    contentProgress,       // Object tracking visited content
    conversationHistory,   // Array of all navigation events
    navigateToContent,     // Function to move to new content
    resetToWelcome,        // Function to return to start
    goBack,                // Function to navigate back to previous content
    canGoBack,             // Function to check if back navigation is available
    clearAllProgress       // Function to clear all saved progress
  };
};