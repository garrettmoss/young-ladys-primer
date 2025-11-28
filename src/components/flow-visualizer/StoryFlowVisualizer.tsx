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
  Background,
  MiniMap,
  Node,
  Edge,
  NodeTypes,
  useNodesState,
  useEdgesState,
  BackgroundVariant
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

import { contentRegistryToFlowGraph, type FlowNodeData } from '@/utils/graph-builder';
import { allContent } from '@/content';
import { StoryNode } from './StoryNode';
import { ContentSidebar } from './ContentSidebar';

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
    nodesep: 80,          // Horizontal spacing
    ranksep: 120,         // Vertical spacing
    marginx: 50,
    marginy: 50
  });

  // Add nodes to dagre graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 250, height: 100 });
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
        x: nodeWithPosition.x - 125, // Center node (width / 2)
        y: nodeWithPosition.y - 50   // Center node (height / 2)
      }
    };
  });
}

// === MAIN COMPONENT ===

export function StoryFlowVisualizer({
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
    return nodes.find(n => n.id === selectedNodeId);
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
        fitView
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: false,
          style: { stroke: '#64402e', strokeWidth: 2 }
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#d4c5b0"
        />
        <Controls
          className="bg-parchment border border-ink/20 rounded-lg shadow-lg"
          showInteractive={false}
        />
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
          className="bg-parchment border border-ink/20 rounded-lg shadow-lg"
          maskColor="rgba(249, 246, 240, 0.6)"
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
