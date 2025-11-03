/**
 * Content Management System - Young Lady's Primer
 * 
 * This module manages all story content, lessons, and interactive choices for the primer.
 * Content is organized modularly by theme (stories, lessons, puzzles) and supports
 * personalization through template functions.
 * 
 * Architecture:
 * - Modular content organization in separate folders
 * - TypeScript interfaces for type safety and validation
 * - Personalization support via function-based content templates
 * - Centralized content registry for easy expansion
 * 
 * Adding New Content:
 * 1. Create content files in appropriate subfolder (stories/, lessons/, puzzles/)
 * 2. Export content objects following the StoryContent interface
 * 3. Import and spread into allContent registry below
 * 4. Content will automatically be available throughout the app
 */

import { welcomeContent } from './core/welcome';
import { getSettingsContent } from './core/settings';
import { debugContent } from './core/debug';
import { dragonStoryCollection } from './stories/dragon-story/index';
import { lessonNavigation } from './lessons/index';
import { nanotechnologyLessons } from './lessons/nanotechnology/index';
import { puzzleCollection } from './puzzles/index';

// === TYPE DEFINITIONS ===

/**
 * Context object passed to content functions for personalization
 * This allows content to access reader information and app state for adaptive content.
 *
 * Future expansion ready for Phase 3 adaptive learning features:
 * - readingLevel: Adapt difficulty to reader's ability
 * - choiceHistory: Enable narrative branching based on past decisions
 * - completedStories: Progress-based content unlocking
 * - preferences: Reader co-creation and customization
 */
export interface ContentContext {
  readerName: string; // Reader's chosen name for personalization
  // Future adaptive learning variables can be added here without breaking existing content:
  // readingLevel?: string;
  // choiceHistory?: string[];
  // completedStories?: string[];
  // multipleIntelligences?: Record<string, number>;
  // preferences?: Record<string, any>;
}

/**
 * Represents a user choice in an interactive story
 */
export interface Choice {
  text: string;   // Display text shown to the user
  action: string; // Story key to navigate to when selected
}

/**
 * Raw story content as stored in content files
 * Content can be static string or personalized function that receives context
 */
export interface StoryContent {
  title: string;
  content: string | ((context: ContentContext) => string);
  choices?: Choice[]; // Optional - some content may have no choices (endings, lessons)
}

/**
 * Processed story content ready for UI consumption
 * Content is always a string after processing
 */
export interface ProcessedStoryContent {
  title: string;
  content: string; // Always string after processing personalization
  choices?: Choice[];
}

/**
 * Registry interface for organizing all content by unique keys
 */
interface ContentRegistry {
  [key: string]: StoryContent;
}

// === CONTENT REGISTRY ===

/**
 * Master content registry that combines all content modules
 * 
 * This is the single source of truth for all interactive content.
 * New content modules should be imported above and added here.
 */
export const allContent: ContentRegistry = {
  ...welcomeContent,        // Core navigation and welcome screens
  ...debugContent,          // Developer tools (dev mode only)
  ...lessonNavigation,      // Lesson category selection screen
  ...dragonStoryCollection, // Main dragon story arc with multiple branches
  ...nanotechnologyLessons, // Educational content about molecular science
  ...puzzleCollection       // Interactive logic puzzles and challenges
};

// === CONTENT ACCESS FUNCTIONS ===

/**
 * Retrieve and process content for display
 *
 * Handles personalization by calling content functions with context object
 * containing reader information and app state for adaptive content.
 *
 * Works with all content types: stories, lessons, puzzles, settings, debug pages, etc.
 *
 * @param contentKey - Unique identifier for the content block
 * @param context - Context object with reader info and app state for personalization
 * @returns Processed content ready for UI, or null if not found
 */
export const getContent = (contentKey: string, context: ContentContext): ProcessedStoryContent | null => {
  // Handle special dynamic content like settings
  if (contentKey === 'settings') {
    return getSettingsContent(context);
  }

  const content = allContent[contentKey];
  if (!content) return null;

  return {
    ...content,
    // Process personalization: convert functions to strings using context
    content: typeof content.content === 'function'
      ? content.content(context)
      : content.content
  };
};

/**
 * Get all available content keys for debugging or content management
 * @returns Array of all content identifiers in the registry (stories, lessons, puzzles, etc.)
 */
export const getAllContentKeys = (): string[] => Object.keys(allContent);