import { css } from 'lit';
export const widgetAtlasThemeStyles = css `
  :host {
    color: var(--widget-atlas-text, #172218);
    font-family: var(
      --widget-atlas-font-body,
      'Source Sans 3',
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      sans-serif
    );
    line-height: 1.5;
    --widget-atlas-surface: var(--widget-atlas-surface, #ffffff);
    --widget-atlas-surface-muted: var(--widget-atlas-surface-muted, #f4f7f1);
    --widget-atlas-surface-strong: var(--widget-atlas-surface-strong, #e9efe5);
    --widget-atlas-surface-inverse: var(--widget-atlas-surface-inverse, #142117);
    --widget-atlas-text: var(--widget-atlas-text, #172218);
    --widget-atlas-text-muted: var(--widget-atlas-text-muted, #526255);
    --widget-atlas-text-soft: var(--widget-atlas-text-soft, #6a796c);
    --widget-atlas-text-inverse: var(--widget-atlas-text-inverse, #f8fbf7);
    --widget-atlas-border: var(--widget-atlas-border, #d5ddd3);
    --widget-atlas-border-strong: var(--widget-atlas-border-strong, #a9b6ac);
    --widget-atlas-accent: var(--widget-atlas-accent, #1d7a52);
    --widget-atlas-accent-strong: var(--widget-atlas-accent-strong, #0f5d3a);
    --widget-atlas-accent-soft: var(--widget-atlas-accent-soft, #e0f2e8);
    --widget-atlas-warning: var(--widget-atlas-warning, #b96d12);
    --widget-atlas-warning-soft: var(--widget-atlas-warning-soft, #fff2df);
    --widget-atlas-danger: var(--widget-atlas-danger, #b14032);
    --widget-atlas-danger-soft: var(--widget-atlas-danger-soft, #fce9e6);
    --widget-atlas-success: var(--widget-atlas-success, #147a4b);
    --widget-atlas-success-soft: var(--widget-atlas-success-soft, #dff5e8);
    --widget-atlas-info: var(--widget-atlas-info, #1965a8);
    --widget-atlas-info-soft: var(--widget-atlas-info-soft, #e1effc);
    --widget-atlas-shadow-sm: var(--widget-atlas-shadow-sm, 0 1px 2px rgb(13 24 16 / 0.08));
    --widget-atlas-shadow-md: var(
      --widget-atlas-shadow-md,
      0 16px 40px rgb(12 28 18 / 0.08)
    );
    --widget-atlas-radius-sm: var(--widget-atlas-radius-sm, 0.5rem);
    --widget-atlas-radius-md: var(--widget-atlas-radius-md, 0.9rem);
    --widget-atlas-radius-lg: var(--widget-atlas-radius-lg, 1.25rem);
    --widget-atlas-space-2xs: var(--widget-atlas-space-2xs, 0.25rem);
    --widget-atlas-space-xs: var(--widget-atlas-space-xs, 0.5rem);
    --widget-atlas-space-sm: var(--widget-atlas-space-sm, 0.75rem);
    --widget-atlas-space-md: var(--widget-atlas-space-md, 1rem);
    --widget-atlas-space-lg: var(--widget-atlas-space-lg, 1.5rem);
    --widget-atlas-space-xl: var(--widget-atlas-space-xl, 2rem);
    --widget-atlas-space-2xl: var(--widget-atlas-space-2xl, 3rem);
    --widget-atlas-focus-ring: var(--widget-atlas-focus-ring, 0 0 0 3px rgb(29 122 82 / 0.18));
    --widget-atlas-code-bg: var(--widget-atlas-code-bg, #122118);
    --widget-atlas-code-text: var(--widget-atlas-code-text, #eef6ef);
    --widget-atlas-code-muted: var(--widget-atlas-code-muted, #aac7ad);
    --widget-atlas-layout-max: var(--widget-atlas-layout-max, 1200px);
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
    border: 1px solid var(--widget-atlas-border);
    border-radius: var(--widget-atlas-radius-sm);
    background: var(--widget-atlas-surface);
    color: var(--widget-atlas-text);
    padding: 0.7rem 0.85rem;
    box-sizing: border-box;
  }

  .control-input:focus,
  .control-select:focus,
  .control-button:focus,
  .link-button:focus {
    outline: none;
    box-shadow: var(--widget-atlas-focus-ring);
    border-color: var(--widget-atlas-accent);
  }

  .control-button,
  .link-button {
    border-radius: var(--widget-atlas-radius-sm);
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
    border: 1px solid var(--widget-atlas-border);
    background: var(--widget-atlas-surface);
    color: var(--widget-atlas-text);
    padding: 0.55rem 0.9rem;
  }

  .control-button:hover {
    border-color: var(--widget-atlas-border-strong);
    background: var(--widget-atlas-surface-muted);
  }

  .link-button {
    border: none;
    background: transparent;
    color: var(--widget-atlas-accent-strong);
    padding: 0;
  }

  .link-button:hover {
    color: var(--widget-atlas-accent);
  }
`;
