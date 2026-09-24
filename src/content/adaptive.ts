/**
 * Adaptive engine.
 *
 * Reader-developmental tiers, per-level content shapes, and the resolvers
 * that pick the right rendering for the current reader. The runtime side
 * of the adaptive system lives here; pure types are in `./types`; the
 * registry and `getContent` orchestration are in `./index`.
 */

import type { Choice, ContentContext, ResolvedContent, StoryContent } from './types';

// === Levels ===

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
 * Map a reader's age to the appropriate adaptive level. Ages below the
 * seed range are clamped up; ages above fruit are clamped down. The bands
 * mirror the labels shown in Settings (seed 4–6, sprout 7–9, bloom 10–12,
 * fruit 13+).
 */
export function levelForAge(age: number): AdaptiveLevel {
  if (age <= 6) return 'seed';
  if (age <= 9) return 'sprout';
  if (age <= 12) return 'bloom';
  return 'fruit';
}

/**
 * Signals the adaptive engine uses to recommend a reader level.
 * Today: just age. Future: reading speed, choice patterns, time-on-page,
 * recent confusion signals, etc. Add fields here as the engine grows.
 */
export interface ReaderSignals {
  age: number;
}

/**
 * Recommend an adaptive level for a reader given the current signals.
 * Hooks should call this rather than levelForAge directly — it's the
 * single source of truth for "what level should this reader be on?"
 * and it'll grow smarter over time without changing its call sites.
 *
 * DESIGN: age is the anchor; level is the dial. This function maps
 * anchor → suggested dial. The reverse coupling does not exist — manual
 * level overrides in Settings do not propagate back to age.
 */
export function recommendLevel(signals: ReaderSignals): AdaptiveLevel {
  return levelForAge(signals.age);
}

// === Per-level content shapes ===

/**
 * Per-level renderings of a single story beat. The beat and feeling are
 * constant across levels; only the prose changes. A level may be omitted
 * if it doesn't yet exist — the renderer uses the nearest level below, or
 * a polite in-world placeholder if none exists.
 */
export interface AdaptiveContent {
  seed?: string | ((context: ContentContext) => string);
  sprout?: string | ((context: ContentContext) => string);
  bloom?: string | ((context: ContentContext) => string);
  fruit?: string | ((context: ContentContext) => string);
}

/**
 * Per-level renderings of a node title. All levels optional so authors can
 * fill in incrementally (Seed-first discipline). If the requested level is
 * missing, the resolver uses the nearest level below it — never above, so
 * a young reader never sees text written for an older one.
 * Use a plain string for non-adaptive content (welcome, hubs, lessons).
 */
export interface AdaptiveTitle {
  seed?: string;
  sprout?: string;
  bloom?: string;
  fruit?: string;
}

/**
 * Per-level renderings of a choice button's text. Same all-optional rule
 * and at-or-below fallback as AdaptiveTitle; "…" if nothing exists at or
 * below the reader's level.
 */
export interface AdaptiveChoiceText {
  seed?: string;
  sprout?: string;
  bloom?: string;
  fruit?: string;
}

// === Fallbacks ===

const MISSING_TITLE_FALLBACK = 'An unwritten page';
const MISSING_CONTENT_FALLBACK = 'This page hasn\'t grown yet.';
const MISSING_CHOICE_TEXT_FALLBACK = '…';

// === Markdown formatting (private helper) ===

/**
 * Format raw body text into HTML.
 * - Double-newlines → <p> paragraph tags
 * - Single newlines within a paragraph → <br> line breaks
 * - **bold** → <strong>
 * - *italic* → <em>
 * - Existing HTML passes through untouched
 */
function formatMarkdown(raw: string): string {
  return raw
    .split(/\n\n+/)
    .map(para => {
      let html = para.trim();
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
      html = html.replace(/\n/g, '<br>');
      return `<p>${html}</p>`;
    })
    .join('\n');
}

// === Resolvers ===

/**
 * Pick the requested level, or the nearest defined level *below* it.
 * Never borrows upward: a Seed reader must not see Fruit text. Returns
 * undefined if nothing exists at or below the requested level — callers
 * show their placeholder so the gap is obvious. Exported so the content
 * validator applies the exact same rule.
 */
export function levelAtOrBelow<T>(
  bag: Partial<Record<AdaptiveLevel, T>>,
  requested: AdaptiveLevel
): T | undefined {
  for (let rank = levelRank(requested); rank >= 0; rank--) {
    const value = bag[LEVELS[rank]];
    if (value !== undefined) return value;
  }
  return undefined;
}

/**
 * Resolve a node's title. Plain strings pass through; AdaptiveTitle objects
 * use at-or-below lookup before falling back to a placeholder.
 */
export function resolveTitle(
  title: string | AdaptiveTitle,
  context: ContentContext
): string {
  if (typeof title === 'string') return title;
  const level: AdaptiveLevel = context.currentLevel ?? 'fruit';
  return levelAtOrBelow(title, level) ?? MISSING_TITLE_FALLBACK;
}

/**
 * Resolve a choice button's text. Plain strings pass through;
 * AdaptiveChoiceText objects use at-or-below lookup.
 */
export function resolveChoiceText(
  text: string | AdaptiveChoiceText,
  context: ContentContext
): string {
  if (typeof text === 'string') return text;
  const level: AdaptiveLevel = context.currentLevel ?? 'fruit';
  return levelAtOrBelow(text, level) ?? MISSING_CHOICE_TEXT_FALLBACK;
}

/**
 * Resolve a node's body to render-ready HTML. Picks the right source
 * (adaptive variant for the reader's level, or the legacy `content` field),
 * evaluates any template function, then formats markdown to HTML.
 *
 * If an adaptive node is missing its requested level, uses the nearest
 * level below it (same rule as titles and choice text). If nothing exists
 * at or below, renders a polite in-world fallback rather than borrowing
 * higher-level prose. Fruit is the assumed top tier when no level is set.
 *
 * The caller decides whether to use the adaptive path (it depends on the
 * parent Story's `adaptive` flag from the kingdom registry).
 */
export function resolveBody(
  content: StoryContent,
  context: ContentContext,
  useAdaptive: boolean
): string {
  const raw = pickRawBody(content, context, useAdaptive);
  return formatMarkdown(raw);
}

function pickRawBody(
  content: StoryContent,
  context: ContentContext,
  useAdaptive: boolean
): string {
  if (useAdaptive && content.adaptiveContent) {
    const level: AdaptiveLevel = context.currentLevel ?? 'fruit';
    const rendering = levelAtOrBelow(content.adaptiveContent, level);
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
 * Whether resolveBody would render real prose for this node at the given
 * level, rather than the "hasn't grown yet" placeholder. Shares the
 * at-or-below lookup with the resolvers, so "is it written?" and "what
 * gets shown?" can't disagree.
 */
export function hasBodyAtOrBelow(
  content: StoryContent,
  level: AdaptiveLevel
): boolean {
  if (!content.adaptiveContent) return content.content !== undefined;
  return levelAtOrBelow(content.adaptiveContent, level) !== undefined;
}

/**
 * The whole page shown when a reader reaches a node with no prose at or
 * below their level (via dev tools or a saved position — normal play greys
 * out the choice leading here). Replaces the node's own title too, and
 * offers no forward choices; NavigationButtons still provides the way back.
 */
export function resolveUnwrittenPage(): ResolvedContent {
  return {
    title: MISSING_TITLE_FALLBACK,
    content: formatMarkdown(MISSING_CONTENT_FALLBACK),
    choices: [],
  };
}

/**
 * Drop any choices whose target node has a minLevel above the reader's
 * current tier. The reader sees fewer doors, never a locked one — the
 * gated path simply isn't visible. Choices to keys that don't exist in
 * the registry pass through (validator catches those).
 *
 * If currentLevel isn't set we treat the reader as `fruit` (the top tier),
 * which sees every door — matches the renderer's fall-through default.
 *
 * The `lookup` function returns the target node for a given key. Passed
 * in (rather than imported) so this module stays free of a runtime
 * dependency on the content registry.
 */
export function filterChoices(
  choices: Choice[],
  currentLevel: AdaptiveLevel | undefined,
  lookup: (key: string) => StoryContent | undefined
): Choice[] {
  const readerRank = levelRank(currentLevel ?? 'fruit');
  return choices.filter(choice => {
    const target = lookup(choice.action);
    if (!target?.minLevel) return true;
    return levelRank(target.minLevel) <= readerRank;
  });
}
