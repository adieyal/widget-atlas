import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { WidgetListingItem } from '../core/types.js';
import { widgetAtlasThemeStyles } from './shared-styles.js';

import './widget-card.js';

@customElement('widget-category-section')
export class WidgetCategorySection extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    css`
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

  @property() heading = '';
  @property() description = '';
  @property({ attribute: false }) widgets: WidgetListingItem[] = [];
  @property({ attribute: false }) getWidgetUrl: (widget: WidgetListingItem) => string =
    (widget) => widget.href ?? `#/${widget.tag}`;

  render() {
    if (!this.widgets.length) {
      return nothing;
    }

    return html`
      <section class="section">
        <div class="header">
          <div class="accent" aria-hidden="true"></div>
          <div class="title-wrap">
            <h2>${this.heading}</h2>
            ${this.description ? html`<p>${this.description}</p>` : nothing}
          </div>
          <span class="count">${this.widgets.length}</span>
        </div>
        <div class="grid">
          ${this.widgets.map(
            (widget) => html`
              <widget-card
                .name=${widget.name}
                .tag=${widget.tag}
                .description=${widget.shortDescription ?? widget.description}
                .status=${widget.status}
                .level=${widget.level}
                .tagLabel=${widget.tagLabel ?? widget.tag}
                .tagLabelMode=${widget.tagLabelMode ?? 'element'}
                .metaLabel=${widget.metaLabel ?? ''}
                .href=${this.getWidgetUrl(widget)}
              ></widget-card>
            `
          )}
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-category-section': WidgetCategorySection;
  }
}
