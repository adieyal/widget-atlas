import { LitElement, css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { catalogue } from '../core/catalogue.js';
import { buildWidgetUrl } from '../core/url-strategy.js';
import type { WidgetListingItem, WidgetListingSection } from '../core/types.js';
import { formatUseCaseLabel } from './catalogue-constants.js';
import { widgetAtlasControlStyles, widgetAtlasThemeStyles } from './shared-styles.js';

import './widget-listing-page.js';

@customElement('widget-catalogue-page')
export class WidgetCataloguePage extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    widgetAtlasControlStyles,
    css`
      :host {
        display: block;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: var(--_widget-atlas-stats-grid-columns);
        gap: var(--_widget-atlas-space-sm);
      }

      .stat-card {
        display: flex;
        flex-direction: var(--_widget-atlas-stat-card-direction);
        align-items: var(--_widget-atlas-stat-card-align);
        justify-content: var(--_widget-atlas-stat-card-justify);
        gap: var(--_widget-atlas-stat-card-gap);
        padding: var(--_widget-atlas-stat-card-padding);
        border-radius: var(--_widget-atlas-stat-card-radius);
        border: 1px solid var(--_widget-atlas-stat-card-border);
        background: var(--_widget-atlas-stat-card-bg);
        box-shadow: var(--_widget-atlas-stat-card-shadow);
        text-align: var(--_widget-atlas-stat-card-text-align);
      }

      .stat-label {
        display: block;
        margin-bottom: var(--_widget-atlas-space-xs);
        color: var(--_widget-atlas-text-soft);
        font-size: 0.74rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .stat-value {
        font-size: clamp(1.4rem, 2vw, 2rem);
        font-weight: 800;
        line-height: 1;
      }

      .stat-value--stable { color: var(--_widget-atlas-success); }
      .stat-value--beta   { color: var(--_widget-atlas-accent-strong); }
      .stat-value--new    { color: var(--_widget-atlas-info); }

      @media (max-width: 640px) {
        .stats-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    `,
  ];

  private get stats() { return catalogue.getStats(); }
  private get groupedWidgets() { return catalogue.getGroupedByUseCase(); }
  private get availableUseCases() { return catalogue.getUseCases(); }

  private get sections(): WidgetListingSection[] {
    return this.availableUseCases.flatMap((useCase) => {
      const widgets = this.groupedWidgets.get(useCase);
      if (!widgets?.length) {
        return [];
      }

      return [
        {
          id: useCase,
          heading: formatUseCaseLabel(useCase),
          widgets,
        },
      ];
    });
  }

  private renderStats() {
    const stats = this.stats;
    return html`
      <div class="stats-grid">
        <article class="stat-card">
          <span class="stat-label">Total</span>
          <span class="stat-value">${stats.total}</span>
        </article>
        <article class="stat-card">
          <span class="stat-label">Stable</span>
          <span class="stat-value stat-value--stable">${stats.byStatus.stable ?? 0}</span>
        </article>
        <article class="stat-card">
          <span class="stat-label">Beta</span>
          <span class="stat-value stat-value--beta">${stats.byStatus.beta ?? 0}</span>
        </article>
        <article class="stat-card">
          <span class="stat-label">New</span>
          <span class="stat-value stat-value--new">${stats.byStatus.new ?? 0}</span>
        </article>
      </div>
    `;
  }

  render() {
    return html`
      <widget-listing-page
        heading="Browse the full component catalogue."
        description="Explore reusable widgets by use case, inspect status and maturity, and jump into hands-on examples and API details."
        filter-placeholder="Filter components..."
        .eyebrow=${'Widget Atlas'}
        .sections=${this.sections}
        .getWidgetUrl=${(widget: WidgetListingItem) =>
          buildWidgetUrl({ category: widget.category ?? 'atoms', tag: widget.tag })}
        .sortOptions=${[
          { value: 'name-asc', label: 'Name A → Z' },
          { value: 'name-desc', label: 'Name Z → A' },
          { value: 'category-asc', label: 'Category A → Z' },
          { value: 'category-desc', label: 'Category Z → A' },
        ]}
        default-sort="name-asc"
      >
        ${this.sections.length
          ? html`<div slot="header-aside">${this.renderStats()}</div>`
          : nothing}
      </widget-listing-page>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-catalogue-page': WidgetCataloguePage;
  }
}
