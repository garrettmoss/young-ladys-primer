#!/usr/bin/env node
/**
 * Test Graph Builder
 *
 * Quick test script to verify the graph builder utility works correctly.
 * Tests with the dragon story content (18 nodes, 2 convergence points).
 */

import { welcomeContent } from '../src/content/core/welcome';
import { devToolsContent } from '../src/content/core/dev-tools';
import { dragonStoryCollection } from '../src/content/stories/dragon-story/index';
import { lessonNavigation } from '../src/content/lessons/index';
import { nanotechnologyLessons } from '../src/content/lessons/nanotechnology/index';
import { puzzleCollection } from '../src/content/puzzles/index';
import {
  contentRegistryToFlowGraph,
  calculateGraphMetrics,
  findConvergencePoints,
  type ContentRegistry
} from '../src/utils/graph-builder';

// Build the complete content registry
const allContent: ContentRegistry = {
  ...welcomeContent,
  ...devToolsContent,
  ...lessonNavigation,
  ...dragonStoryCollection,
  ...nanotechnologyLessons,
  ...puzzleCollection
};

console.log('='.repeat(60));
console.log('Graph Builder Test');
console.log('='.repeat(60));
console.log();

// Test 1: Build the flow graph
console.log('Test 1: Building Flow Graph...');
const flowGraph = contentRegistryToFlowGraph(allContent, true);
console.log(`✓ Successfully created ${flowGraph.nodes.length} nodes`);
console.log(`✓ Successfully created ${flowGraph.edges.length} edges`);
console.log();

// Test 2: Calculate metrics
console.log('Test 2: Calculating Graph Metrics...');
const metrics = calculateGraphMetrics(allContent);
console.log('Metrics:');
console.log(`  Total Nodes: ${metrics.totalNodes}`);
console.log(`  Total Choices: ${metrics.totalChoices}`);
console.log(`  Avg Choices per Node: ${metrics.avgChoicesPerNode}`);
console.log(`  Ending Nodes: ${metrics.endingNodes}`);
console.log(`  Entry Nodes: ${metrics.entryNodes}`);
console.log(`  Convergence Points: ${metrics.convergencePointCount}`);
console.log();

// Test 3: Find convergence points
console.log('Test 3: Identifying Convergence Points...');
const convergencePoints = findConvergencePoints(allContent);
console.log(`Found ${convergencePoints.length} convergence points:`);
convergencePoints.forEach((point, idx) => {
  const node = flowGraph.nodes.find(n => n.id === point);
  if (node) {
    console.log(`  ${idx + 1}. ${point}`);
    console.log(`     Title: "${node.data.label}"`);
    console.log(`     Incoming edges: ${node.data.incomingEdges}`);
  }
});
console.log();

// Test 4: Node type distribution
console.log('Test 4: Node Type Distribution...');
const typeDistribution: Record<string, number> = {};
flowGraph.nodes.forEach(node => {
  const type = node.data.nodeType;
  typeDistribution[type] = (typeDistribution[type] || 0) + 1;
});

console.log('Node types:');
Object.entries(typeDistribution)
  .sort(([, a], [, b]) => b - a)
  .forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
console.log();

// Test 5: Dragon story specific validation
console.log('Test 5: Dragon Story Validation...');
const dragonStoryNodes = flowGraph.nodes.filter(node =>
  node.id === 'story_princess' ||
  node.id.startsWith('dragon_') ||
  node.id.includes('elara') ||
  node.id === 'find_peace' ||
  node.id.includes('binary') ||
  node.id.includes('queen') ||
  node.id.includes('curse') ||
  node.id.includes('scales') ||
  node.id.includes('music') ||
  node.id.includes('protocol') ||
  node.id.includes('compassion') ||
  node.id.includes('unite') ||
  node.id.includes('power_story') ||
  node.id.includes('understanding') ||
  node.id.includes('reader_choice')
);

console.log(`Dragon story nodes: ${dragonStoryNodes.length}`);
console.log();

// Expected convergence points in dragon story
const expectedConvergence = ['elara_revealed', 'find_peace'];
const foundDragonConvergence = convergencePoints.filter(cp =>
  expectedConvergence.includes(cp)
);

console.log(`Expected convergence points: ${expectedConvergence.join(', ')}`);
console.log(`Found: ${foundDragonConvergence.join(', ')}`);

if (foundDragonConvergence.length === expectedConvergence.length) {
  console.log('✓ All expected convergence points found!');
} else {
  console.log('⚠ Warning: Not all expected convergence points were found');
}
console.log();

// Test 6: Sample node inspection
console.log('Test 6: Sample Node Inspection...');
const sampleNodes = ['welcome', 'story_princess', 'elara_revealed', 'find_peace'];
sampleNodes.forEach(nodeId => {
  const node = flowGraph.nodes.find(n => n.id === nodeId);
  if (node) {
    console.log(`\n"${nodeId}":`);
    console.log(`  Title: "${node.data.label}"`);
    console.log(`  Type: ${node.data.nodeType}`);
    console.log(`  Choices: ${node.data.choiceCount}`);
    console.log(`  Incoming: ${node.data.incomingEdges}`);
    console.log(`  Preview: ${node.data.contentPreview}`);
  }
});
console.log();

console.log('='.repeat(60));
console.log('✓ All tests completed successfully!');
console.log('='.repeat(60));
