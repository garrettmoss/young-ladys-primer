import React from 'react';
import { Feather } from 'lucide-react';

interface NameInputModalProps {
  showNameInput: boolean;
  readerName: string;
  setReaderName: (name: string) => void;
  onSubmit: () => void;
  onChooseLater: () => void;
}

export function NameInputModal({
  showNameInput,
  readerName,
  setReaderName,
  onSubmit,
  onChooseLater
}: NameInputModalProps) {
  if (!showNameInput) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Ornate border frame */}
        <div className="modal-border-outer"></div>
        <div className="modal-border-inner"></div>

        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-icon">
              <Feather className="w-16 h-16 text-amber-700" />
            </div>
            <h2 className="modal-title">
              Welcome, Young Reader
            </h2>
            <p className="modal-subtitle">
              By what name shall the Primer know you?
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              value={readerName}
              onChange={(e) => setReaderName(e.target.value)}
              placeholder="Enter your name..."
              className="name-input"
              onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            />
            <div className="space-y-3">
              <button
                onClick={onSubmit}
                className="submit-button"
              >
                Begin Your Journey
              </button>
              <button
                onClick={onChooseLater}
                className="w-full py-2 px-4 border border-amber-300/40 text-amber-700 bg-transparent hover:bg-amber-50/20
                         transition-all duration-200 rounded-md font-serif text-sm italic"
              >
                I shall choose later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
