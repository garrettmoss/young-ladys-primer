import React from 'react';
import { Feather, Eclipse, BookMarked, Bean, Sprout, Flower, Apple, Cake, LucideIcon } from 'lucide-react';
import { AdaptiveLevel, LEVELS } from '../content';
import { MIN_READER_AGE, MAX_READER_AGE } from '../hooks/useReaderPreferences';

interface SettingsPanelProps {
  readerName: string;
  settingsNameInput: string;
  setSettingsNameInput: (value: string) => void;
  isEditingName: boolean;
  isDarkMode: boolean;
  readerLevel: AdaptiveLevel;
  readerStartAge: number | null;
  readerStartDate: string | null;
  ageRevisedDate: string | null;
  currentAge: number | null;
  settingsAgeInput: string;
  setSettingsAgeInput: (value: string) => void;
  isEditingAge: boolean;
  contentProgressCount: number;
  onEditNameClick: () => void;
  onSettingsNameSave: () => void;
  onCancelNameEdit: () => void;
  onEditAgeClick: () => void;
  onSettingsAgeSave: () => void;
  onCancelAgeEdit: () => void;
  onDarkModeToggle: () => void;
  onReaderLevelSelect: (level: AdaptiveLevel) => void;
}

const LEVEL_LABELS: Record<AdaptiveLevel, string> = {
  seed: 'Seed',
  sprout: 'Sprout',
  bloom: 'Bloom',
  fruit: 'Fruit',
};

const LEVEL_AGES: Record<AdaptiveLevel, string> = {
  seed: 'age 4–6',
  sprout: 'age 7–9',
  bloom: 'age 10–12',
  fruit: 'age 13–16',
};

const LEVEL_ICONS: Record<AdaptiveLevel, LucideIcon> = {
  seed: Bean,
  sprout: Sprout,
  bloom: Flower,
  fruit: Apple,
};

export function SettingsPanel({
  readerName,
  settingsNameInput,
  setSettingsNameInput,
  isEditingName,
  isDarkMode,
  readerLevel,
  readerStartAge,
  readerStartDate,
  ageRevisedDate,
  currentAge,
  settingsAgeInput,
  setSettingsAgeInput,
  isEditingAge,
  contentProgressCount,
  onEditNameClick,
  onSettingsNameSave,
  onCancelNameEdit,
  onEditAgeClick,
  onSettingsAgeSave,
  onCancelAgeEdit,
  onDarkModeToggle,
  onReaderLevelSelect
}: SettingsPanelProps) {
  return (
    <div className="space-y-8 mt-6">
      <section className="space-y-4">
        <h3 className="settings-section-header">
          Reader
        </h3>
      {/* Reader Name Setting */}
      <div className="p-4 border border-amber-200 bg-amber-50/30 rounded">
        {!isEditingName ? (
          // Static display mode
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Feather className="w-5 h-5 text-amber-700" />
              <div>
                <strong className="text-amber-900">Reader Name:</strong>
                <span className="ml-2 text-amber-800">{readerName}</span>
              </div>
            </div>
            <button
              onClick={onEditNameClick}
              className="py-1 px-4 text-sm bg-amber-600 text-amber-50 rounded hover:bg-amber-700 transition-colors font-serif"
            >
              Edit
            </button>
          </div>
        ) : (
          // Edit mode
          <div className="flex items-center gap-3">
            <strong className="text-amber-900 whitespace-nowrap">Reader Name:</strong>
            <input
              type="text"
              value={settingsNameInput}
              onChange={(e) => setSettingsNameInput(e.target.value)}
              placeholder="Enter your name..."
              className="name-input flex-1"
              onKeyDown={(e) => e.key === 'Enter' && onSettingsNameSave()}
            />
            <button
              onClick={onSettingsNameSave}
              className="py-2 px-4 bg-amber-700 text-amber-50 rounded hover:bg-amber-800 transition-colors font-serif whitespace-nowrap"
            >
              Save
            </button>
            <button
              onClick={onCancelNameEdit}
              className="py-2 px-4 border border-amber-300 text-amber-700 bg-transparent rounded hover:bg-amber-50/20 transition-colors font-serif whitespace-nowrap"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Reader Age — editable. Saving overwrites readerStartAge and resets
          ageRevisedDate; readerStartDate (onboarding date) is preserved. */}
      {readerStartAge != null && (
        <div className="p-4 border border-amber-200 bg-amber-50/30 rounded">
          {!isEditingAge ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cake className="w-5 h-5 text-amber-700" />
                <div>
                  <strong className="text-amber-900">Age:</strong>
                  <span className="ml-2 text-amber-800">{currentAge ?? readerStartAge}</span>
                  {currentAge != null && currentAge !== readerStartAge && ageRevisedDate && (
                    <span className="ml-2 text-amber-600 text-sm">
                      (last set at {readerStartAge} on {ageRevisedDate})
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onEditAgeClick}
                className="py-1 px-4 text-sm bg-amber-600 text-amber-50 rounded hover:bg-amber-700 transition-colors font-serif"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <strong className="text-amber-900 whitespace-nowrap">Age:</strong>
              <input
                type="number"
                inputMode="numeric"
                min={MIN_READER_AGE}
                max={MAX_READER_AGE}
                value={settingsAgeInput}
                onChange={(e) => setSettingsAgeInput(e.target.value)}
                placeholder={`${MIN_READER_AGE}–${MAX_READER_AGE}`}
                className="name-input flex-1"
                onKeyDown={(e) => e.key === 'Enter' && onSettingsAgeSave()}
              />
              <button
                onClick={onSettingsAgeSave}
                className="py-2 px-4 bg-amber-700 text-amber-50 rounded hover:bg-amber-800 transition-colors font-serif whitespace-nowrap"
              >
                Save
              </button>
              <button
                onClick={onCancelAgeEdit}
                className="py-2 px-4 border border-amber-300 text-amber-700 bg-transparent rounded hover:bg-amber-50/20 transition-colors font-serif whitespace-nowrap"
              >
                Cancel
              </button>
            </div>
          )}
          {!isEditingAge && readerStartDate && (
            <div className="mt-2 ml-8 text-xs text-amber-600 italic">
              First met the Primer on {readerStartDate}
            </div>
          )}
        </div>
      )}

      {/* Reader Level Setting */}
      <div className="p-4 border border-amber-200 bg-amber-50/30 rounded">
        <div className="mb-4">
          <strong className="text-amber-900">Reading Level:</strong>
          <span className="ml-2 text-amber-800">
            {LEVEL_LABELS[readerLevel]} <span className="text-amber-600 text-sm">({LEVEL_AGES[readerLevel]})</span>
          </span>
        </div>
        <div className="level-slider" role="radiogroup" aria-label="Reading level">
          <div className="level-slider-track" aria-hidden="true" />
          {LEVELS.map(level => {
            const Icon = LEVEL_ICONS[level];
            const isActive = level === readerLevel;
            return (
              <button
                key={level}
                role="radio"
                aria-checked={isActive}
                aria-label={`${LEVEL_LABELS[level]}, ${LEVEL_AGES[level]}`}
                onClick={() => onReaderLevelSelect(level)}
                className={`level-stop ${isActive ? 'level-stop-active' : ''}`}
              >
                <span className="level-stop-circle">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="level-stop-label">{LEVEL_LABELS[level]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reading Progress */}
      <div className="p-4 border border-amber-200 bg-amber-50/30 rounded">
        <div className="flex items-center gap-3">
          <BookMarked className="w-5 h-5 text-amber-700" />
          <div>
            <strong className="text-amber-900">Reading Progress:</strong>
            <span className="ml-2 text-amber-800">{contentProgressCount} passages explored</span>
          </div>
        </div>
      </div>
      </section>

      <section className="space-y-4">
        <h3 className="settings-section-header">
          Appearance
        </h3>
        {/* Illumination Setting */}
        <div className="p-4 border border-amber-200 bg-amber-50/30 rounded">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eclipse className="w-5 h-5 text-amber-700" />
              <div>
                <strong className="text-amber-900">Illumination:</strong>
                <span className="ml-2 text-amber-800">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
            </div>
            <button
              onClick={onDarkModeToggle}
              className="py-1 px-4 text-sm bg-amber-600 text-amber-50 rounded hover:bg-amber-700 transition-colors font-serif"
            >
              Toggle
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
