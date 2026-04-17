/**
 * Welcome / Library
 *
 * The opening screen of the Primer. Lists every non-draft kingdom as a choice;
 * each leads into that kingdom's hub page. Legacy kingdoms are shown with a
 * small "(prototype)" suffix so the reader knows what they're stepping into.
 */

import { getAllKingdoms } from '../kingdoms';
import { hubKeyFor } from './kingdom-hub';
import type { Choice, StoryContent } from '../index';

function buildWelcome(): StoryContent {
  const kingdomChoices: Choice[] = getAllKingdoms()
    .filter(k => k.status !== 'draft')
    .map(k => ({
      text: k.status === 'legacy' ? `${k.title} (prototype)` : k.title,
      action: hubKeyFor(k.id)
    }));

  const choices: Choice[] = [
    ...kingdomChoices,
    { text: 'Help me understand myself', action: 'reflection' }
  ];

  return {
    title: "Welcome to Your Primer",
    content: () => `Greetings, young reader. I am your Primer, crafted with care to be your guide, teacher, and companion through the vast realms of knowledge and imagination.

Each kingdom below holds its own stories, its own puzzles, its own ways of seeing. Step through whichever door calls to you — you can always return and choose another.`,
    choices
  };
}

export const welcomeContent: { [key: string]: StoryContent } = {
  welcome: buildWelcome()
};
