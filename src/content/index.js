import { welcomeContent } from './core/welcome.js';
import { dragonStoryCollection } from './stories/dragon-story/index.js';
import { nanotechnologyLessons } from './lessons/nanotechnology/index.js';

// Master content registry that combines all content
export const allContent = {
  ...welcomeContent,
  ...dragonStoryCollection,
  ...nanotechnologyLessons
};

// Content utility functions
export const getStoryContent = (storyKey, readerName = 'Aria') => {
  const story = allContent[storyKey];
  if (!story) return null;
  
  return {
    ...story,
    content: typeof story.content === 'function' 
      ? story.content(readerName) 
      : story.content
  };
};

export const getAllStoryKeys = () => Object.keys(allContent);