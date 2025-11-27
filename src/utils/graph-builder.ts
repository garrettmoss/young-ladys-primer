/**
 * Graph Builder Utility
 *
 * Transforms the content registry into React Flow graph format for visualization.
 * Provides node type detection and convergence point identification.
 */

import type { StoryContent, Choice } from '@/content';
import type { Node, Edge } from 'reactflow';

// === CONFIGURATION ===

/**
 * Entry points into the content graph
 */
const ENTRY_POINTS = ['welcome', 'story_princess'];

/**
 * Special actions that don't point to content nodes
 */
const SPECIAL_ACTIONS = ['change-name', 'settings'];

/**
 * Special utility pages accessed outside the normal story flow
 */
const SPECIAL_PAGES = ['debug'];

// === TYPE DEFINITIONS ===

export interface ContentRegistry {
  [key: string]: StoryContent;
}

export type NodeType = 'entry' | 'convergence' | 'lesson' | 'puzzle' | 'ending' | 'default';

export interface FlowNodeData {
  label: string;
  contentPreview: string;
  nodeType: NodeType;
  choiceCount: number;
  incomingEdges: number;
}

export interface FlowGraph {
  nodes: Node<FlowNodeData>[];
  edges: Edge[];
}

// === HELPER FUNCTIONS ===

/**
 * Extract all choice actions from a content node
 */
function extractChoiceActions(content: StoryContent): string[] {
  if (!content.choices) return [];
  return content.choices.map((choice: Choice) => choice.action);
}

/**
 * Count how many nodes point to a given node (incoming edges)
 */
function countIncomingEdges(
  nodeId: string,
  contentGraph: ContentRegistry
): number {
  let count = 0;

  Object.entries(contentGraph).forEach(([_, content]) => {
    const actions = extractChoiceActions(content);
    if (actions.includes(nodeId)) {
      count++;
    }
  });

  return count;
}

/**
 * Detect the type of a node based on its ID, content, and graph position
 */
export function detectNodeType(
  nodeId: string,
  content: StoryContent,
  contentGraph: ContentRegistry
): NodeType {
  // Entry points
  if (ENTRY_POINTS.includes(nodeId)) {
    return 'entry';
  }

  // Endings (no choices)
  if (!content.choices || content.choices.length === 0) {
    return 'ending';
  }

  // Check for lesson content
  if (
    nodeId.includes('lesson') ||
    nodeId.includes('nano_') ||
    nodeId.includes('molecular')
  ) {
    return 'lesson';
  }

  // Check for puzzle content
  if (
    nodeId.includes('puzzle') ||
    nodeId.includes('lock') ||
    nodeId.includes('chamber')
  ) {
    return 'puzzle';
  }

  // Convergence points (3+ incoming edges)
  const incomingEdges = countIncomingEdges(nodeId, contentGraph);
  if (incomingEdges >= 3) {
    return 'convergence';
  }

  return 'default';
}

/**
 * Get content preview text (first 100 chars)
 */
function getContentPreview(content: StoryContent): string {
  const text = typeof content.content === 'string'
    ? content.content
    : '[Dynamic content]';

  // Remove markdown formatting for cleaner preview
  const cleanText = text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/\n/g, ' ')
    .trim();

  return cleanText.length > 100
    ? cleanText.substring(0, 100) + '...'
    : cleanText;
}

/**
 * Get color based on node type (for use with Tailwind classes)
 */
export function getNodeColor(nodeType: NodeType): string {
  const colorMap: Record<NodeType, string> = {
    entry: '#FFD700',      // Gold
    convergence: '#4ECDC4', // Teal
    lesson: '#95E1D3',     // Mint
    puzzle: '#F38181',     // Rose
    ending: '#AA96DA',     // Purple
    default: '#E0E0E0'     // Gray
  };

  return colorMap[nodeType];
}

// === MAIN TRANSFORMATION FUNCTION ===

/**
 * Transform content registry into React Flow graph format
 *
 * @param contentGraph - The complete content registry
 * @param filterSpecialPages - Whether to exclude special pages like debug (default: true)
 * @returns Object containing nodes and edges in React Flow format
 */
export function contentRegistryToFlowGraph(
  contentGraph: ContentRegistry,
  filterSpecialPages: boolean = true
): FlowGraph {
  const nodes: Node<FlowNodeData>[] = [];
  const edges: Edge[] = [];

  // Filter out special pages if requested
  const filteredContent = filterSpecialPages
    ? Object.fromEntries(
        Object.entries(contentGraph).filter(
          ([id]) => !SPECIAL_PAGES.includes(id)
        )
      )
    : contentGraph;

  // Build incoming edge counts first (needed for convergence detection)
  const incomingEdgeCounts: Record<string, number> = {};
  Object.entries(filteredContent).forEach(([_, content]) => {
    const actions = extractChoiceActions(content);
    actions.forEach((action) => {
      if (!SPECIAL_ACTIONS.includes(action)) {
        incomingEdgeCounts[action] = (incomingEdgeCounts[action] || 0) + 1;
      }
    });
  });

  // Create nodes
  Object.entries(filteredContent).forEach(([id, content]) => {
    const nodeType = detectNodeType(id, content, filteredContent);
    const incomingEdges = incomingEdgeCounts[id] || 0;

    nodes.push({
      id,
      data: {
        label: content.title,
        contentPreview: getContentPreview(content),
        nodeType,
        choiceCount: content.choices?.length || 0,
        incomingEdges
      },
      position: { x: 0, y: 0 }, // Will be calculated by layout algorithm
      type: 'default' // Can be customized with custom node renderer
    });
  });

  // Create edges
  Object.entries(filteredContent).forEach(([sourceId, content]) => {
    const choices = content.choices || [];

    choices.forEach((choice, index) => {
      const targetId = choice.action;

      // Skip special actions
      if (SPECIAL_ACTIONS.includes(targetId)) {
        return;
      }

      // Only create edges to nodes that exist in the graph
      if (filteredContent[targetId]) {
        edges.push({
          id: `${sourceId}-${targetId}-${index}`,
          source: sourceId,
          target: targetId,
          label: choice.text.length > 30
            ? choice.text.substring(0, 30) + '...'
            : choice.text,
          animated: false // Can be enabled for highlighting paths
        });
      }
    });
  });

  return { nodes, edges };
}

/**
 * Find all convergence points in the graph
 *
 * @param contentGraph - The complete content registry
 * @returns Array of node IDs that are convergence points (3+ incoming edges)
 */
export function findConvergencePoints(contentGraph: ContentRegistry): string[] {
  const convergencePoints: string[] = [];

  Object.keys(contentGraph).forEach((nodeId) => {
    const incomingEdges = countIncomingEdges(nodeId, contentGraph);
    if (incomingEdges >= 3) {
      convergencePoints.push(nodeId);
    }
  });

  return convergencePoints;
}

/**
 * Calculate basic graph metrics
 *
 * @param contentGraph - The complete content registry
 * @returns Object containing various graph statistics
 */
export function calculateGraphMetrics(contentGraph: ContentRegistry) {
  const totalNodes = Object.keys(contentGraph).length;
  let totalChoices = 0;
  let endingNodes = 0;
  let entryNodes = 0;

  Object.entries(contentGraph).forEach(([id, content]) => {
    const choiceCount = content.choices?.length || 0;
    totalChoices += choiceCount;

    if (choiceCount === 0) endingNodes++;
    if (ENTRY_POINTS.includes(id)) entryNodes++;
  });

  const avgChoicesPerNode = totalNodes > 0 ? totalChoices / totalNodes : 0;
  const convergencePoints = findConvergencePoints(contentGraph);

  return {
    totalNodes,
    totalChoices,
    avgChoicesPerNode: Number(avgChoicesPerNode.toFixed(2)),
    endingNodes,
    entryNodes,
    convergencePointCount: convergencePoints.length,
    convergencePoints
  };
}
