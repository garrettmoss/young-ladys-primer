import React from 'react';
import { Feather } from 'lucide-react';

interface NameInputModalProps {
  showNameInput: boolean;
  readerName: string;
  setReaderName: (name: string) => void;
  readerAgeInput: string;
  setReaderAgeInput: (age: string) => void;
  onSubmit: () => void;
  onChooseLater: () => void;
}

export function NameInputModal({
  showNameInput,
  readerName,
  setReaderName,
  readerAgeInput,
  setReaderAgeInput,
  onSubmit,
  onChooseLater
}: NameInputModalProps) {
  if (!showNameInput) return null;

  const MIN_AGE = 4;
  const MAX_AGE = 16;
  const parsedAge = parseInt(readerAgeInput, 10);
  const ageValid = Number.isFinite(parsedAge) && parsedAge >= MIN_AGE && parsedAge <= MAX_AGE;
  const canSubmit = readerName.trim().length > 0 && ageValid;

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
              onKeyDown={(e) => e.key === 'Enter' && canSubmit && onSubmit()}
            />
            <div className="space-y-2">
              <p className="modal-subtitle text-center">
                And how many years have you walked the earth?
              </p>
              <input
                type="number"
                inputMode="numeric"
                min={MIN_AGE}
                max={MAX_AGE}
                value={readerAgeInput}
                onChange={(e) => setReaderAgeInput(e.target.value)}
                placeholder={`Your age (${MIN_AGE}–${MAX_AGE})...`}
                className="name-input"
                onKeyDown={(e) => e.key === 'Enter' && canSubmit && onSubmit()}
              />
            </div>
            <div className="space-y-3">
              <button
                onClick={onSubmit}
                disabled={!canSubmit}
                className="submit-button disabled:opacity-50 disabled:cursor-not-allowed"
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
