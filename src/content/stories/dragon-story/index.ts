import { storyPrincessMeeting } from './princess-meeting';
import { dragonPatternStories } from './dragon-pattern';
import { dragonApproachStories } from './dragon-approach';
import { dragonEngineersStories } from './dragon-engineers';
import type { Kingdom, Story } from '../../index';

export const dragonStoryCollection = {
  ...storyPrincessMeeting,
  ...dragonPatternStories,
  ...dragonApproachStories,
  ...dragonEngineersStories
};

const dragonStory: Story = {
  id: 'dragon-story',
  title: 'The Mechanical Dragon',
  kingdomId: 'dragon',
  entryPoint: 'story_princess',
  contentKeys: Object.keys(dragonStoryCollection),
  status: 'legacy',
  adaptive: false
};

export const dragonKingdom: Kingdom = {
  id: 'dragon',
  title: 'The Mechanical Dragon',
  description: 'Princess Aria discovers a mechanical dragon and uncovers the secrets of nanotechnology, ancient engineers, and the power of compassion.',
  hubIntro: `Brass scales catch the late sun, and somewhere under the mountain an engine ticks that hasn't ticked in a hundred years. What draws you in?`,
  entryStoryId: dragonStory.id,
  stories: [dragonStory],
  lessons: ['nano_lesson', 'molecular_talk'],
  puzzles: [
    'molecular_lock', 'chamber_one_ice', 'chamber_one_liquid', 'chamber_one_steam',
    'lock_hint_one', 'chamber_two_graphene', 'chamber_two_polymer', 'chamber_two_diamond',
    'chamber_two_gas', 'lock_hint_two', 'chamber_three_green', 'chamber_three_red',
    'chamber_three_blue', 'chamber_three_clear', 'lock_hint_three'
  ],
  status: 'legacy'
};
