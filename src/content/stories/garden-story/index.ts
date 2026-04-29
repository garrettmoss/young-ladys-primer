import { gardenEntrance } from './garden-entrance';
import { westernWallPath } from './western-wall';
import { clearingPathContent } from './clearing-path';
import { wallLunchContent } from './wall-lunch';
import { lichenGridContent } from './lichen-grid';
import { oldWellContent } from './old-well';
import { wellRootsContent } from './well-roots';
import type { Kingdom, Story } from '../../index';

export const gardenStoryCollection = {
  ...gardenEntrance,
  ...westernWallPath,
  ...clearingPathContent,
  ...wallLunchContent,
  ...lichenGridContent,
  ...oldWellContent,
  ...wellRootsContent
};

const cartographersGarden: Story = {
  id: 'cartographers-garden',
  title: "The Cartographer's Garden",
  kingdomId: 'garden',
  entryPoint: 'garden_entrance',
  contentKeys: Object.keys(gardenStoryCollection),
  status: 'active',
  adaptive: false
};

export const gardenKingdom: Kingdom = {
  id: 'garden',
  title: 'The Garden Kingdom',
  description: 'An old map leads to an abandoned garden that has been running a living calculation for a hundred years. The reader must figure out what it is trying to say.',
  hubIntro: `The garden waits at the end of the map — walls half-swallowed by ivy, a gate that still opens, soil that remembers more than you'd think. What would you like to do here?`,
  entryStoryId: cartographersGarden.id,
  stories: [cartographersGarden],
  lessons: [],
  puzzles: [],
  status: 'active'
};
