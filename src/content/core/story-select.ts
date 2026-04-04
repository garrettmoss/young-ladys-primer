import { arcs } from '../arcs';
import type { StoryContent } from '../index';

export const storySelectContent: { [key: string]: StoryContent } = {
  story_select: {
    title: "Which Story Shall We Enter?",
    content: () => `Every story is a door, dear reader, and behind each one waits a world that needs someone exactly like you.

Choose wisely — or rather, choose boldly. There are no wrong doors, only different adventures.`,
    choices: arcs
      .filter(arc => arc.status === 'available')
      .map(arc => ({
        text: `${arc.icon} ${arc.title}`,
        action: arc.entryPoint
      }))
  }
};
