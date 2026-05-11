/**
 * Kingdom Registry
 *
 * Central registry of all kingdoms in the Primer. A Kingdom is a self-contained
 * world; a Story is one narrative arc inside a kingdom. Today each kingdom has
 * exactly one story; the schema leaves room for more.
 *
 * To add a new kingdom:
 * 1. Create content in src/content/stories/<kingdom-name>/
 * 2. Export a Kingdom object from that folder's index.ts
 * 3. Import and add it to the `kingdoms` array below
 */

import type { Kingdom, Story } from './index';
import { dragonKingdom } from './stories/dragon-story/index';
import { gardenKingdom } from './stories/garden-story/index';

export const kingdoms: Kingdom[] = [
  gardenKingdom,
  dragonKingdom
];

export function getAllKingdoms(): Kingdom[] {
  return kingdoms;
}

export function getActiveKingdoms(): Kingdom[] {
  return kingdoms.filter(k => k.status === 'active');
}

export function getKingdomById(id: string): Kingdom | undefined {
  return kingdoms.find(k => k.id === id);
}

export function getStoryById(id: string): Story | undefined {
  for (const kingdom of kingdoms) {
    const story = kingdom.stories.find(s => s.id === id);
    if (story) return story;
  }
  return undefined;
}

export function getKingdomForContentKey(key: string): Kingdom | undefined {
  return kingdoms.find(kingdom =>
    kingdom.stories.some(s => s.contentKeys.includes(key)) ||
    kingdom.lessons.includes(key) ||
    kingdom.puzzles.includes(key)
  );
}

/**
 * Find the Story (if any) that owns a given content key. Used by the renderer
 * to decide between adaptive and plain rendering paths.
 */
export function getStoryForContentKey(key: string): Story | undefined {
  for (const kingdom of kingdoms) {
    const story = kingdom.stories.find(s => s.contentKeys.includes(key));
    if (story) return story;
  }
  return undefined;
}

/**
 * Entry points across all kingdoms (active + legacy) for graph validation.
 */
export function getKingdomEntryPoints(): string[] {
  return kingdoms.flatMap(k => k.stories.map(s => s.entryPoint));
}
