/**
 * Flow Visualizer Constants
 *
 * Single source of truth for node dimensions, colors, and shared styles.
 */

import type { NodeType } from '@/utils/graph-builder';

// Node layout dimensions (used by Dagre layout + StoryNode renderer)
export const NODE_WIDTH = 280;
export const NODE_HEIGHT = 120;

// Color palette for flow node types
export const FLOW_COLORS: Record<NodeType, string> = {
  entry:       '#FFD700',  // Gold
  convergence: '#4ECDC4',  // Teal
  lesson:      '#95E1D3',  // Mint
  puzzle:      '#F38181',  // Rose
  ending:      '#AA96DA',  // Purple
  default:     '#E0E0E0',  // Gray
};

// Shared panel styling for controls and minimap
export const FLOW_PANEL_CLASSES =
  'bg-parchment/95 backdrop-blur-sm border-2 border-ink/20 rounded-lg shadow-lg';
