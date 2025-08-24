import { storyPrincessMeeting } from './princess-meeting.js';
import { dragonPatternStories } from './dragon-pattern.js';
import { dragonApproachStories } from './dragon-approach.js';
import { dragonEngineersStories } from './dragon-engineers.js';

export const dragonStoryCollection = {
  ...storyPrincessMeeting,
  ...dragonPatternStories,
  ...dragonApproachStories,
  ...dragonEngineersStories
};