/**
 * Flow Visualizer Development Page
 *
 * Test page for the interactive story flow visualizer.
 * Access at: /dev/flow
 */

import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import { StoryFlowVisualizer } from '@/components/flow-visualizer';

export default function FlowVisualizerPage() {
  const router = useRouter();

  return (
    <div className="w-full h-screen relative">
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 bg-white/90 hover:bg-white border border-amber-300 rounded-lg shadow-md text-amber-900 font-medium text-sm transition-colors cursor-pointer"
        aria-label="Back to Primer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Primer
      </button>
      <StoryFlowVisualizer />
    </div>
  );
}
