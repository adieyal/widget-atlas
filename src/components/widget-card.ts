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
        padding: var(--_widget-atlas-space-lg);
        border: 1px solid var(--_widget-atlas-border);
        border-radius: var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-card-bg);
        color: inherit;
        text-decoration: none;
        box-shadow: var(--_widget-atlas-shadow-sm);
        transition:
          transform 180ms ease,
          border-color 180ms ease,
          box-shadow 180ms ease;
      }

      .card:hover {
        transform: translateY(-2px);
        border-color: var(--_widget-atlas-border-strong);
        box-shadow: var(--_widget-atlas-shadow-md);
      }

      .card::before {
        content: '';
        position: absolute;
        inset: 0 auto 0 0;
        width: 4px;
        border-radius: var(--_widget-atlas-radius-md) 0 0 var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-card-accent-bg);
        opacity: 0;
        transition: opacity 180ms ease;
      }

      .card:hover::before {
        opacity: 1;
      }

      .header {
        display: flex;
        flex-wrap: wrap;
        gap: var(--_widget-atlas-space-sm);
        align-items: flex-start;
        margin-bottom: var(--_widget-atlas-space-sm);
      }

      .name {
        flex: 1 1 auto;
        min-width: 0;
        font-weight: 700;
        font-size: 1rem;
        color: var(--_widget-atlas-text);
      }

      .tag {
        flex: 0 0 auto;
        margin-inline-start: auto;
        padding: 0.22rem 0.5rem;
        border-radius: 999px;
        background: var(--_widget-atlas-card-tag-bg);
        border: 1px solid var(--_widget-atlas-card-tag-border);
        color: var(--_widget-atlas-card-tag-text);
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.73rem;
      }

      .header[data-wrapped] .tag {
        flex-basis: 100%;
        margin-inline-start: 0;
      }

      .description {
        margin: 0 0 var(--_widget-atlas-space-lg);
        color: var(--_widget-atlas-text-muted);
        font-size: 0.95rem;
        line-height: 1.6;
        flex: 1;
      }

      .meta {
        display: flex;
        gap: var(--_widget-atlas-space-xs);
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
        color: var(--_widget-atlas-text-soft);
        background: var(--_widget-atlas-surface-muted);
        border-color: var(--_widget-atlas-border);
      }

      .chip--level::before {
        display: none;
      }

      .chip--success {
        color: var(--_widget-atlas-success);
        background: var(--_widget-atlas-success-soft);
      }

      .chip--brand {
        color: var(--_widget-atlas-accent-strong);
        background: var(--_widget-atlas-accent-soft);
      }

      .chip--accent {
        color: var(--_widget-atlas-info);
        background: var(--_widget-atlas-info-soft);
      }

      .chip--warning {
        color: var(--_widget-atlas-warning);
        background: var(--_widget-atlas-warning-soft);
      }

      .chip--danger {
        color: var(--_widget-atlas-danger);
        background: var(--_widget-atlas-danger-soft);
      }

      .chip--muted {
        color: var(--_widget-atlas-text-muted);
        background: var(--_widget-atlas-surface-muted);
      }
    `,
  ];

  @property() name = '';
  @property() tag = '';
  @property() description = '';
  @property() href = '';
  @property() status?: Status;
  @property() level?: Level;

  private resizeObserver?: ResizeObserver;

  private readonly handleWindowResize = () => {
    this.updateHeaderWrapState();
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.handleWindowResize);
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    window.removeEventListener('resize', this.handleWindowResize);
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.setupHeaderWrapObserver();
    this.updateHeaderWrapState();
  }

  updated() {
    this.updateHeaderWrapState();
  }

  private setupHeaderWrapObserver() {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver?.disconnect();

    const header = this.shadowRoot?.querySelector('.header');
    const name = this.shadowRoot?.querySelector('.name');
    const tag = this.shadowRoot?.querySelector('.tag');

    if (!header || !name || !tag) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.updateHeaderWrapState();
    });

    this.resizeObserver.observe(header);
    this.resizeObserver.observe(name);
    this.resizeObserver.observe(tag);
  }

  private updateHeaderWrapState() {
    const header = this.shadowRoot?.querySelector('.header');
    const name = this.shadowRoot?.querySelector('.name');
    const tag = this.shadowRoot?.querySelector('.tag');

    if (!header || !name || !tag) {
      return;
    }

    const isWrapped =
      Math.abs(tag.getBoundingClientRect().top - name.getBoundingClientRect().top) > 1;

    header.toggleAttribute('data-wrapped', isWrapped);
  }

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
