import { css } from 'lit';
export const widgetAtlasThemeStyles = css `
  :host {
    --_widget-atlas-font-body: var(
      --widget-atlas-font-body,
      'Source Sans 3',
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      sans-serif
    );
    --_widget-atlas-font-display: var(
      --widget-atlas-font-display,
      'Fraunces',
      'DM Serif Display',
      Georgia,
      serif
    );
    --_widget-atlas-font-mono: var(
      --widget-atlas-font-mono,
      'JetBrains Mono',
      'SFMono-Regular',
      ui-monospace,
      monospace
    );
    --_widget-atlas-surface: var(--widget-atlas-surface, #ffffff);
    --_widget-atlas-surface-muted: var(--widget-atlas-surface-muted, #f4f7f1);
    --_widget-atlas-surface-strong: var(--widget-atlas-surface-strong, #e9efe5);
    --_widget-atlas-surface-inverse: var(--widget-atlas-surface-inverse, #142117);
    --_widget-atlas-text: var(--widget-atlas-text, #172218);
    --_widget-atlas-text-muted: var(--widget-atlas-text-muted, #526255);
    --_widget-atlas-text-soft: var(--widget-atlas-text-soft, #6a796c);
    --_widget-atlas-text-inverse: var(--widget-atlas-text-inverse, #f8fbf7);
    --_widget-atlas-border: var(--widget-atlas-border, #d5ddd3);
    --_widget-atlas-border-strong: var(--widget-atlas-border-strong, #a9b6ac);
    --_widget-atlas-accent: var(--widget-atlas-accent, #1d7a52);
    --_widget-atlas-accent-strong: var(--widget-atlas-accent-strong, #0f5d3a);
    --_widget-atlas-accent-soft: var(--widget-atlas-accent-soft, #e0f2e8);
    --_widget-atlas-warning: var(--widget-atlas-warning, #b96d12);
    --_widget-atlas-warning-soft: var(--widget-atlas-warning-soft, #fff2df);
    --_widget-atlas-danger: var(--widget-atlas-danger, #b14032);
    --_widget-atlas-danger-soft: var(--widget-atlas-danger-soft, #fce9e6);
    --_widget-atlas-success: var(--widget-atlas-success, #147a4b);
    --_widget-atlas-success-soft: var(--widget-atlas-success-soft, #dff5e8);
    --_widget-atlas-info: var(--widget-atlas-info, #1965a8);
    --_widget-atlas-info-soft: var(--widget-atlas-info-soft, #e1effc);
    --_widget-atlas-shadow-sm: var(--widget-atlas-shadow-sm, 0 1px 2px rgb(13 24 16 / 0.08));
    --_widget-atlas-shadow-md: var(
      --widget-atlas-shadow-md,
      0 16px 40px rgb(12 28 18 / 0.08)
    );
    --_widget-atlas-radius-sm: var(--widget-atlas-radius-sm, 0.5rem);
    --_widget-atlas-radius-md: var(--widget-atlas-radius-md, 0.9rem);
    --_widget-atlas-radius-lg: var(--widget-atlas-radius-lg, 1.25rem);
    --_widget-atlas-space-2xs: var(--widget-atlas-space-2xs, 0.25rem);
    --_widget-atlas-space-xs: var(--widget-atlas-space-xs, 0.5rem);
    --_widget-atlas-space-sm: var(--widget-atlas-space-sm, 0.75rem);
    --_widget-atlas-space-md: var(--widget-atlas-space-md, 1rem);
    --_widget-atlas-space-lg: var(--widget-atlas-space-lg, 1.5rem);
    --_widget-atlas-space-xl: var(--widget-atlas-space-xl, 2rem);
    --_widget-atlas-space-2xl: var(--widget-atlas-space-2xl, 3rem);
    --_widget-atlas-focus-ring: var(--widget-atlas-focus-ring, 0 0 0 3px rgb(var(--_widget-atlas-tint) / 0.18));
    --_widget-atlas-code-bg: var(--widget-atlas-code-bg, #122118);
    --_widget-atlas-code-text: var(--widget-atlas-code-text, #eef6ef);
    --_widget-atlas-code-muted: var(--widget-atlas-code-muted, #aac7ad);
    --_widget-atlas-tint: var(--widget-atlas-tint, 29 122 82);
    --_widget-atlas-tint-dark: var(--widget-atlas-tint-dark, 23 34 24);
    --_widget-atlas-surface-end: var(--widget-atlas-surface-end, #f8fbf7);
    --_widget-atlas-layout-max: var(--widget-atlas-layout-max, 1200px);
    --_widget-atlas-hero-columns: var(
      --widget-atlas-hero-columns,
      minmax(0, 1.5fr) minmax(18rem, 1fr)
    );
    --_widget-atlas-hero-gap: var(--widget-atlas-hero-gap, var(--_widget-atlas-space-xl));
    --_widget-atlas-title-font-family: var(
      --widget-atlas-title-font-family,
      var(--_widget-atlas-font-display)
    );
    --_widget-atlas-title-size: var(--widget-atlas-title-size, clamp(2.2rem, 4vw, 3.4rem));
    --_widget-atlas-title-line-height: var(--widget-atlas-title-line-height, 0.98);
    --_widget-atlas-title-letter-spacing: var(--widget-atlas-title-letter-spacing, -0.04em);
    --_widget-atlas-title-color: var(--widget-atlas-title-color, var(--_widget-atlas-text));
    --_widget-atlas-subtitle-color: var(
      --widget-atlas-subtitle-color,
      var(--_widget-atlas-text-muted)
    );
    --_widget-atlas-subtitle-size: var(--widget-atlas-subtitle-size, 1.05rem);
    --_widget-atlas-page-bg: var(
      --widget-atlas-page-bg,
      radial-gradient(circle at top right, rgb(var(--_widget-atlas-tint) / 0.06), transparent 32%),
      linear-gradient(180deg, var(--_widget-atlas-surface-muted), var(--_widget-atlas-surface-end) 18rem)
    );
    --_widget-atlas-search-toolbar-bg: var(
      --widget-atlas-search-toolbar-bg,
      radial-gradient(circle at top right, rgb(var(--_widget-atlas-tint) / 0.08), transparent 28%),
      var(--_widget-atlas-surface)
    );
    --_widget-atlas-search-toolbar-shadow: var(
      --widget-atlas-search-toolbar-shadow,
      var(--_widget-atlas-shadow-sm)
    );
    --_widget-atlas-search-label-display: var(--widget-atlas-search-label-display, block);
    --_widget-atlas-stats-grid-columns: var(
      --widget-atlas-stats-grid-columns,
      repeat(4, minmax(0, 1fr))
    );
    --_widget-atlas-stat-card-direction: var(--widget-atlas-stat-card-direction, column);
    --_widget-atlas-stat-card-align: var(--widget-atlas-stat-card-align, center);
    --_widget-atlas-stat-card-justify: var(--widget-atlas-stat-card-justify, center);
    --_widget-atlas-stat-card-gap: var(--widget-atlas-stat-card-gap, 0);
    --_widget-atlas-stat-card-padding: var(--widget-atlas-stat-card-padding, var(--_widget-atlas-space-md));
    --_widget-atlas-stat-card-radius: var(
      --widget-atlas-stat-card-radius,
      var(--_widget-atlas-radius-md)
    );
    --_widget-atlas-stat-card-text-align: var(--widget-atlas-stat-card-text-align, center);
    --_widget-atlas-stat-card-bg: var(--widget-atlas-stat-card-bg, var(--_widget-atlas-surface));
    --_widget-atlas-stat-card-border: var(--widget-atlas-stat-card-border, var(--_widget-atlas-border));
    --_widget-atlas-stat-card-shadow: var(--widget-atlas-stat-card-shadow, var(--_widget-atlas-shadow-sm));
    --_widget-atlas-card-bg: var(
      --widget-atlas-card-bg,
      radial-gradient(circle at top right, rgb(var(--_widget-atlas-tint) / 0.08), transparent 35%),
      var(--_widget-atlas-surface)
    );
    --_widget-atlas-card-accent-bg: var(
      --widget-atlas-card-accent-bg,
      linear-gradient(
        180deg,
        var(--_widget-atlas-accent),
        color-mix(in srgb, var(--_widget-atlas-accent) 40%, white)
      )
    );
    --_widget-atlas-card-tag-bg: var(--widget-atlas-card-tag-bg, var(--_widget-atlas-surface-muted));
    --_widget-atlas-card-tag-border: var(--widget-atlas-card-tag-border, var(--_widget-atlas-border));
    --_widget-atlas-card-tag-text: var(--widget-atlas-card-tag-text, var(--_widget-atlas-text-soft));
    --_widget-atlas-category-accent-bg: var(
      --widget-atlas-category-accent-bg,
      linear-gradient(
        180deg,
        var(--_widget-atlas-accent),
        color-mix(in srgb, var(--_widget-atlas-accent) 36%, white)
      )
    );
    --_widget-atlas-category-count-bg: var(--widget-atlas-category-count-bg, var(--_widget-atlas-surface));
    --_widget-atlas-category-count-border: var(
      --widget-atlas-category-count-border,
      var(--_widget-atlas-border)
    );
    --_widget-atlas-category-count-text: var(
      --widget-atlas-category-count-text,
      var(--_widget-atlas-text-muted)
    );
    color: var(--_widget-atlas-text);
    font-family: var(--_widget-atlas-font-body);
    line-height: 1.5;
  }
`;
export const widgetAtlasControlStyles = css `
  .control-input,
  .control-select,
  .control-button,
  .link-button {
    font: inherit;
  }

  .control-input,
  .control-select {
    min-height: 2.75rem;
    border: 1px solid var(--_widget-atlas-border);
    border-radius: var(--_widget-atlas-radius-sm);
    background: var(--_widget-atlas-surface);
    color: var(--_widget-atlas-text);
    padding: 0.7rem 0.85rem;
    box-sizing: border-box;
  }

  .control-input:focus,
  .control-select:focus,
  .control-button:focus,
  .link-button:focus {
    outline: none;
    box-shadow: var(--_widget-atlas-focus-ring);
    border-color: var(--_widget-atlas-accent);
  }

  .control-button,
  .link-button {
    border-radius: var(--_widget-atlas-radius-sm);
    cursor: pointer;
    transition:
      transform 160ms ease,
      border-color 160ms ease,
      background 160ms ease,
      color 160ms ease,
      box-shadow 160ms ease;
  }

  .control-button {
    min-height: 2.5rem;
    border: 1px solid var(--_widget-atlas-border);
    background: var(--_widget-atlas-surface);
    color: var(--_widget-atlas-text);
    padding: 0.55rem 0.9rem;
  }

  .control-button:hover {
    border-color: var(--_widget-atlas-border-strong);
    background: var(--_widget-atlas-surface-muted);
  }

  .link-button {
    border: none;
    background: transparent;
    color: var(--_widget-atlas-accent-strong);
    padding: 0;
  }

  .link-button:hover {
    color: var(--_widget-atlas-accent);
  }
`;
