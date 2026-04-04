import { storyPrincessMeeting } from './princess-meeting';
import { dragonPatternStories } from './dragon-pattern';
import { dragonApproachStories } from './dragon-approach';
import { dragonEngineersStories } from './dragon-engineers';
import type { StoryArc } from '../../index';

export const dragonStoryCollection = {
  ...storyPrincessMeeting,
  ...dragonPatternStories,
  ...dragonApproachStories,
  ...dragonEngineersStories
};

export const dragonArc: StoryArc = {
  id: 'dragon-story',
  title: 'The Mechanical Dragon',
  description: 'Princess Aria discovers a mechanical dragon and uncovers the secrets of nanotechnology, ancient engineers, and the power of compassion.',
  entryPoint: 'story_princess',
  contentKeys: Object.keys(dragonStoryCollection),
  lessons: ['nano_lesson', 'molecular_talk'],
  puzzles: [
    'molecular_lock', 'chamber_one_ice', 'chamber_one_liquid', 'chamber_one_steam',
    'lock_hint_one', 'chamber_two_graphene', 'chamber_two_polymer', 'chamber_two_diamond',
    'chamber_two_gas', 'lock_hint_two', 'chamber_three_green', 'chamber_three_red',
    'chamber_three_blue', 'chamber_three_clear', 'lock_hint_three'
  ],
  status: 'available'
};