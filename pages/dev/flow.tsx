/**
 * Flow Visualizer Development Page
 *
 * Test page for the interactive story flow visualizer.
 * Access at: /dev/flow
 */

import { StoryFlowVisualizer } from '@/components/flow-visualizer';

export default function FlowVisualizerPage() {
  return (
    <div className="w-full h-screen">
      <StoryFlowVisualizer />
    </div>
  );
}
