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

import { welcomeContent } from './core/welcome';
import { buildAllKingdomHubs } from './core/kingdom-hub';
import { getSettingsContent } from './core/settings';
import { devToolsContent } from './core/dev-tools';
import { dragonStoryCollection } from './stories/dragon-story/index';
import { gardenStoryCollection } from './stories/garden-story/index';
import { nanotechnologyLessons } from './lessons/nanotechnology/index';
import { puzzleCollection } from './puzzles/index';
import { getStoryForContentKey } from './kingdoms';

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
  title: string;
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
 * Reader-developmental tiers for adaptive rendering. See OVERHAUL-PLAN.md
 * for the band definitions and the writing discipline that pairs with them.
 *
 * The tuple is the single source of truth: the type and the ordering both
 * derive from it. To add a new tier (e.g. a "sapling" between sprout and
 * bloom), insert it here in the right position and the rest follows.
 *
 * Compare levels via `levelRank(level)`, not string equality.
 */
export const LEVELS = ['seed', 'sprout', 'bloom', 'fruit'] as const;
export type AdaptiveLevel = typeof LEVELS[number];

export function levelRank(level: AdaptiveLevel): number {
  return LEVELS.indexOf(level);
}

/**
 * Per-level renderings of a single story beat. The beat and feeling are
 * constant across levels; only the prose changes. A level may be omitted
 * if it doesn't yet exist — the renderer falls back to the nearest available
 * level above the reader's tier.
 */
export interface AdaptiveContent {
  seed?: string | ((context: ContentContext) => string);
  sprout?: string | ((context: ContentContext) => string);
  bloom?: string | ((context: ContentContext) => string);
  fruit?: string | ((context: ContentContext) => string);
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
  ...welcomeContent,           // Library: kingdom selection (opening screen)
  ...buildAllKingdomHubs(),    // Per-kingdom hub pages (hub_<kingdomId>)
  ...devToolsContent,          // Developer tools (dev mode only)
  ...dragonStoryCollection,    // Main dragon story arc with multiple branches
  ...gardenStoryCollection,    // Cartographer's Garden arc
  ...nanotechnologyLessons,    // Educational content about molecular science
  ...puzzleCollection          // Interactive logic puzzles and challenges
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

  const rawContent = resolveContentText(contentKey, content, context);

  return {
    title: content.title,
    content: formatContent(rawContent),
    choices: content.choices,
  };
};

const MISSING_CONTENT_FALLBACK = 'This page hasn\'t grown yet.';

/**
 * Resolve a node's raw text. Adaptive stories read from `adaptiveContent` at
 * the reader's current level; plain stories use the legacy `content` field.
 *
 * If an adaptive node is missing its requested level (a writing-discipline
 * gap that the validator should catch), we render a polite in-world fallback
 * rather than crash. Fruit is the assumed top tier when no level is set.
 */
function resolveContentText(
  contentKey: string,
  content: StoryContent,
  context: ContentContext
): string {
  const story = getStoryForContentKey(contentKey);
  const useAdaptive = story?.adaptive === true && content.adaptiveContent;

  if (useAdaptive) {
    const level: AdaptiveLevel = context.currentLevel ?? 'fruit';
    const rendering = content.adaptiveContent![level];
    if (rendering !== undefined) {
      return typeof rendering === 'function' ? rendering(context) : rendering;
    }
    return MISSING_CONTENT_FALLBACK;
  }

  if (content.content === undefined) return MISSING_CONTENT_FALLBACK;
  return typeof content.content === 'function'
    ? content.content(context)
    : content.content;
}

/**
 * Get all available content keys for debugging or content management
 * @returns Array of all content identifiers in the registry (stories, lessons, puzzles, etc.)
 */
export const getAllContentKeys = (): string[] => Object.keys(allContent);