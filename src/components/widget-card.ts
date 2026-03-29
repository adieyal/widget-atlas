import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Level, Status } from '../core/types.js';
import { statusTone, titleCase } from './catalogue-constants.js';
import { widgetAtlasThemeStyles } from './shared-styles.js';

@customElement('widget-card')
export class WidgetCard extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    css`
      :host {
        display: block;
      }

      .card {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
        padding: var(--widget-atlas-space-lg);
        border: 1px solid var(--widget-atlas-border);
        border-radius: var(--widget-atlas-radius-md);
        background:
          radial-gradient(circle at top right, rgb(29 122 82 / 0.08), transparent 35%),
          var(--widget-atlas-surface);
        color: inherit;
        text-decoration: none;
        box-shadow: var(--widget-atlas-shadow-sm);
        transition:
          transform 180ms ease,
          border-color 180ms ease,
          box-shadow 180ms ease;
      }

      .card:hover {
        transform: translateY(-2px);
        border-color: var(--widget-atlas-border-strong);
        box-shadow: var(--widget-atlas-shadow-md);
      }

      .card::before {
        content: '';
        position: absolute;
        inset: 0 auto 0 0;
        width: 4px;
        border-radius: var(--widget-atlas-radius-md) 0 0 var(--widget-atlas-radius-md);
        background: linear-gradient(
          180deg,
          var(--widget-atlas-accent),
          color-mix(in srgb, var(--widget-atlas-accent) 40%, white)
        );
        opacity: 0;
        transition: opacity 180ms ease;
      }

      .card:hover::before {
        opacity: 1;
      }

      .header {
        display: flex;
        justify-content: space-between;
        gap: var(--widget-atlas-space-sm);
        align-items: flex-start;
        margin-bottom: var(--widget-atlas-space-sm);
      }

      .name {
        font-weight: 700;
        font-size: 1rem;
        color: var(--widget-atlas-text);
      }

      .tag {
        flex-shrink: 0;
        padding: 0.22rem 0.5rem;
        border-radius: 999px;
        background: var(--widget-atlas-surface-muted);
        border: 1px solid var(--widget-atlas-border);
        color: var(--widget-atlas-text-soft);
        font-family: var(
          --widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.73rem;
      }

      .description {
        margin: 0 0 var(--widget-atlas-space-lg);
        color: var(--widget-atlas-text-muted);
        font-size: 0.95rem;
        line-height: 1.6;
        flex: 1;
      }

      .meta {
        display: flex;
        gap: var(--widget-atlas-space-xs);
        flex-wrap: wrap;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        min-height: 1.75rem;
        padding: 0 0.65rem;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        border: 1px solid transparent;
      }

      .chip::before {
        content: '';
        width: 0.42rem;
        height: 0.42rem;
        border-radius: 50%;
        background: currentColor;
      }

      .chip--level {
        color: var(--widget-atlas-text-soft);
        background: var(--widget-atlas-surface-muted);
        border-color: var(--widget-atlas-border);
      }

      .chip--level::before {
        display: none;
      }

      .chip--success {
        color: var(--widget-atlas-success);
        background: var(--widget-atlas-success-soft);
      }

      .chip--brand {
        color: var(--widget-atlas-accent-strong);
        background: var(--widget-atlas-accent-soft);
      }

      .chip--accent {
        color: var(--widget-atlas-info);
        background: var(--widget-atlas-info-soft);
      }

      .chip--warning {
        color: var(--widget-atlas-warning);
        background: var(--widget-atlas-warning-soft);
      }

      .chip--danger {
        color: var(--widget-atlas-danger);
        background: var(--widget-atlas-danger-soft);
      }

      .chip--muted {
        color: var(--widget-atlas-text-muted);
        background: var(--widget-atlas-surface-muted);
      }
    `,
  ];

  @property() name = '';
  @property() tag = '';
  @property() description = '';
  @property() href = '';
  @property() status?: Status;
  @property() level?: Level;

  render() {
    return html`
      <a class="card" href=${this.href}>
        <div class="header">
          <span class="name">${this.name}</span>
          <span class="tag">&lt;${this.tag}&gt;</span>
        </div>
        <p class="description">${this.description}</p>
        <div class="meta">
          ${this.status
            ? html`<span class="chip chip--${statusTone(this.status)}">${this.status}</span>`
            : nothing}
          ${this.level
            ? html`<span class="chip chip--level">${titleCase(this.level)}</span>`
            : nothing}
        </div>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-card': WidgetCard;
  }
}
