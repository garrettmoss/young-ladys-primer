import React from 'react';
import { School, ChevronLeft } from 'lucide-react';

interface NavigationButtonsProps {
  hasChoices: boolean;
  canGoBack: boolean;
  onBack: () => void;
  onReturnToBeginning: () => void;
}

export function NavigationButtons({
  hasChoices,
  canGoBack,
  onBack,
  onReturnToBeginning
}: NavigationButtonsProps) {
  return (
    <div className="space-y-3 mt-6">
      {/* "or" separator - only show if there are choices above */}
      {hasChoices && (
        <div className="flex items-center justify-center my-4">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-700/20 to-transparent w-24"></div>
          <span className="text-amber-600/40 mx-3 text-sm">or</span>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-700/20 to-transparent w-24"></div>
        </div>
      )}

      {/* Back button - only show when back navigation is possible */}
      {canGoBack && (
        <button
          onClick={onBack}
          className="home-button group mb-3"
        >
          <ChevronLeft className="home-button-icon" />
          <span className="home-button-text">
            Go Back
          </span>
        </button>
      )}

      {/* Home button */}
      <button
        onClick={onReturnToBeginning}
        className="home-button group"
      >
        <School className="home-button-icon" />
        <span className="home-button-text">
          Return to the Beginning
        </span>
      </button>
    </div>
  );
}
