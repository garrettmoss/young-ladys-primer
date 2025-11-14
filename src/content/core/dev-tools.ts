import { StoryContent, ContentContext } from '../index';

/**
 * Debug page - only accessible in development mode
 * Provides tools for testing and inspecting application state
 */

/**
 * Syntax highlight JSON string with color-coded tokens
 */
function syntaxHighlightJSON(json: string): string {
  // Tokenize JSON with regex and wrap each token type in colored spans
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
      let cls = 'json-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'json-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-null';
      }
      return `<span class="${cls}">${match}</span>`;
    })
    .replace(/([{}[\],])/g, '<span class="json-punctuation">$1</span>');
}

/**
 * Determine the type of a parsed JSON value
 */
function getJSONType(parsed: unknown): string {
  if (Array.isArray(parsed)) return 'Array';
  if (parsed === null) return 'null';
  return typeof parsed === 'object' ? 'Object' : typeof parsed;
}

const debugPage: StoryContent = {
  title: 'Developer Tools',
  content: (_context: ContentContext) => {
    let html = `<strong>Development Mode Active</strong>
This page provides debugging utilities for testing the Primer's behavior. It will not appear in production builds.

<div style="margin: 1.5rem 0; padding: 1rem; border: 2px solid var(--color-warning, #dc2626); border-radius: 0.5rem; background: var(--bg-warning-subtle, rgba(220, 38, 38, 0.1));"><div style="font-weight: bold; margin-bottom: 0.5rem; color: var(--color-warning, #dc2626);">⚠️ Destructive Actions</div><button onclick="if (window.confirm('⚠️ WARNING: This will permanently delete ALL localStorage data including your name, story progress, dark mode preference, and navigation history.\\n\\nThe page will reload after clearing.\\n\\nAre you absolutely sure?')) { localStorage.clear(); window.location.reload(); }" style="margin: 0 0.5rem 0.5rem 0; padding: 0.5rem 1rem; background: #dc2626; color: white; border: none; border-radius: 0.375rem; cursor: pointer; font-weight: 500;" onmouseover="this.style.background='#b91c1c'" onmouseout="this.style.background='#dc2626'">🗑️ Clear All Data</button><button onclick="if (window.confirm('⚠️ This will clear your name, story progress, and navigation history.\\n\\nDark mode preference will be preserved.\\n\\nThe page will reload after resetting.\\n\\nProceed?')) { const darkMode = localStorage.getItem('young-ladys-primer-dark-mode'); localStorage.clear(); if (darkMode) localStorage.setItem('young-ladys-primer-dark-mode', darkMode); window.location.reload(); }" style="margin: 0 0.5rem 0.5rem 0; padding: 0.5rem 1rem; background: #ea580c; color: white; border: none; border-radius: 0.375rem; cursor: pointer; font-weight: 500;" onmouseover="this.style.background='#c2410c'" onmouseout="this.style.background='#ea580c'">👤 Reset to First Time User</button></div>

<strong>LocalStorage Contents:</strong>
`;

    // Read localStorage if available
    if (typeof window !== 'undefined' && localStorage) {
      const keys = Object.keys(localStorage);

      if (keys.length === 0) {
        html += '<em>(No data stored)</em>\n';
      } else {
        keys.sort().forEach((key, index) => {
          const value = localStorage.getItem(key) || '';
          const uniqueId = `debug-item-${index}`;

          // Escape HTML helper
          const escapeHtml = (str: string) =>
            str.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#039;');

          // Try to parse as JSON
          let displayValue = value;
          let isJSON = false;
          let jsonType = 'String';
          let parsedValue: unknown;

          try {
            parsedValue = JSON.parse(value);
            displayValue = JSON.stringify(parsedValue, null, 2);
            isJSON = true;
            jsonType = getJSONType(parsedValue);
          } catch {
            // Not JSON, use as-is
          }

          // Apply syntax highlighting if JSON
          const highlightedValue = isJSON
            ? syntaxHighlightJSON(displayValue)
            : escapeHtml(displayValue);

          // Determine if we need expand/collapse (based on display length)
          const COLLAPSE_THRESHOLD = 200;
          const needsCollapse = displayValue.length > COLLAPSE_THRESHOLD;

          // Build type badge
          const typeBadge = `<span class="debug-type-badge">[${jsonType}]</span>`;

          // Build the item HTML
          html += `<div class="debug-item">`;

          // Key name and badge (always shown without icon)
          html += `<div class="debug-key">${escapeHtml(key)}${typeBadge}</div>`;

          // Value display with optional collapse icon
          if (needsCollapse) {
            html += `<div class="debug-value-wrapper">
<span class="debug-collapse-icon" id="${uniqueId}-icon" onclick="
  const valueEl = document.getElementById('${uniqueId}-value');
  const iconEl = document.getElementById('${uniqueId}-icon');
  const isCollapsed = valueEl.classList.contains('debug-collapsed');
  if (isCollapsed) {
    valueEl.classList.remove('debug-collapsed');
    valueEl.classList.add('debug-expanded');
    iconEl.textContent = '▼';
  } else {
    valueEl.classList.add('debug-collapsed');
    valueEl.classList.remove('debug-expanded');
    iconEl.textContent = '▶';
  }
">▶</span>
<div class="debug-value debug-collapsed" id="${uniqueId}-value">${highlightedValue}</div>
</div>`;
          } else {
            html += `<div class="debug-value" id="${uniqueId}-value">${highlightedValue}</div>`;
          }

          // Add copy button
          const escapedFullValue = escapeHtml(value);
          html += `<button class="debug-copy" onclick="navigator.clipboard.writeText(this.getAttribute('data-value')).then(() => { const btn = this; const orig = btn.textContent; btn.textContent = '✓ Copied!'; setTimeout(() => btn.textContent = orig, 1500); })" data-value="${escapedFullValue.replace(/"/g, '&quot;')}">Copy ${isJSON ? 'JSON' : 'Value'}</button>`;

          // Add metadata for collapsed items
          if (needsCollapse) {
            html += `<div class="debug-meta">Collapsed: Showing ~100 chars of ${displayValue.length} total</div>`;
          }

          html += `</div>
`;
        });
      }
    } else {
      html += '<em>(localStorage not available)</em>\n';
    }

    return html.trim();
  }
};

/**
 * Export all dev tools content
 */
export const devToolsContent = {
  debug: debugPage
};
