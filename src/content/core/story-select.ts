import { getActiveKingdoms, getKingdomById } from '../kingdoms';
import type { StoryContent } from '../index';

export const storySelectContent: { [key: string]: StoryContent } = {
  story_select: {
    title: "Which Story Shall We Enter?",
    content: () => `Every story is a door, dear reader, and behind each one waits a world that needs someone exactly like you.

Choose wisely — or rather, choose boldly. There are no wrong doors, only different adventures.`,
    choices: getActiveKingdoms()
      .map(kingdom => {
        const entryStory = kingdom.stories.find(s => s.id === kingdom.entryStoryId);
        return entryStory ? { text: kingdom.title, action: entryStory.entryPoint } : null;
      })
      .filter((c): c is { text: string; action: string } => c !== null)
  }
};

// Re-export for any consumers that still want to look up a kingdom by id.
export { getKingdomById };
