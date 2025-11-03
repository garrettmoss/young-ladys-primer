import React from 'react';
import { Feather, Eclipse, BookMarked } from 'lucide-react';

interface SettingsPanelProps {
  readerName: string;
  settingsNameInput: string;
  setSettingsNameInput: (value: string) => void;
  isEditingName: boolean;
  isDarkMode: boolean;
  contentProgressCount: number;
  onEditNameClick: () => void;
  onSettingsNameSave: () => void;
  onCancelNameEdit: () => void;
  onDarkModeToggle: () => void;
}

export function SettingsPanel({
  readerName,
  settingsNameInput,
  setSettingsNameInput,
  isEditingName,
  isDarkMode,
  contentProgressCount,
  onEditNameClick,
  onSettingsNameSave,
  onCancelNameEdit,
  onDarkModeToggle
}: SettingsPanelProps) {
  return (
    <div className="space-y-4 mt-6">
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
    </div>
  );
}
