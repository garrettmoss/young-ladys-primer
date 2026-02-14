'use client';

/**
 * Story Flow Visualizer
 *
 * Interactive graph visualization of story structure using React Flow.
 * Shows branching narrative paths, convergence points, and story nodes.
 */

import { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Controls,
  ControlButton,
  Background,
  MiniMap,
  Node,
  Edge,
  NodeTypes,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  BackgroundVariant
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

import { contentRegistryToFlowGraph, type FlowNodeData } from '@/utils/graph-builder';
import { allContent } from '@/content';
import { StoryNode } from './StoryNode';
import { ContentSidebar } from './ContentSidebar';

// === CONSTANTS ===

const DEFAULT_VIEWPORT = { x: 0, y: 0, zoom: 0.6 };

// === TYPES ===

interface StoryFlowVisualizerProps {
  contentFilter?: string;  // Filter by story arc (future enhancement)
  entryPoint?: string;     // Highlight path from this node (future enhancement)
  showProgress?: boolean;  // Show reader progress (future enhancement)
}

// === LAYOUT ALGORITHM ===

/**
 * Apply dagre hierarchical layout to nodes
 * Creates a top-to-bottom tree structure
 */
function applyDagreLayout(nodes: Node<FlowNodeData>[], edges: Edge[]): Node<FlowNodeData>[] {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Configure graph layout
  dagreGraph.setGraph({
    rankdir: 'TB',        // Top to bottom
    nodesep: 120,         // Horizontal spacing between nodes at same rank
    ranksep: 150,         // Vertical spacing between ranks
    marginx: 80,
    marginy: 80,
    align: 'UL',          // Align nodes to upper-left
    ranker: 'tight-tree'  // Use tight-tree algorithm for better hierarchy
  });

  // Add nodes to dagre graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 280, height: 120 });
  });

  // Add edges to dagre graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Apply calculated positions to nodes
  return nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 140, // Center node (width / 2 = 280 / 2)
        y: nodeWithPosition.y - 60   // Center node (height / 2 = 120 / 2)
      }
    };
  });
}

// === CONTROLS WITH HOME BUTTON ===

function HomeControls() {
  const { setViewport, fitView, zoomIn, zoomOut } = useReactFlow();

  const onZoomIn = useCallback(() => { zoomIn({ duration: 300 }); }, [zoomIn]);
  const onZoomOut = useCallback(() => { zoomOut({ duration: 300 }); }, [zoomOut]);
  const onFitView = useCallback(() => { fitView({ duration: 300 }); }, [fitView]);
  const onHome = useCallback(() => { setViewport(DEFAULT_VIEWPORT, { duration: 300 }); }, [setViewport]);

  return (
    <Controls
      className="bg-parchment/95 backdrop-blur-sm border-2 border-ink/20 rounded-lg shadow-lg"
      showInteractive={false}
      showFitView={false}
      showZoom={false}
    >
      <ControlButton onClick={onZoomIn} title="Zoom in">
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </ControlButton>
      <ControlButton onClick={onZoomOut} title="Zoom out">
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </ControlButton>
      <ControlButton onClick={onFitView} title="Fit all nodes in view">
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
          <path d="M3 4a1 1 0 011-1h4a1 1 0 010 2H5v3a1 1 0 01-2 0V4zm10-1a1 1 0 100 2h3v3a1 1 0 102 0V4a1 1 0 00-1-1h-4zM4 13a1 1 0 011 1v3h3a1 1 0 110 2H4a1 1 0 01-1-1v-4a1 1 0 011-1zm14 0a1 1 0 01 1 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h3v-3a1 1 0 011-1z" />
        </svg>
      </ControlButton>
      <ControlButton onClick={onHome} title="Reset to default view">
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </ControlButton>
    </Controls>
  );
}

// === INNER COMPONENT (needs ReactFlowProvider) ===

function StoryFlowVisualizerInner({
  contentFilter,
  entryPoint,
  showProgress = false
}: StoryFlowVisualizerProps) {
  // State
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Transform content registry to graph format
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    return contentRegistryToFlowGraph(allContent);
  }, []);

  // Apply layout algorithm
  const layoutedNodes = useMemo(() => {
    return applyDagreLayout(initialNodes, initialEdges);
  }, [initialNodes, initialEdges]);

  // React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Custom node types
  const nodeTypes: NodeTypes = useMemo(() => ({
    default: StoryNode
  }), []);

  // Handle node click
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node<FlowNodeData>) => {
    setSelectedNodeId(node.id);
    setSidebarOpen(true);
  }, []);

  // Handle sidebar close
  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
    setSelectedNodeId(null);
  }, []);

  // Get selected node data
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return nodes.find(n => n.id === selectedNodeId) || null;
  }, [selectedNodeId, nodes]);

  // Get selected node's choices (from content registry)
  const selectedNodeContent = useMemo(() => {
    if (!selectedNodeId) return null;
    return allContent[selectedNodeId];
  }, [selectedNodeId]);

  // Get selected node's incoming connections
  const incomingConnections = useMemo(() => {
    if (!selectedNodeId) return [];
    return edges
      .filter(edge => edge.target === selectedNodeId)
      .map(edge => ({
        sourceId: edge.source,
        label: edge.label as string || 'Unlabeled'
      }));
  }, [selectedNodeId, edges]);

  return (
    <div className="w-full h-screen bg-parchment-light">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        defaultViewport={DEFAULT_VIEWPORT}
        minZoom={0.2}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: false,
          style: {
            stroke: '#64402e',
            strokeWidth: 2.5
          },
          labelStyle: {
            fill: '#64402e',
            fontSize: 11,
            fontWeight: 500,
            fontFamily: 'ui-sans-serif, system-ui, sans-serif'
          },
          labelBgStyle: {
            fill: '#f9f6f0',
            fillOpacity: 0.9
          },
          labelBgPadding: [6, 4] as [number, number],
          labelBgBorderRadius: 4
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color="#d4c5b0"
          className="opacity-40"
        />
        <HomeControls />
        <MiniMap
          nodeColor={(node) => {
            const data = node.data as FlowNodeData;
            // Use the color map from graph-builder
            const colorMap = {
              entry: '#FFD700',
              convergence: '#4ECDC4',
              lesson: '#95E1D3',
              puzzle: '#F38181',
              ending: '#AA96DA',
              default: '#E0E0E0'
            };
            return colorMap[data.nodeType] || colorMap.default;
          }}
          className="bg-parchment/95 backdrop-blur-sm border-2 border-ink/20 rounded-lg shadow-lg"
          maskColor="rgba(249, 246, 240, 0.7)"
          nodeStrokeWidth={3}
          pannable
          zoomable
        />
      </ReactFlow>

      {/* Sidebar */}
      <ContentSidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        node={selectedNode}
        content={selectedNodeContent}
        incomingConnections={incomingConnections}
      />
    </div>
  );
}

// === EXPORTED WRAPPER ===

export function StoryFlowVisualizer(props: StoryFlowVisualizerProps) {
  return (
    <ReactFlowProvider>
      <StoryFlowVisualizerInner {...props} />
    </ReactFlowProvider>
  );
}
