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
import { dragonStoryCollection } from './stories/dragon-story/index';
import { lessonNavigation } from './lessons/index';
import { nanotechnologyLessons } from './lessons/nanotechnology/index';
import { puzzleCollection } from './puzzles/index';

// === TYPE DEFINITIONS ===

/**
 * Represents a user choice in an interactive story
 */
export interface Choice {
  text: string;   // Display text shown to the user
  action: string; // Story key to navigate to when selected
}

/**
 * Raw story content as stored in content files
 * Content can be static string or personalized function
 */
interface StoryContent {
  title: string;
  content: string | ((readerName: string) => string);
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
  ...lessonNavigation,      // Lesson category selection screen
  ...dragonStoryCollection, // Main dragon story arc with multiple branches  
  ...nanotechnologyLessons, // Educational content about molecular science
  ...puzzleCollection       // Interactive logic puzzles and challenges
};

// === CONTENT ACCESS FUNCTIONS ===

/**
 * Retrieve and process story content for display
 * 
 * Handles personalization by calling content functions with reader's name
 * and returns ready-to-render content with consistent interface.
 * 
 * @param storyKey - Unique identifier for the story/content
 * @param readerName - Reader's name for personalization (defaults to 'Aria')
 * @returns Processed content ready for UI, or null if not found
 */
export const getStoryContent = (storyKey: string, readerName: string = 'Aria'): ProcessedStoryContent | null => {
  const story = allContent[storyKey];
  if (!story) return null;
  
  return {
    ...story,
    // Process personalization: convert functions to strings using reader's name
    content: typeof story.content === 'function' 
      ? story.content(readerName) 
      : story.content
  };
};

/**
 * Get all available story keys for debugging or content management
 * @returns Array of all story identifiers in the content registry
 */
export const getAllStoryKeys = (): string[] => Object.keys(allContent);