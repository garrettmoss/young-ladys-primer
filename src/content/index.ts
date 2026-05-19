/**
 * Content Management System - Young Lady's Primer
 *
 * This module is the public entry point for the content layer. It owns the
 * master content registry (`allContent`) and the `getContent` orchestration
 * function that ties everything together.
 *
 * The content layer is split into three files:
 *
 *   - `./types`    — pure type definitions (StoryContent, Kingdom, etc.)
 *   - `./adaptive` — the adaptive engine: level math, per-level shapes,
 *                    resolvers, runtime fallbacks
 *   - `./index`    — registry + getContent + getAllContentKeys (this file)
 *
 * All public types and adaptive helpers are re-exported from here, so
 * external code can keep importing from `'@/content'` or `'../content'`
 * without caring about the internal split.
 *
 * Adding New Content:
 * 1. Create content files in appropriate subfolder (stories/, lessons/, puzzles/)
 * 2. Export content objects following the StoryContent interface
 * 3. Import and spread into allContent registry below
 * 4. Content will automatically be available throughout the app
 */

import { welcomeContent } from './core/welcome';
import { buildAllKingdomHubs } from './core/kingdom-hub';
import { getSettingsContent } from './core/settings';
import { devToolsContent } from './core/dev-tools';
import { dragonStoryCollection } from './stories/dragon-story/index';
import { gardenStoryCollection } from './stories/garden-story/index';
import { nanotechnologyLessons } from './lessons/nanotechnology/index';
import { puzzleCollection } from './puzzles/index';
import { getStoryForContentKey } from './kingdoms';

import type { ContentContext, ProcessedStoryContent, StoryContent } from './types';
import {
  filterChoicesByLevel,
  resolveContentText,
  resolveTitle,
} from './adaptive';

// === Re-exports (public API) ===

export type {
  Choice,
  ContentContext,
  Kingdom,
  ProcessedStoryContent,
  Story,
  StoryArc,
  StoryContent,
} from './types';

export {
  LEVELS,
  levelForAge,
  levelRank,
  recommendLevel,
  resolveTitle,
  resolveContentText,
  filterChoicesByLevel,
} from './adaptive';

export type {
  AdaptiveContent,
  AdaptiveLevel,
  AdaptiveTitle,
  ReaderSignals,
} from './adaptive';

// === Content formatting ===

/**
 * Format raw content string into HTML for display.
 * Runs on all content body text (not titles or button labels).
 *
 * Handles:
 * - Double-newlines → <p> paragraph tags
 * - Single newlines within a paragraph → <br> line breaks
 * - **bold** → <strong>
 * - *italic* → <em>
 * - Existing HTML passes through untouched
 */
function formatContent(raw: string): string {
  return raw
    .split(/\n\n+/)
    .map(para => {
      let html = para.trim();
      // Bold first (** before *), then italic
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
      // Single newlines → line breaks
      html = html.replace(/\n/g, '<br>');
      return `<p>${html}</p>`;
    })
    .join('\n');
}

// === Content Registry ===

interface ContentRegistry {
  [key: string]: StoryContent;
}

/**
 * Master content registry that combines all content modules.
 *
 * This is the single source of truth for all interactive content.
 * New content modules should be imported above and added here.
 */
export const allContent: ContentRegistry = {
  ...welcomeContent,           // Library: kingdom selection (opening screen)
  ...buildAllKingdomHubs(),    // Per-kingdom hub pages (hub_<kingdomId>)
  ...devToolsContent,          // Developer tools (dev mode only)
  ...dragonStoryCollection,    // Main dragon story arc with multiple branches
  ...gardenStoryCollection,    // Cartographer's Garden arc
  ...nanotechnologyLessons,    // Educational content about molecular science
  ...puzzleCollection          // Interactive logic puzzles and challenges
};

// === Content access ===

/**
 * Retrieve and process content for display.
 *
 * Handles personalization by calling content functions with a context
 * object containing reader information and app state for adaptive content.
 * Works with all content types: stories, lessons, puzzles, settings,
 * debug pages, etc.
 *
 * @param contentKey - Unique identifier for the content block
 * @param context - Context object with reader info and app state
 * @returns Processed content ready for UI, or null if not found
 */
export const getContent = (contentKey: string, context: ContentContext): ProcessedStoryContent | null => {
  // Handle special dynamic content like settings
  if (contentKey === 'settings') {
    return getSettingsContent(context);
  }

  const content = allContent[contentKey];
  if (!content) return null;

  const story = getStoryForContentKey(contentKey);
  const useAdaptive = story?.adaptive === true;

  const rawContent = resolveContentText(content, context, useAdaptive);

  return {
    title: resolveTitle(content.title, context),
    content: formatContent(rawContent),
    choices: filterChoicesByLevel(
      content.choices,
      context.currentLevel,
      (key) => allContent[key],
    ),
  };
};

/**
 * Get all available content keys for debugging or content management
 * @returns Array of all content identifiers in the registry
 */
export const getAllContentKeys = (): string[] => Object.keys(allContent);
