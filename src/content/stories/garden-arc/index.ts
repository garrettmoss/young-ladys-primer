import { gardenEntrance } from './garden-entrance';
import type { StoryArc } from '../../index';

export const gardenStoryCollection = {
  ...gardenEntrance
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
