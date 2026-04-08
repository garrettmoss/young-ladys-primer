import { gardenEntrance } from './garden-entrance';
import { westernWallPath } from './western-wall';
import { clearingPathContent } from './clearing-path';
import { wallLunchContent } from './wall-lunch';
import { lichenGridContent } from './lichen-grid';
import { oldWellContent } from './old-well';
import { wellRootsContent } from './well-roots';
import type { StoryArc } from '../../index';

export const gardenStoryCollection = {
  ...gardenEntrance,
  ...westernWallPath,
  ...clearingPathContent,
  ...wallLunchContent,
  ...lichenGridContent,
  ...oldWellContent,
  ...wellRootsContent
};

export const gardenArc: StoryArc = {
  id: 'garden-arc',
  title: "The Cartographer's Garden",
  description: 'An old map leads to an abandoned garden that has been running a living calculation for a hundred years. The reader must figure out what it is trying to say.',
  entryPoint: 'garden_entrance',
  contentKeys: Object.keys(gardenStoryCollection),
  lessons: [],
  puzzles: [],
  status: 'available'
};
