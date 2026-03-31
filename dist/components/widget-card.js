var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { statusTone, titleCase } from './catalogue-constants.js';
import { widgetAtlasThemeStyles } from './shared-styles.js';
let WidgetCard = class WidgetCard extends LitElement {
    constructor() {
        super(...arguments);
        this.name = '';
        this.tag = '';
        this.description = '';
        this.href = '';
    }
    render() {
        return html `
      <a class="card" href=${this.href}>
        <div class="header">
          <span class="name">${this.name}</span>
          <span class="tag">&lt;${this.tag}&gt;</span>
        </div>
        <p class="description">${this.description}</p>
        <div class="meta">
          ${this.status
            ? html `<span class="chip chip--${statusTone(this.status)}">${this.status}</span>`
            : nothing}
          ${this.level
            ? html `<span class="chip chip--level">${titleCase(this.level)}</span>`
            : nothing}
        </div>
      </a>
    `;
    }
};
WidgetCard.styles = [
    widgetAtlasThemeStyles,
    css `
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
        background:
          radial-gradient(circle at top right, rgb(var(--_widget-atlas-tint) / 0.08), transparent 35%),
          var(--_widget-atlas-surface);
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
        background: linear-gradient(
          180deg,
          var(--_widget-atlas-accent),
          color-mix(in srgb, var(--_widget-atlas-accent) 40%, white)
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
        gap: var(--_widget-atlas-space-sm);
        align-items: flex-start;
        margin-bottom: var(--_widget-atlas-space-sm);
      }

      .name {
        font-weight: 700;
        font-size: 1rem;
        color: var(--_widget-atlas-text);
      }

      .tag {
        flex-shrink: 0;
        padding: 0.22rem 0.5rem;
        border-radius: 999px;
        background: var(--_widget-atlas-surface-muted);
        border: 1px solid var(--_widget-atlas-border);
        color: var(--_widget-atlas-text-soft);
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.73rem;
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
__decorate([
    property()
], WidgetCard.prototype, "name", void 0);
__decorate([
    property()
], WidgetCard.prototype, "tag", void 0);
__decorate([
    property()
], WidgetCard.prototype, "description", void 0);
__decorate([
    property()
], WidgetCard.prototype, "href", void 0);
__decorate([
    property()
], WidgetCard.prototype, "status", void 0);
__decorate([
    property()
], WidgetCard.prototype, "level", void 0);
WidgetCard = __decorate([
    customElement('widget-card')
], WidgetCard);
export { WidgetCard };
