import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { AdaptiveLevel, levelForAge } from '../content';

/**
 * The Primer tracks the reader along three independent axes:
 *
 *   readerStartAge   — the age value last asserted by the reader. Set at
 *                      onboarding and overwritten if they later edit it.
 *   readerStartDate  — ISO date the reader first met the Primer. Set once
 *                      at onboarding, never changes. Sentimental + historical
 *                      ("you've been reading the Primer for 2 years").
 *   ageRevisedDate   — ISO date the age was last asserted. Equal to
 *                      readerStartDate at onboarding; diverges if the reader
 *                      edits their age in Settings. The current-age math
 *                      anchors here, NOT to start date — so a 6-year-old who
 *                      corrects their age to 8 a year later will be treated
 *                      as 8 today and bump to 9 a year from that correction.
 *   readerLevel      — active adaptive tier. Initially derived from start
 *                      age, but the reader (or future adaptive engine) may
 *                      shift it freely without touching the age values.
 *
 * `currentAge` is derived: readerStartAge + yearsSince(ageRevisedDate).
 */
interface ReaderPreferences {
  readerName: string;
  setReaderName: (name: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  readerLevel: AdaptiveLevel;
  setReaderLevel: (level: AdaptiveLevel) => void;
  handleReaderLevelSelect: (level: AdaptiveLevel) => void;
  readerStartAge: number | null;
  readerStartDate: string | null;
  ageRevisedDate: string | null;
  currentAge: number | null;
  showWelcome: boolean;
  setShowWelcome: (show: boolean) => void;
  settingsNameInput: string;
  setSettingsNameInput: (name: string) => void;
  isEditingName: boolean;
  setIsEditingName: (isEditing: boolean) => void;
  readerAgeInput: string;
  setReaderAgeInput: (age: string) => void;
  settingsAgeInput: string;
  setSettingsAgeInput: (age: string) => void;
  isEditingAge: boolean;
  setIsEditingAge: (isEditing: boolean) => void;
  handleNameSubmit: () => void;
  handleChooseLater: () => void;
  handleDarkModeToggle: () => void;
  handleEditNameClick: () => void;
  handleSettingsNameSave: () => void;
  handleCancelNameEdit: () => void;
  handleEditAgeClick: () => void;
  handleSettingsAgeSave: () => void;
  handleCancelAgeEdit: () => void;
}

export const MIN_READER_AGE = 4;
export const MAX_READER_AGE = 16;

/**
 * Compute full years elapsed between an ISO date string and today.
 * Returns 0 for invalid or future dates.
 */
function yearsSince(isoDate: string): number {
  const start = new Date(isoDate);
  if (Number.isNaN(start.getTime())) return 0;
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    years -= 1;
  }
  return Math.max(0, years);
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Custom hook for managing reader preferences (name, dark mode, etc.)
 * Handles localStorage persistence and provides convenient methods for common operations
 */
export function useReaderPreferences(): ReaderPreferences {
  // Core preferences stored in localStorage
  const [readerName, setReaderName] = useLocalStorage<string>('young-ladys-primer-reader-name', '');
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('young-ladys-primer-dark-mode', false);
  const [readerLevel, setReaderLevel] = useLocalStorage<AdaptiveLevel>('young-ladys-primer-reader-level', 'seed');
  const [readerStartAge, setReaderStartAge] = useLocalStorage<number | null>('young-ladys-primer-reader-start-age', null);
  const [readerStartDate, setReaderStartDate] = useLocalStorage<string | null>('young-ladys-primer-reader-start-date', null);
  const [ageRevisedDate, setAgeRevisedDate] = useLocalStorage<string | null>('young-ladys-primer-age-revised-date', null);

  // UI state for welcome modal and inline editing in Settings
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const [settingsNameInput, setSettingsNameInput] = useState<string>('');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [readerAgeInput, setReaderAgeInput] = useState<string>('');
  const [settingsAgeInput, setSettingsAgeInput] = useState<string>('');
  const [isEditingAge, setIsEditingAge] = useState<boolean>(false);

  // Re-prompt if either name or start age is missing. The two are set
  // together at onboarding, so a missing start age means an incomplete
  // setup (e.g. a pre-age-tracking install).
  useEffect(() => {
    if (!readerName || readerStartAge == null) {
      setShowWelcome(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Anchor age math to ageRevisedDate so edits in Settings restart the
  // year clock. Fall back to readerStartDate for installs that predate
  // ageRevisedDate (it gets filled in next time the reader edits or
  // re-onboards).
  const ageAnchor = ageRevisedDate ?? readerStartDate;
  const currentAge: number | null =
    readerStartAge != null && ageAnchor
      ? readerStartAge + yearsSince(ageAnchor)
      : null;

  /**
   * Handle welcome-modal submission - saves name, start age, start date,
   * and the derived initial level, then closes the modal.
   */
  const handleNameSubmit = (): void => {
    const trimmedName = readerName.trim();
    if (!trimmedName) return;
    const parsedAge = parseInt(readerAgeInput, 10);
    if (!Number.isFinite(parsedAge) || parsedAge < MIN_READER_AGE || parsedAge > MAX_READER_AGE) return;
    const today = todayIso();
    setReaderName(trimmedName);
    setReaderStartAge(parsedAge);
    setReaderStartDate(today);
    setAgeRevisedDate(today);
    setReaderLevel(levelForAge(parsedAge));
    setShowWelcome(false);
  };

  /**
   * Handle "choose later" - sets default name 'Aria' and closes modal.
   * Start age is left unset; level stays at its default ('seed'). The
   * reader can fill these in later via Settings.
   */
  const handleChooseLater = (): void => {
    setReaderName('Aria');
    setShowWelcome(false);
  };

  const handleDarkModeToggle = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  /**
   * Manual level override from Settings. Intentionally does NOT touch
   * readerStartAge — the start age is the anchor, the level is the dial.
   */
  const handleReaderLevelSelect = (level: AdaptiveLevel): void => {
    setReaderLevel(level);
  };

  const handleEditNameClick = (): void => {
    setSettingsNameInput(readerName);
    setIsEditingName(true);
  };

  const handleSettingsNameSave = (): void => {
    const trimmedName = settingsNameInput.trim();
    if (trimmedName) {
      setReaderName(trimmedName);
      setIsEditingName(false);
    }
  };

  const handleCancelNameEdit = (): void => {
    setIsEditingName(false);
    setSettingsNameInput('');
  };

  const handleEditAgeClick = (): void => {
    // Seed the input with the reader's current displayed age, not their
    // original start age — that's what they see and what they're correcting.
    setSettingsAgeInput(String(currentAge ?? readerStartAge ?? ''));
    setIsEditingAge(true);
  };

  /**
   * Saving an edited age overwrites readerStartAge and resets
   * ageRevisedDate to today. readerStartDate is intentionally left alone
   * — that's the "first met the Primer" anchor and never changes.
   */
  const handleSettingsAgeSave = (): void => {
    const parsedAge = parseInt(settingsAgeInput, 10);
    if (!Number.isFinite(parsedAge) || parsedAge < MIN_READER_AGE || parsedAge > MAX_READER_AGE) return;
    setReaderStartAge(parsedAge);
    setAgeRevisedDate(todayIso());
    setIsEditingAge(false);
  };

  const handleCancelAgeEdit = (): void => {
    setIsEditingAge(false);
    setSettingsAgeInput('');
  };

  return {
    readerName,
    setReaderName,
    isDarkMode,
    setIsDarkMode,
    readerLevel,
    setReaderLevel,
    handleReaderLevelSelect,
    readerStartAge,
    readerStartDate,
    ageRevisedDate,
    currentAge,
    showWelcome,
    setShowWelcome,
    settingsNameInput,
    setSettingsNameInput,
    isEditingName,
    setIsEditingName,
    readerAgeInput,
    setReaderAgeInput,
    settingsAgeInput,
    setSettingsAgeInput,
    isEditingAge,
    setIsEditingAge,
    handleNameSubmit,
    handleChooseLater,
    handleDarkModeToggle,
    handleEditNameClick,
    handleSettingsNameSave,
    handleCancelNameEdit,
    handleEditAgeClick,
    handleSettingsAgeSave,
    handleCancelAgeEdit,
  };
}
