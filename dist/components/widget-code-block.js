var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { widgetAtlasControlStyles, widgetAtlasThemeStyles } from './shared-styles.js';
let WidgetCodeBlock = class WidgetCodeBlock extends LitElement {
    constructor() {
        super(...arguments);
        this.code = '';
        this.language = 'html';
        this.collapsible = true;
        this.collapseThreshold = 10;
        this.copied = false;
        this.collapsed = true;
        this.copiedTimer = null;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.copiedTimer) {
            clearTimeout(this.copiedTimer);
        }
    }
    get shouldCollapse() {
        return this.collapsible && this.code.split('\n').length > this.collapseThreshold;
    }
    async copyCode() {
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
    toggleCollapsed() {
        this.collapsed = !this.collapsed;
    }
    render() {
        const isCollapsed = this.shouldCollapse && this.collapsed;
        return html `
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
            ? html `
              <button class="control-button expand-button" @click=${this.toggleCollapsed} type="button">
                ${this.collapsed ? 'Show more' : 'Show less'}
              </button>
            `
            : nothing}
      </div>
    `;
    }
};
WidgetCodeBlock.styles = [
    widgetAtlasThemeStyles,
    widgetAtlasControlStyles,
    css `
      :host {
        display: block;
      }

      .code-container {
        overflow: hidden;
        border-radius: var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-code-bg);
        color: var(--_widget-atlas-code-text);
        box-shadow: var(--_widget-atlas-shadow-sm);
      }

      .code-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--_widget-atlas-space-sm);
        padding: var(--_widget-atlas-space-sm) var(--_widget-atlas-space-md);
        border-bottom: 1px solid rgb(255 255 255 / 0.08);
        background: rgb(255 255 255 / 0.04);
      }

      .language-badge {
        color: var(--_widget-atlas-code-muted);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .copy-button {
        border-color: rgb(255 255 255 / 0.14);
        background: transparent;
        color: var(--_widget-atlas-code-text);
      }

      .copy-button:hover {
        background: rgb(255 255 255 / 0.08);
      }

      .copy-button.is-copied {
        border-color: color-mix(in srgb, var(--_widget-atlas-success) 55%, white);
        color: var(--_widget-atlas-success-soft);
      }

      pre {
        margin: 0;
        padding: var(--_widget-atlas-space-md);
        overflow: auto;
      }

      code {
        display: block;
        font-family: var(
          --_widget-atlas-font-mono,
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
        background: linear-gradient(transparent, var(--_widget-atlas-code-bg));
        pointer-events: none;
      }

      .expand-button {
        width: 100%;
        border: none;
        border-top: 1px solid rgb(255 255 255 / 0.08);
        background: rgb(255 255 255 / 0.04);
        color: var(--_widget-atlas-code-muted);
        padding: var(--_widget-atlas-space-sm) var(--_widget-atlas-space-md);
      }
    `,
];
__decorate([
    property({ type: String })
], WidgetCodeBlock.prototype, "code", void 0);
__decorate([
    property({ type: String })
], WidgetCodeBlock.prototype, "language", void 0);
__decorate([
    property({ type: Boolean })
], WidgetCodeBlock.prototype, "collapsible", void 0);
__decorate([
    property({ type: Number, attribute: 'collapse-threshold' })
], WidgetCodeBlock.prototype, "collapseThreshold", void 0);
__decorate([
    state()
], WidgetCodeBlock.prototype, "copied", void 0);
__decorate([
    state()
], WidgetCodeBlock.prototype, "collapsed", void 0);
WidgetCodeBlock = __decorate([
    customElement('widget-code-block')
], WidgetCodeBlock);
export { WidgetCodeBlock };
