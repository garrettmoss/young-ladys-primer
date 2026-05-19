/**
 * Content model types.
 *
 * Pure type definitions for the Primer's content layer. No runtime logic
 * lives here — see `./adaptive` for the adaptive engine (level math,
 * resolvers, fallbacks) and `./index` for the registry and `getContent`
 * orchestration.
 */

import type { AdaptiveLevel, AdaptiveContent, AdaptiveTitle } from './adaptive';

/**
 * Context object passed to content functions for personalization.
 * Allows content to access reader information and app state for adaptive
 * rendering. Expand here (not in callers) when new reader signals are
 * needed by content authors.
 */
export interface ContentContext {
  readerName: string; // Reader's chosen name for personalization
  currentLevel?: AdaptiveLevel; // Reader's adaptive tier (Phase 3a). Renderer falls back to fruit if absent.
  // Future adaptive learning variables can be added here without breaking existing content:
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
  tag?: string;   // Optional italic suffix label (e.g. "legacy") — rendered separately from text
}

/**
 * One narrative arc within a Kingdom. A Story owns a set of content keys
 * and an entry point; most kingdoms today have exactly one story, but the
 * schema leaves room for multiple.
 *
 * `adaptive: false` signals the renderer to use the plain `content` field on
 * each node (legacy behavior). Adaptive stories (Phase 3) will read from the
 * Seed/Sprout/Bloom/Fruit renderings instead.
 */
export interface Story {
  id: string;
  title: string;
  kingdomId: string;
  entryPoint: string;
  contentKeys: string[];
  status: 'active' | 'legacy' | 'draft';
  adaptive?: boolean;
}

/**
 * A self-contained world: tone, setting, lessons, puzzles, and one or more
 * Stories. Kingdoms are the top tier of the content library.
 */
export interface Kingdom {
  id: string;
  title: string;
  description: string;
  hubIntro?: string | ((context: ContentContext) => string);
  entryStoryId: string;
  stories: Story[];
  lessons: string[];
  lessonEntry?: string;
  puzzles: string[];
  puzzleEntry?: string;
  icon?: string;
  status: 'active' | 'legacy' | 'draft';
}

/**
 * @deprecated Use `Story` instead. Kept for one migration cycle.
 */
export type StoryArc = Story;

/**
 * Raw story content as stored in content files
 * Content can be static string or personalized function that receives context
 */
export interface StoryContent {
  title: string | AdaptiveTitle;
  // `content` is the legacy plain-text field. Required for non-adaptive
  // nodes; omitted on adaptive nodes (which use `adaptiveContent` instead).
  content?: string | ((context: ContentContext) => string);
  choices?: Choice[]; // Optional - some content may have no choices (endings, lessons)
  // Adaptive-content fields (Phase 3a). Present on nodes in adaptive stories.
  // The renderer prefers these when the parent Story has `adaptive: true`.
  beat?: string;
  feeling?: string;
  adaptiveContent?: AdaptiveContent;
  minLevel?: AdaptiveLevel;
}

/**
 * Processed story content ready for UI consumption.
 * Content is always a string after processing.
 */
export interface ProcessedStoryContent {
  title: string;
  content: string;
  choices?: Choice[];
}
