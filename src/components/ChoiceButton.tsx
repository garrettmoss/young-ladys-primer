import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Choice } from '../content/index';

interface ChoiceButtonProps {
  choice: Choice;
  icon?: React.ComponentType<{ className?: string }> | null;
  isAvailable: boolean;
  onClick: () => void;
}

export function ChoiceButton({
  choice,
  icon: IconComponent,
  isAvailable,
  onClick
}: ChoiceButtonProps) {
  return (
    <button
      onClick={() => isAvailable ? onClick() : null}
      disabled={!isAvailable}
      className={`choice-button group ${isAvailable ? '' : 'disabled'}`}
    >
      <div className="flex items-center gap-3">
        {IconComponent && (
          <IconComponent className="w-5 h-5 text-amber-700" />
        )}
        <span className="font-medium relative z-10" style={{ letterSpacing: '0.02em' }}>
          {choice.text}
          {!isAvailable && <span className="text-sm italic ml-2">(Coming soon)</span>}
        </span>
      </div>
      {isAvailable && (
        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-700" />
      )}
    </button>
  );
}
