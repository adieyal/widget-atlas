var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { widgetAtlasThemeStyles } from './shared-styles.js';
import './widget-card.js';
let WidgetCategorySection = class WidgetCategorySection extends LitElement {
    constructor() {
        super(...arguments);
        this.heading = '';
        this.description = '';
        this.widgets = [];
        this.getWidgetUrl = (widget) => `#/${widget.tag}`;
    }
    render() {
        if (!this.widgets.length) {
            return nothing;
        }
        return html `
      <section class="section">
        <div class="header">
          <div class="accent" aria-hidden="true"></div>
          <div class="title-wrap">
            <h2>${this.heading}</h2>
            ${this.description ? html `<p>${this.description}</p>` : nothing}
          </div>
          <span class="count">${this.widgets.length}</span>
        </div>
        <div class="grid">
          ${this.widgets.map((widget) => html `
              <widget-card
                .name=${widget.name}
                .tag=${widget.tag}
                .description=${widget.shortDescription ?? widget.description}
                .status=${widget.status}
                .level=${widget.level}
                .href=${this.getWidgetUrl(widget)}
              ></widget-card>
            `)}
        </div>
      </section>
    `;
    }
};
WidgetCategorySection.styles = [
    widgetAtlasThemeStyles,
    css `
      :host {
        display: block;
      }

      .section {
        margin-bottom: var(--_widget-atlas-space-2xl);
      }

      .header {
        display: flex;
        align-items: flex-start;
        gap: var(--_widget-atlas-space-md);
        margin-bottom: var(--_widget-atlas-space-lg);
      }

      .accent {
        width: 0.4rem;
        min-height: 2.25rem;
        border-radius: 999px;
        background: var(--_widget-atlas-category-accent-bg);
      }

      .title-wrap {
        flex: 1;
      }

      h2 {
        margin: 0;
        font-size: 1.35rem;
        line-height: 1.2;
      }

      p {
        margin: var(--_widget-atlas-space-2xs) 0 0;
        color: var(--_widget-atlas-text-muted);
      }

      .count {
        flex-shrink: 0;
        min-width: 2rem;
        height: 2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.5rem;
        border-radius: 999px;
        border: 1px solid var(--_widget-atlas-category-count-border);
        background: var(--_widget-atlas-category-count-bg);
        color: var(--_widget-atlas-category-count-text);
        font-size: 0.8rem;
        font-weight: 700;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
        gap: var(--_widget-atlas-space-lg);
      }
    `,
];
__decorate([
    property()
], WidgetCategorySection.prototype, "heading", void 0);
__decorate([
    property()
], WidgetCategorySection.prototype, "description", void 0);
__decorate([
    property({ attribute: false })
], WidgetCategorySection.prototype, "widgets", void 0);
__decorate([
    property({ attribute: false })
], WidgetCategorySection.prototype, "getWidgetUrl", void 0);
WidgetCategorySection = __decorate([
    customElement('widget-category-section')
], WidgetCategorySection);
export { WidgetCategorySection };
