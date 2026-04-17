/**
 * Kingdom Hub Generator
 *
 * Produces one hub page per kingdom ("hub_<kingdomId>") from a single template.
 * Each hub offers the reader the standard choices — story, lesson, puzzle —
 * filtered to what the kingdom actually has.
 */

import { getAllKingdoms } from '../kingdoms';
import type { Choice, ContentContext, Kingdom, StoryContent } from '../index';

export function hubKeyFor(kingdomId: string): string {
  return `hub_${kingdomId}`;
}

export function buildKingdomHub(kingdom: Kingdom): StoryContent {
  const entryStory = kingdom.stories.find(s => s.id === kingdom.entryStoryId);

  // Always emit the full shape of what a kingdom *can* hold. Empty slots route
  // to a placeholder action so ChoiceButton greys them out with "(Coming soon)".
  const storyAction = entryStory?.entryPoint ?? `__placeholder_story_${kingdom.id}`;
  const lessonAction = kingdom.lessons.length > 0
    ? (kingdom.lessonEntry ?? kingdom.lessons[0])
    : `__placeholder_lesson_${kingdom.id}`;
  const puzzleAction = kingdom.puzzles.length > 0
    ? (kingdom.puzzleEntry ?? kingdom.puzzles[0])
    : `__placeholder_puzzle_${kingdom.id}`;

  const choices: Choice[] = [
    { text: 'Tell me a story', action: storyAction },
    { text: 'Teach me something new', action: lessonAction },
    { text: 'Show me a puzzle', action: puzzleAction },
    { text: 'Choose a different kingdom', action: 'welcome' }
  ];

  const intro = kingdom.hubIntro ?? kingdom.description;

  return {
    title: kingdom.title,
    content: typeof intro === 'function'
      ? (ctx: ContentContext) => intro(ctx)
      : () => intro,
    choices
  };
}

export function buildAllKingdomHubs(): { [key: string]: StoryContent } {
  return Object.fromEntries(
    getAllKingdoms()
      .filter(k => k.status !== 'draft')
      .map(k => [hubKeyFor(k.id), buildKingdomHub(k)])
  );
}
