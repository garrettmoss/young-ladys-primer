import { storyPrincessMeeting } from './princess-meeting';
import { dragonPatternStories } from './dragon-pattern';
import { dragonApproachStories } from './dragon-approach';
import { dragonEngineersStories } from './dragon-engineers';

export const dragonStoryCollection = {
  ...storyPrincessMeeting,
  ...dragonPatternStories,
  ...dragonApproachStories,
  ...dragonEngineersStories
};