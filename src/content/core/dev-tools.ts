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
  },
  choices: [
    {
      text: '🗑️ Clear All Data (Reset Everything)',
      action: 'debug_clear_all'
    },
    {
      text: '👤 Reset to First Time User (Clear Name & Progress)',
      action: 'debug_reset_user'
    },
    {
      text: '🏠 Return to Welcome',
      action: 'welcome'
    }
  ]
};

/**
 * Debug action handlers
 * These are special actions that perform debug operations
 */

const debugClearAll: StoryContent = {
  title: 'Confirm: Clear All Data?',
  content: `
<strong style="color: #dc2626;">⚠️ Warning: Destructive Action</strong>

This will permanently delete ALL data stored in localStorage, including:
- Your reader name
- Story progress and navigation history
- Dark mode preference
- All conversation history

The page will reload after clearing.

Are you sure you want to proceed?
  `.trim(),
  choices: [
    {
      text: '❌ Cancel (Go Back)',
      action: 'debug'
    },
    {
      text: '✓ Yes, Clear Everything',
      action: 'debug_confirm_clear_all'
    }
  ]
};

const debugResetUser: StoryContent = {
  title: 'Confirm: Reset User Data?',
  content: `
<strong style="color: #dc2626;">⚠️ Warning: Partial Reset</strong>

This will clear:
- Your reader name (you'll be prompted to re-enter it)
- Story progress and navigation history
- Conversation history

This will preserve:
- Dark mode preference

The page will reload after resetting.

Are you sure you want to proceed?
  `.trim(),
  choices: [
    {
      text: '❌ Cancel (Go Back)',
      action: 'debug'
    },
    {
      text: '✓ Yes, Reset User Data',
      action: 'debug_confirm_reset_user'
    }
  ]
};

/**
 * Export all dev tools content
 */
export const devToolsContent = {
  debug: debugPage,
  debug_clear_all: debugClearAll,
  debug_reset_user: debugResetUser
};
