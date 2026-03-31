/**
 * Story Node
 *
 * Custom React Flow node renderer with Victorian aesthetic.
 * Displays node title, type badge, and convergence indicators.
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { type FlowNodeData, getNodeColor } from '@/utils/graph-builder';
import { NODE_WIDTH, NODE_HEIGHT, FLOW_COLORS } from './flow-constants';

// === ICON COMPONENTS ===

/**
 * Type badge icons for different node types
 */
const TypeIcon = ({ nodeType }: { nodeType: FlowNodeData['nodeType'] }) => {
  const icons = {
    entry: '⭐',
    convergence: '◈',
    lesson: '📖',
    puzzle: '🔒',
    ending: '✦',
    default: '○'
  };

  return (
    <span className="text-sm" role="img" aria-label={nodeType}>
      {icons[nodeType]}
    </span>
  );
};

// === MAIN COMPONENT ===

export const StoryNode = memo(({ data, selected }: NodeProps<FlowNodeData>) => {
  const { label, nodeType, choiceCount, incomingEdges } = data;

  // Get border color based on node type
  const borderColor = getNodeColor(nodeType);

  // Convergence indicator (3+ incoming edges)
  const isConvergence = incomingEdges >= 3;

  return (
    <div
      className="relative"
      style={{ width: NODE_WIDTH }}
    >
      {/* Incoming handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3"
        style={{ background: borderColor }}
      />

      {/* Node card */}
      <div
        className={`
          bg-parchment rounded-lg flex flex-col
          border-2 transition-all duration-200
          hover:shadow-lg cursor-pointer
          ${selected ? 'ring-2 ring-amber-500 ring-offset-2' : ''}
        `}
        style={{
          width: '100%',
          minHeight: NODE_HEIGHT,
          borderColor: selected ? '#f59e0b' : borderColor,
          boxShadow: selected
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.05)'
        }}
      >
        {/* Convergence badge */}
        {isConvergence && (
          <div
            className="absolute -top-2 -right-2 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md z-10"
            style={{ backgroundColor: FLOW_COLORS.convergence }}
            title={`Convergence point: ${incomingEdges} paths merge here`}
          >
            {incomingEdges}
          </div>
        )}

        {/* Header with type badge */}
        <div
          className="px-4 py-2.5 rounded-t-lg border-b border-ink/10 flex items-center gap-2"
          style={{ backgroundColor: `${borderColor}15` }}
        >
          <TypeIcon nodeType={nodeType} />
          <span className="text-sm font-medium uppercase tracking-wide text-ink/60">
            {nodeType}
          </span>
        </div>

        {/* Title */}
        <div className="px-5 py-4 flex-1 flex items-center">
          <h3 className="font-serif text-lg font-semibold text-ink leading-tight line-clamp-2">
            {label}
          </h3>
        </div>

        {/* Footer with choice count */}
        {choiceCount > 0 && (
          <div className="px-4 pb-3 text-sm text-ink/50">
            {choiceCount} {choiceCount === 1 ? 'choice' : 'choices'}
          </div>
        )}

        {/* Ending indicator */}
        {choiceCount === 0 && (
          <div className="px-4 pb-3 text-sm italic text-ink/50">
            The End
          </div>
        )}
      </div>

      {/* Outgoing handle */}
      {choiceCount > 0 && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3"
          style={{ background: borderColor }}
        />
      )}
    </div>
  );
});

StoryNode.displayName = 'StoryNode';
