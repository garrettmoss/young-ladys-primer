import React from 'react';
import { Settings, Bug } from 'lucide-react';

interface FooterProps {
  readerName: string;
  onSettingsClick: () => void;
  onDebugClick: () => void;
  isDevelopment: boolean;
}

export function Footer({
  readerName,
  onSettingsClick,
  onDebugClick,
  isDevelopment
}: FooterProps) {
  return (
    <div className="primer-footer">
      <div className="footer-decoration">
        <span className="footer-flourish">❦</span>
        <div className="footer-line"></div>
        <span className="footer-flourish">❦</span>
      </div>
      <p className="footer-text">
        {readerName && `Crafted for ${readerName} • `}
        Anno Domini MMXXV
      </p>
      <div className="footer-stats">
        <button
          onClick={onSettingsClick}
          className="footer-stat hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1"
          aria-label="Open settings"
        >
          <Settings className="w-5 h-5" />
          <span className="text-lg">Settings</span>
        </button>
        {isDevelopment && (
          <button
            onClick={onDebugClick}
            className="footer-stat hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1"
            aria-label="Open debug tools"
          >
            <Bug className="w-5 h-5" />
            <span className="text-lg">Debug</span>
          </button>
        )}
      </div>
    </div>
  );
}
