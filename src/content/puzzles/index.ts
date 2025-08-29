/**
 * Puzzle Collection - Young Lady's Primer
 * 
 * Interactive logic puzzles that teach scientific concepts through problem-solving.
 * Each puzzle presents challenges that require understanding of principles covered
 * in the lessons, reinforcing learning through application.
 */

import { puzzleNavigation } from './navigation';
import { molecularLockPuzzle } from './molecular-lock';

/**
 * Combined puzzle content registry
 * All puzzle modules should be imported above and added here
 */
export const puzzleCollection = {
  ...puzzleNavigation,
  ...molecularLockPuzzle
};