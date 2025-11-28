/**
 * Content Sidebar
 *
 * Displays detailed information about a selected node including:
 * - Full content text
 * - Outgoing choices
 * - Incoming connections
 * - Metadata (type, word count, etc.)
 */

import { type Node } from 'reactflow';
import { type FlowNodeData, getNodeColor } from '@/utils/graph-builder';
import type { StoryContent } from '@/content';

// === TYPES ===

interface ContentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  node: Node<FlowNodeData> | null;
  content: StoryContent | null;
  incomingConnections: Array<{ sourceId: string; label: string }>;
}

// === HELPER FUNCTIONS ===

/**
 * Calculate estimated reading time based on word count
 * Assumes 200 words per minute reading speed
 */
function calculateReadingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
}

/**
 * Get full content text (handles string vs function content)
 */
function getContentText(content: StoryContent | null): string {
  if (!content) return '';
  return typeof content.content === 'string'
    ? content.content
    : '[Dynamic content - varies based on context]';
}

// === MAIN COMPONENT ===

export function ContentSidebar({
  isOpen,
  onClose,
  node,
  content,
  incomingConnections
}: ContentSidebarProps) {
  if (!isOpen || !node || !content) {
    return null;
  }

  const { label, nodeType, choiceCount, incomingEdges } = node.data;
  const contentText = getContentText(content);
  const readingTime = calculateReadingTime(contentText);
  const borderColor = getNodeColor(nodeType);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        className="fixed right-0 top-0 h-screen w-96 bg-parchment border-l-2 border-ink/20 shadow-2xl z-50 overflow-y-auto"
        style={{ borderLeftColor: borderColor }}
      >
        {/* Header */}
        <div
          className="sticky top-0 bg-parchment border-b-2 border-ink/10 z-10 p-4"
          style={{ backgroundColor: `${borderColor}10` }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="font-serif text-lg font-bold text-ink leading-tight">
                {label}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white"
                  style={{ backgroundColor: borderColor }}
                >
                  {nodeType}
                </span>
                {incomingEdges >= 3 && (
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-flow-convergence text-white"
                    title="Convergence point"
                  >
                    ◈ Convergence
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-ink/10 transition-colors"
              aria-label="Close sidebar"
            >
              <span className="text-xl text-ink/60">×</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Metadata */}
          <section>
            <h3 className="font-serif text-sm font-semibold text-ink/80 mb-2 uppercase tracking-wide">
              Metadata
            </h3>
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/60">Node ID:</dt>
                <dd className="font-mono text-xs text-ink">{node.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Reading time:</dt>
                <dd className="text-ink">{readingTime} min</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Choices:</dt>
                <dd className="text-ink">{choiceCount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Incoming paths:</dt>
                <dd className="text-ink">{incomingEdges}</dd>
              </div>
            </dl>
          </section>

          {/* Content text */}
          <section>
            <h3 className="font-serif text-sm font-semibold text-ink/80 mb-2 uppercase tracking-wide">
              Content
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-ink/80 leading-relaxed whitespace-pre-wrap">
                {contentText}
              </p>
            </div>
          </section>

          {/* Outgoing choices */}
          {content.choices && content.choices.length > 0 && (
            <section>
              <h3 className="font-serif text-sm font-semibold text-ink/80 mb-2 uppercase tracking-wide">
                Choices ({content.choices.length})
              </h3>
              <ul className="space-y-2">
                {content.choices.map((choice, index) => (
                  <li
                    key={index}
                    className="p-2 bg-parchment-light rounded border border-ink/10"
                  >
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 text-ink/40 font-mono text-xs mt-0.5">
                        {index + 1}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-ink font-medium leading-snug">
                          {choice.text}
                        </p>
                        <p className="text-xs text-ink/50 font-mono mt-1">
                          → {choice.action}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Incoming connections */}
          {incomingConnections.length > 0 && (
            <section>
              <h3 className="font-serif text-sm font-semibold text-ink/80 mb-2 uppercase tracking-wide">
                Incoming Connections ({incomingConnections.length})
              </h3>
              <ul className="space-y-1">
                {incomingConnections.map((connection, index) => (
                  <li
                    key={index}
                    className="p-2 bg-parchment-light rounded border border-ink/10 text-xs"
                  >
                    <div className="font-mono text-ink/60 mb-1">
                      ← {connection.sourceId}
                    </div>
                    <div className="text-ink/80 italic">
                      &quot;{connection.label}&quot;
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Ending indicator */}
          {choiceCount === 0 && (
            <section className="bg-flow-ending/10 border border-flow-ending/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-2xl">✦</span>
                <p className="text-ink/80 italic">
                  This is an ending node. The story concludes here.
                </p>
              </div>
            </section>
          )}
        </div>
      </aside>
    </>
  );
}
