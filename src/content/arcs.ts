/**
 * Story Arc Registry
 *
 * Central registry of all story arcs in the Primer.
 * Arcs are metadata layered on top of the flat allContent map —
 * they group content keys, define entry points, and associate
 * related lessons and puzzles.
 *
 * To add a new arc:
 * 1. Create arc content in src/content/stories/<arc-name>/
 * 2. Export a StoryArc object from that folder's index.ts
 * 3. Import and add it to the `arcs` array below
 */

import type { StoryArc } from './index';
import { dragonArc } from './stories/dragon-story/index';

export const arcs: StoryArc[] = [
  dragonArc
];

export function getArcById(id: string): StoryArc | undefined {
  return arcs.find(arc => arc.id === id);
}

export function getArcForContentKey(key: string): StoryArc | undefined {
  return arcs.find(arc =>
    arc.contentKeys.includes(key) ||
    arc.lessons.includes(key) ||
    arc.puzzles.includes(key)
  );
}

export function getArcEntryPoints(): string[] {
  return arcs.map(arc => arc.entryPoint);
}
