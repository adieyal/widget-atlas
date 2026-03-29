import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { widgetAtlasControlStyles, widgetAtlasThemeStyles } from './shared-styles.js';

@customElement('widget-code-block')
export class WidgetCodeBlock extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    widgetAtlasControlStyles,
    css`
      :host {
        display: block;
      }

      .code-container {
        overflow: hidden;
        border-radius: var(--widget-atlas-radius-md);
        background: var(--widget-atlas-code-bg);
        color: var(--widget-atlas-code-text);
        box-shadow: var(--widget-atlas-shadow-sm);
      }

      .code-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--widget-atlas-space-sm);
        padding: var(--widget-atlas-space-sm) var(--widget-atlas-space-md);
        border-bottom: 1px solid rgb(255 255 255 / 0.08);
        background: rgb(255 255 255 / 0.04);
      }

      .language-badge {
        color: var(--widget-atlas-code-muted);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .copy-button {
        border-color: rgb(255 255 255 / 0.14);
        background: transparent;
        color: var(--widget-atlas-code-text);
      }

      .copy-button:hover {
        background: rgb(255 255 255 / 0.08);
      }

      .copy-button.is-copied {
        border-color: color-mix(in srgb, var(--widget-atlas-success) 55%, white);
        color: var(--widget-atlas-success-soft);
      }

      pre {
        margin: 0;
        padding: var(--widget-atlas-space-md);
        overflow: auto;
      }

      code {
        display: block;
        font-family: var(
          --widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.82rem;
        line-height: 1.65;
        white-space: pre;
      }

      .code-container.is-collapsed pre {
        max-height: 11rem;
        position: relative;
      }

      .code-container.is-collapsed pre::after {
        content: '';
        position: absolute;
        inset: auto 0 0;
        height: 3rem;
        background: linear-gradient(transparent, var(--widget-atlas-code-bg));
        pointer-events: none;
      }

      .expand-button {
        width: 100%;
        border: none;
        border-top: 1px solid rgb(255 255 255 / 0.08);
        background: rgb(255 255 255 / 0.04);
        color: var(--widget-atlas-code-muted);
        padding: var(--widget-atlas-space-sm) var(--widget-atlas-space-md);
      }
    `,
  ];

  @property({ type: String }) code = '';
  @property({ type: String }) language = 'html';
  @property({ type: Boolean }) collapsible = true;
  @property({ type: Number, attribute: 'collapse-threshold' }) collapseThreshold = 10;

  @state() private copied = false;
  @state() private collapsed = true;
  private copiedTimer: ReturnType<typeof setTimeout> | null = null;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.copiedTimer) {
      clearTimeout(this.copiedTimer);
    }
  }

  private get shouldCollapse(): boolean {
    return this.collapsible && this.code.split('\n').length > this.collapseThreshold;
  }

  private async copyCode(): Promise<void> {
    if (!navigator.clipboard?.writeText) {
      return;
    }

    await navigator.clipboard.writeText(this.code);
    this.copied = true;

    if (this.copiedTimer) {
      clearTimeout(this.copiedTimer);
    }

    this.copiedTimer = setTimeout(() => {
      this.copied = false;
    }, 1800);
  }

  private toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  render() {
    const isCollapsed = this.shouldCollapse && this.collapsed;

    return html`
      <div class="code-container ${isCollapsed ? 'is-collapsed' : ''}">
        <div class="code-header">
          <span class="language-badge">${this.language}</span>
          <button
            class="control-button copy-button ${this.copied ? 'is-copied' : ''}"
            @click=${this.copyCode}
            type="button"
          >
            ${this.copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre><code>${this.code}</code></pre>
        ${this.shouldCollapse
          ? html`
              <button class="control-button expand-button" @click=${this.toggleCollapsed} type="button">
                ${this.collapsed ? 'Show more' : 'Show less'}
              </button>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-code-block': WidgetCodeBlock;
  }
}
