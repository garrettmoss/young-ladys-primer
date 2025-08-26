import { welcomeContent } from './core/welcome.js';
import { dragonStoryCollection } from './stories/dragon-story/index.js';
import { nanotechnologyLessons } from './lessons/nanotechnology/index.js';

export interface Choice {
  text: string;
  action: string;
}

interface StoryContent {
  title: string;
  content: string | ((readerName: string) => string);
  choices?: Choice[];
}

export interface ProcessedStoryContent {
  title: string;
  content: string;
  choices?: Choice[];
}

interface ContentRegistry {
  [key: string]: StoryContent;
}

// Master content registry that combines all content
export const allContent: ContentRegistry = {
  ...welcomeContent,
  ...dragonStoryCollection,
  ...nanotechnologyLessons
};

// Content utility functions
export const getStoryContent = (storyKey: string, readerName: string = 'Aria'): ProcessedStoryContent | null => {
  const story = allContent[storyKey];
  if (!story) return null;
  
  return {
    ...story,
    content: typeof story.content === 'function' 
      ? story.content(readerName) 
      : story.content
  };
};

export const getAllStoryKeys = (): string[] => Object.keys(allContent);