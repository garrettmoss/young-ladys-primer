import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

interface HeaderProps {
  contentKey: string;
  isDarkMode: boolean;
}

export function Header({ contentKey }: HeaderProps) {
  return (
    <div className="primer-header">
      {/* Decorative line */}
      <div className="flex items-center justify-center mb-6">
        <div className="decorative-line"></div>
        <div className="header-icon-container">
          <div className="sparkle-animation">
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <BookOpen className="book-icon" />
        </div>
        <div className="decorative-line"></div>
      </div>

      <h1 className="main-title">
        <span className="title-line-1">
          A Young Lady's
        </span>
        <br />
        <span className="title-line-2">
          Illustrated Primer
        </span>
      </h1>

      {contentKey === 'welcome' && (
        <p className="subtitle">
          "A book that adapts itself to the mind of its reader"
        </p>
      )}

      {/* Decorative flourish */}
      <div className="flex items-center justify-center mt-4">
        <span className="text-amber-600/60 text-2xl">❦</span>
      </div>
    </div>
  );
}
