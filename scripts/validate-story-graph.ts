#!/usr/bin/env node
/**
 * Story Graph Validation Script
 *
 * Validates the integrity of the story content graph by checking:
 * - All choice actions point to valid content nodes
 * - No orphaned content (unreferenced nodes)
 * - No unintentional dead ends (non-ending nodes without choices)
 * - All content is reachable from entry points
 *
 * Run with: npm run validate-content
 */

import { welcomeContent } from '../src/content/core/welcome';
import { devToolsContent } from '../src/content/core/dev-tools';
import { dragonStoryCollection } from '../src/content/stories/dragon-story/index';
import { lessonNavigation } from '../src/content/lessons/index';
import { nanotechnologyLessons } from '../src/content/lessons/nanotechnology/index';
import { puzzleCollection } from '../src/content/puzzles/index';
import type { StoryContent, Choice } from '../src/content/index';

// === CONFIGURATION ===

/**
 * Known placeholder content that's intentionally not implemented yet
 * These will be reported as INFO rather than WARNINGS
 */
const KNOWN_PLACEHOLDERS = [
  'reflection',
  'logic_lesson',
  'narrative_lesson',
  'social_lesson',
  'nano_deep',
  'quiz_nano'
];

/**
 * Special actions that don't point to content nodes
 */
const SPECIAL_ACTIONS = [
  'change-name',
  'settings'
];

/**
 * Special utility pages accessed outside the normal story flow
 * These are accessed via direct navigation and won't trigger orphan/dead-end warnings
 */
const SPECIAL_PAGES = [
  'debug'  // Dev tools page
];

/**
 * Entry points into the content graph
 */
const ENTRY_POINTS = [
  'welcome'
];

// === TYPE DEFINITIONS ===

interface ContentRegistry {
  [key: string]: StoryContent;
}

interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  contentId?: string;
  location?: string;
}

interface ValidationReport {
  referenceValidation: ValidationIssue[];
  orphanDetection: ValidationIssue[];
  deadEndDetection: ValidationIssue[];
  reachabilityAnalysis: ValidationIssue[];
}

// === CONTENT GRAPH BUILDER ===

/**
 * Build the complete content registry
 */
function buildContentGraph(): ContentRegistry {
  return {
    ...welcomeContent,
    ...devToolsContent,
    ...lessonNavigation,
    ...dragonStoryCollection,
    ...nanotechnologyLessons,
    ...puzzleCollection
  };
}

/**
 * Extract all choice actions from a content node
 */
function extractChoiceActions(content: StoryContent): string[] {
  if (!content.choices) return [];
  return content.choices.map(choice => choice.action);
}

// === VALIDATION CHECKS ===

/**
 * Check 1: Reference Validation
 * Verify all choice actions point to valid content nodes or special actions
 */
function validateReferences(contentGraph: ContentRegistry): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const allContentIds = Object.keys(contentGraph);

  for (const [contentId, content] of Object.entries(contentGraph)) {
    const actions = extractChoiceActions(content);

    for (const action of actions) {
      // Skip special actions
      if (SPECIAL_ACTIONS.includes(action)) continue;

      // Check if action points to valid content
      if (!allContentIds.includes(action)) {
        if (KNOWN_PLACEHOLDERS.includes(action)) {
          issues.push({
            type: 'info',
            message: `Placeholder reference '${action}' (planned content)`,
            contentId,
            location: contentId
          });
        } else {
          issues.push({
            type: 'error',
            message: `Invalid reference '${action}' - no matching content node`,
            contentId,
            location: contentId
          });
        }
      }
    }
  }

  return issues;
}

/**
 * Check 2: Orphan Detection
 * Find content nodes that nothing references (potential dead code)
 */
function detectOrphans(contentGraph: ContentRegistry): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const allContentIds = new Set(Object.keys(contentGraph));
  const referencedIds = new Set<string>(ENTRY_POINTS); // Entry points are never orphans

  // Collect all referenced content IDs
  for (const content of Object.values(contentGraph)) {
    const actions = extractChoiceActions(content);
    actions.forEach(action => {
      if (!SPECIAL_ACTIONS.includes(action)) {
        referencedIds.add(action);
      }
    });
  }

  // Find unreferenced nodes
  for (const contentId of Array.from(allContentIds)) {
    if (!referencedIds.has(contentId) && !SPECIAL_PAGES.includes(contentId)) {
      issues.push({
        type: 'warning',
        message: `Orphaned content '${contentId}' - nothing links to this node`,
        contentId,
        location: contentId
      });
    }
  }

  return issues;
}

/**
 * Check 3: Dead End Detection
 * Find non-ending nodes that have no choices (unintentional dead ends)
 */
function detectDeadEnds(contentGraph: ContentRegistry): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const [contentId, content] of Object.entries(contentGraph)) {
    // Skip if it has choices
    if (content.choices && content.choices.length > 0) continue;

    // Check if it's intentionally an ending or special page
    // We'll consider nodes without choices as intentional endings for now
    // This is a simple heuristic - could be enhanced with explicit isEnding flag
    const isLikelyIntentionalEnding =
      contentId.includes('ending') ||
      contentId.includes('conclusion') ||
      contentId.includes('complete');

    if (!isLikelyIntentionalEnding && !SPECIAL_PAGES.includes(contentId)) {
      issues.push({
        type: 'warning',
        message: `Potential dead end '${contentId}' - no choices and doesn't look like an ending`,
        contentId,
        location: contentId
      });
    }
  }

  return issues;
}

/**
 * Check 4: Reachability Analysis
 * Find content that's unreachable from entry points
 */
function analyzeReachability(contentGraph: ContentRegistry): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const reachable = new Set<string>();
  const queue: string[] = [...ENTRY_POINTS];

  // BFS from entry points
  while (queue.length > 0) {
    const currentId = queue.shift()!;

    // Skip if already visited
    if (reachable.has(currentId)) continue;
    reachable.add(currentId);

    // Add connected nodes to queue
    const content = contentGraph[currentId];
    if (content) {
      const actions = extractChoiceActions(content);
      for (const action of actions) {
        if (!SPECIAL_ACTIONS.includes(action) && !reachable.has(action)) {
          queue.push(action);
        }
      }
    }
  }

  // Find unreachable nodes (excluding known placeholders and special pages)
  const allContentIds = Object.keys(contentGraph);
  for (const contentId of allContentIds) {
    if (!reachable.has(contentId) && !KNOWN_PLACEHOLDERS.includes(contentId) && !SPECIAL_PAGES.includes(contentId)) {
      issues.push({
        type: 'warning',
        message: `Unreachable content '${contentId}' - no path from entry points`,
        contentId,
        location: contentId
      });
    }
  }

  return issues;
}

// === OUTPUT FORMATTING ===

/**
 * Terminal color codes with TTY detection
 * Only use colors when outputting to an interactive terminal
 */
const isTTY = process.stdout.isTTY ?? false;
const colors = isTTY ? {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bold: '\x1b[1m'
} : {
  reset: '',
  red: '',
  yellow: '',
  green: '',
  cyan: '',
  gray: '',
  bold: ''
};

/**
 * Format a validation issue for terminal output
 */
function formatIssue(issue: ValidationIssue): string {
  const icon = issue.type === 'error' ? '✗' : issue.type === 'warning' ? '⚠' : 'ℹ';
  const color = issue.type === 'error' ? colors.red : issue.type === 'warning' ? colors.yellow : colors.cyan;

  let output = `  ${color}${icon}${colors.reset} ${issue.message}`;
  if (issue.location) {
    output += ` ${colors.gray}(${issue.location})${colors.reset}`;
  }
  return output;
}

/**
 * Print validation report to console
 */
function printReport(report: ValidationReport): void {
  console.log('\n' + colors.bold + 'Story Graph Validation Report' + colors.reset);
  console.log('==============================\n');

  // Reference Validation
  const refErrors = report.referenceValidation.filter(i => i.type === 'error');
  const refInfo = report.referenceValidation.filter(i => i.type === 'info');

  if (refErrors.length === 0) {
    console.log(colors.green + '✓' + colors.reset + ' Reference Validation: PASSED');
  } else {
    console.log(colors.red + '✗' + colors.reset + ' Reference Validation: ' + colors.red + refErrors.length + ' ERRORS' + colors.reset);
    refErrors.forEach(issue => console.log(formatIssue(issue)));
  }

  if (refInfo.length > 0) {
    console.log(colors.gray + '  ' + refInfo.length + ' known placeholder(s)' + colors.reset);
  }
  console.log();

  // Orphan Detection
  if (report.orphanDetection.length === 0) {
    console.log(colors.green + '✓' + colors.reset + ' Orphan Detection: PASSED');
  } else {
    console.log(colors.yellow + '⚠' + colors.reset + ' Orphan Detection: ' + colors.yellow + report.orphanDetection.length + ' WARNINGS' + colors.reset);
    report.orphanDetection.forEach(issue => console.log(formatIssue(issue)));
  }
  console.log();

  // Dead End Detection
  if (report.deadEndDetection.length === 0) {
    console.log(colors.green + '✓' + colors.reset + ' Dead End Detection: PASSED');
  } else {
    console.log(colors.yellow + '⚠' + colors.reset + ' Dead End Detection: ' + colors.yellow + report.deadEndDetection.length + ' WARNINGS' + colors.reset);
    report.deadEndDetection.forEach(issue => console.log(formatIssue(issue)));
  }
  console.log();

  // Reachability Analysis
  if (report.reachabilityAnalysis.length === 0) {
    console.log(colors.green + '✓' + colors.reset + ' Reachability Analysis: PASSED');
  } else {
    console.log(colors.yellow + '⚠' + colors.reset + ' Reachability Analysis: ' + colors.yellow + report.reachabilityAnalysis.length + ' WARNINGS' + colors.reset);
    report.reachabilityAnalysis.forEach(issue => console.log(formatIssue(issue)));
  }
  console.log();

  // Summary
  const totalErrors = report.referenceValidation.filter(i => i.type === 'error').length;
  const totalWarnings =
    report.referenceValidation.filter(i => i.type === 'warning').length +
    report.orphanDetection.length +
    report.deadEndDetection.length +
    report.reachabilityAnalysis.length;

  console.log(colors.bold + 'Summary: ' + colors.reset +
    (totalErrors > 0 ? colors.red : totalWarnings > 0 ? colors.yellow : colors.green) +
    `${totalErrors} errors, ${totalWarnings} warnings` + colors.reset + '\n');
}

// === MAIN EXECUTION ===

function main() {
  console.log('Building content graph...');
  const contentGraph = buildContentGraph();
  const totalNodes = Object.keys(contentGraph).length;
  console.log(`Found ${totalNodes} content nodes\n`);

  console.log('Running validation checks...');

  const report: ValidationReport = {
    referenceValidation: validateReferences(contentGraph),
    orphanDetection: detectOrphans(contentGraph),
    deadEndDetection: detectDeadEnds(contentGraph),
    reachabilityAnalysis: analyzeReachability(contentGraph)
  };

  printReport(report);

  // Exit with error code if there are errors
  const hasErrors = report.referenceValidation.some(i => i.type === 'error');
  process.exit(hasErrors ? 1 : 0);
}

main();
