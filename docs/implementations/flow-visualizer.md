# Interactive Flow Visualizer Implementation

**Status:** Phase 1 Complete ✓

Interactive graph visualization for story structure with zoom/pan controls, convergence highlighting, and Victorian-themed styling.

---

## Overview

Transform the content registry into an interactive visual graph that helps authors:
- Visualize story structure at any scale
- Navigate between nodes during authoring
- Identify convergence points and critical paths
- Track reader progress through stories

Built with React Flow, integrates with existing Next.js app, uses Victorian aesthetic.

---

## Phase Progress

- [x] **Phase 1: Foundation & Setup** (commit 0dfdb6e)
- [x] **Phase 2: Core Components** (commit d12778d)
- [ ] **Phase 3: Interactivity & Features**
- [ ] **Phase 4: Integration & Polish**

---

## Phase 1: Foundation & Setup ✓

**Completed:** 2025-11-27
**Commit:** 0dfdb6e

### Deliverables

1. **Dependencies**
   - Installed `reactflow` (v11.11.4)
   - 51 packages added for graph visualization

2. **Color System** ([tailwind.config.js:32-38](../../tailwind.config.js#L32-L38))
   - Entry nodes: Gold `#FFD700`
   - Convergence nodes: Teal `#4ECDC4`
   - Lesson nodes: Mint `#95E1D3`
   - Puzzle nodes: Rose `#F38181`
   - Ending nodes: Purple `#AA96DA`

3. **Graph Builder Utility** ([src/utils/graph-builder.ts](../../src/utils/graph-builder.ts))
   - `contentRegistryToFlowGraph()` - Transform content to React Flow format
   - `detectNodeType()` - Classify nodes by type
   - `countIncomingEdges()` - Calculate incoming edges
   - `findConvergencePoints()` - Identify nodes with 3+ incoming edges
   - `calculateGraphMetrics()` - Generate graph statistics
   - `getNodeColor()` - Return colors for node types

4. **Testing** ([scripts/test-graph-builder.ts](../../scripts/test-graph-builder.ts))
   - Successfully processes 39 content nodes
   - Creates 96 edges from choices
   - Identifies 15 convergence points
   - Validates dragon story structure (18 nodes, 2 key convergence points)

### Test Results

```
Total nodes: 39
Total edges: 96
Average choices per node: 2.62
Dragon story convergence points:
  - elara_revealed (8 incoming edges)
  - find_peace (8 incoming edges)
```

---

## Phase 2: Core Components ✓

**Completed:** 2025-11-27
**Commit:** d12778d

### Components to Build

#### 1. StoryFlowVisualizer.tsx
**File:** `src/components/flow-visualizer/StoryFlowVisualizer.tsx`

Main React component that:
- Imports React Flow and required CSS
- Loads content registry via graph-builder utility
- Applies automatic dagre layout (hierarchical top-to-bottom)
- Renders nodes with zoom/pan controls
- Handles node selection state

**Key features:**
- Initialize React Flow with default controls
- Transform content using `contentRegistryToFlowGraph()`
- Apply Victorian-themed styling
- Basic node rendering with title display
- Color-coding by node type

**Props:**
```typescript
interface StoryFlowVisualizerProps {
  contentFilter?: string;  // Filter by story arc
  entryPoint?: string;     // Highlight path from this node
  showProgress?: boolean;  // Show reader progress
}
```

#### 2. StoryNode.tsx
**File:** `src/components/flow-visualizer/StoryNode.tsx`

Custom node renderer with Victorian aesthetic:
- Parchment background with border
- Node title in serif font
- Type indicator icon/badge
- Choice count display
- Visual highlight for convergence points (3+ incoming edges)
- Hover state shows content preview tooltip

**Styling:**
- Use Tailwind classes with parchment/vintage colors
- Match existing primer aesthetic
- Different border colors based on node type (using flow colors)
- Subtle shadow/depth effects

**Node data structure:**
```typescript
interface StoryNodeData {
  label: string;           // Node title
  contentPreview: string;  // First 100 chars
  nodeType: NodeType;      // entry/convergence/lesson/puzzle/ending
  choiceCount: number;     // Number of outgoing edges
  incomingEdges: number;   // For convergence detection
}
```

#### 3. ContentSidebar.tsx
**File:** `src/components/flow-visualizer/ContentSidebar.tsx`

Collapsible sidebar that displays selected node details:
- Full node title
- Complete content text (or preview for dynamic content)
- List of outgoing choices with target nodes
- List of incoming connections (what points here)
- Metadata: type badge, word count, choice count
- "Navigate to node" button (for testing navigation)

**Features:**
- Slide in/out animation
- Scrollable content area
- Close button
- Empty state when no node selected

### Technical Requirements

**React Flow Setup:**
```typescript
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';
```

**Layout Algorithm:**
- Use dagre for hierarchical layout
- Or React Flow's built-in `elkLayout`
- Top-to-bottom flow (reading direction)
- Proper spacing for node labels

**Directory Structure:**
```
src/components/flow-visualizer/
├── StoryFlowVisualizer.tsx    # Main component
├── StoryNode.tsx               # Custom node renderer
├── ContentSidebar.tsx          # Details panel
└── index.ts                    # Exports
```

### Deliverables

1. **StoryFlowVisualizer.tsx** ([src/components/flow-visualizer/StoryFlowVisualizer.tsx](../../src/components/flow-visualizer/StoryFlowVisualizer.tsx))
   - React Flow integration with dagre layout algorithm
   - Transforms content registry using graph-builder utility
   - Handles node selection and sidebar state
   - Tight-tree layout with optimized spacing (nodesep: 120, ranksep: 150)

2. **StoryNode.tsx** ([src/components/flow-visualizer/StoryNode.tsx](../../src/components/flow-visualizer/StoryNode.tsx))
   - Custom node renderer with Victorian aesthetic
   - Color-coded by node type with border highlights
   - Convergence badge for nodes with 3+ incoming edges
   - Type icons and choice count display
   - Hover states and selection highlighting

3. **ContentSidebar.tsx** ([src/components/flow-visualizer/ContentSidebar.tsx](../../src/components/flow-visualizer/ContentSidebar.tsx))
   - Collapsible sidebar with node details
   - Shows metadata, content text, choices, and incoming connections
   - Flexbox layout prevents scroll z-index issues
   - Color-coded header matching node type

4. **Dev Page** ([pages/dev/flow.tsx](../../pages/dev/flow.tsx))
   - Full-screen visualization at `/dev/flow`
   - Test harness for flow visualizer development

### Acceptance Criteria

- [x] Visualizer renders all content nodes
- [x] Nodes color-coded by type (entry/convergence/lesson/puzzle/ending)
- [x] Click node opens sidebar with full details
- [x] Zoom/pan controls work smoothly
- [x] Victorian aesthetic matches existing app
- [x] Renders dragon story (18 nodes) clearly
- [x] Convergence points visually distinct

---

## Phase 3: Interactivity & Features

**Status:** Not started

### Components to Build

#### 4. MetricsPanel.tsx
**File:** `src/components/flow-visualizer/MetricsPanel.tsx`

Display graph statistics:
- Total node count
- Average choices per node
- Entry points and endings count
- Convergence points identified
- Max path depth from entry
- Story arc breakdown

#### 5. FlowControls.tsx
**File:** `src/components/flow-visualizer/FlowControls.tsx`

Toolbar with:
- Zoom in/out buttons
- Fit to view button
- Filter toggles (show/hide lessons, puzzles, etc.)
- Search nodes by ID or title
- Export to PNG/SVG buttons

#### 6. Progress Tracking Integration

Use existing `useContentNavigation` hook:
- Highlight visited nodes
- Show current reader position
- Different opacity for unvisited nodes
- Path highlighting for reader's journey

### Acceptance Criteria

- [ ] Metrics panel shows accurate statistics
- [ ] Controls toolbar functional (zoom, fit, filters)
- [ ] Search finds nodes by ID or title
- [ ] Progress overlay works with existing navigation hook
- [ ] Export generates usable PNG/SVG files

---

## Phase 4: Integration & Polish

**Status:** Not started

### Tasks

1. **Dev Tools Integration**
   - Create `src/content/core/flow-visualizer.ts`
   - Add choice from debug page to visualizer
   - Full-screen layout optimized for visualization

2. **Export Functionality**
   - PNG export using React Flow's `toCanvas` API
   - SVG export for documentation
   - Optional: Mermaid code generation

3. **Responsive Design**
   - Desktop-first (min 1024px recommended)
   - Tablet support with touch controls
   - Collapsible sidebar on smaller screens
   - Mobile: Show message "Use desktop for best experience"

4. **Performance**
   - Lazy load nodes if graph exceeds 100 nodes
   - Virtualization for large graphs
   - Debounce search/filter operations

### Acceptance Criteria

- [ ] Accessible from debug/dev tools page
- [ ] Export to PNG/SVG works
- [ ] Responsive on tablet/desktop
- [ ] Performance acceptable with 100+ nodes
- [ ] Documentation updated

---

## File Locations

### Completed (Phase 1)
- [src/utils/graph-builder.ts](../../src/utils/graph-builder.ts) - Graph transformation utility
- [scripts/test-graph-builder.ts](../../scripts/test-graph-builder.ts) - Test script
- [tailwind.config.js](../../tailwind.config.js) - Flow color definitions

### To Create (Phase 2)
- `src/components/flow-visualizer/StoryFlowVisualizer.tsx` - Main component
- `src/components/flow-visualizer/StoryNode.tsx` - Custom node
- `src/components/flow-visualizer/ContentSidebar.tsx` - Details panel
- `src/components/flow-visualizer/index.ts` - Exports

### To Create (Phase 3)
- `src/components/flow-visualizer/MetricsPanel.tsx` - Statistics
- `src/components/flow-visualizer/FlowControls.tsx` - Toolbar

### To Create (Phase 4)
- `src/content/core/flow-visualizer.ts` - Dev tools page

---

## Future Enhancements

Beyond Phase 4, consider:

- **Reader-facing mode** - Show only unlocked nodes, progress map
- **Real-time collaboration** - Multiple authors viewing/editing
- **A/B testing** - Show alternate path variants
- **Analytics overlay** - Popular paths, completion rates
- **Animation** - Unlock/discovery animations for reader mode
- **Path comparison** - Side-by-side view of different routes
- **Mermaid generation** - Export current graph as Mermaid diagram

---

## Design Principles

**Victorian Aesthetic:**
- Parchment backgrounds (#f9f6f0, #f5f1e6)
- Serif fonts (Baskerville, Palatino)
- Amber/gold accents (#d97706, #fbbf24)
- Ink-like edges/lines
- Subtle ornamental details

**Usability:**
- Clear visual hierarchy
- Intuitive zoom/pan controls
- Readable at all zoom levels
- Consistent with existing primer UI

**Performance:**
- Smooth interactions
- Efficient rendering for large graphs
- Progressive enhancement (start simple, add features)

---

## Next Steps

To continue with **Phase 2** in a fresh Claude session:

1. Read this document
2. Review Phase 1 completed work:
   - [src/utils/graph-builder.ts](../../src/utils/graph-builder.ts)
   - Run `npx tsx scripts/test-graph-builder.ts` to see it work
3. Start with `StoryFlowVisualizer.tsx` main component
4. Build `StoryNode.tsx` custom renderer
5. Add `ContentSidebar.tsx` for node details
6. Test with dragon story content

The data pipeline is ready - now build the visual experience!
