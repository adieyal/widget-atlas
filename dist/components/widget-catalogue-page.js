var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { catalogue } from '../core/catalogue.js';
import { buildWidgetUrl } from '../core/url-strategy.js';
import { formatUseCaseLabel } from './catalogue-constants.js';
import { widgetAtlasControlStyles, widgetAtlasThemeStyles } from './shared-styles.js';
import './widget-card.js';
import './widget-category-section.js';
import './widget-search.js';
let WidgetCataloguePage = class WidgetCataloguePage extends LitElement {
    constructor() {
        super(...arguments);
        this.searchQuery = '';
        this.searchResults = null;
        this.isSearching = false;
    }
    get stats() {
        return catalogue.getStats();
    }
    get groupedWidgets() {
        return catalogue.getGroupedByUseCase();
    }
    get availableUseCases() {
        return catalogue.getUseCases();
    }
    handleSearch(event) {
        this.searchQuery = event.detail.query;
        this.searchResults = event.detail.results;
        this.isSearching = Boolean(event.detail.query ||
            event.detail.filters.useCase ||
            event.detail.filters.category ||
            event.detail.filters.status);
    }
    clearSearch() {
        this.searchQuery = '';
        this.searchResults = null;
        this.isSearching = false;
        const search = this.shadowRoot?.querySelector('widget-search');
        if (search) {
            search.query = '';
            search.useCase = '';
            search.category = '';
            search.status = '';
        }
    }
    renderCard(widget) {
        return html `
      <widget-card
        .name=${widget.name}
        .tag=${widget.tag}
        .description=${widget.shortDescription ?? widget.description}
        .status=${widget.status}
        .level=${widget.level}
        .href=${buildWidgetUrl({ category: widget.category, tag: widget.tag })}
      ></widget-card>
    `;
    }
    renderStats() {
        const stats = this.stats;
        return html `
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
    renderSearchResults() {
        if (!this.searchResults?.length) {
            return html `
        <div class="empty-state">
          <h2>No matching widgets</h2>
          <p>Try a different keyword or broaden one of the filters.</p>
        </div>
      `;
        }
        return html `
      <section>
        <div class="results-header">
          <h2>Search Results (${this.searchResults.length})</h2>
          <button class="link-button" @click=${this.clearSearch} type="button">Clear search</button>
        </div>
        <div class="results-grid">${this.searchResults.map((widget) => this.renderCard(widget))}</div>
      </section>
    `;
    }
    renderCategories() {
        return html `
      ${this.availableUseCases.map((useCase) => {
            const widgets = this.groupedWidgets.get(useCase);
            if (!widgets?.length)
                return nothing;
            return html `
          <widget-category-section
            heading=${formatUseCaseLabel(useCase)}
            .widgets=${widgets}
            .getWidgetUrl=${(widget) => buildWidgetUrl({ category: widget.category, tag: widget.tag })}
          ></widget-category-section>
        `;
        })}
    `;
    }
    render() {
        return html `
      <div class="catalogue-container">
        <header class="catalogue-header">
          <div class="hero">
            <div>
              <span class="eyebrow">Widget Atlas</span>
              <h1>Browse the full component catalogue.</h1>
              <p class="subtitle">
                Explore reusable widgets by use case, inspect status and maturity, and jump into
                hands-on examples and API details.
              </p>
            </div>
            ${this.renderStats()}
          </div>
        </header>

        <section class="search-section">
          <widget-search @widget-search-results=${this.handleSearch}></widget-search>
        </section>

        ${this.isSearching ? this.renderSearchResults() : this.renderCategories()}
      </div>
    `;
    }
};
WidgetCataloguePage.styles = [
    widgetAtlasThemeStyles,
    widgetAtlasControlStyles,
    css `
      :host {
        display: block;
        min-height: 100vh;
        background: var(--_widget-atlas-page-bg);
      }

      .catalogue-container {
        max-width: var(--_widget-atlas-layout-max);
        margin: 0 auto;
        padding: var(--_widget-atlas-space-2xl) var(--_widget-atlas-space-lg);
      }

      .catalogue-header {
        margin-bottom: var(--_widget-atlas-space-2xl);
      }

      .hero {
        display: grid;
        grid-template-columns: var(--_widget-atlas-hero-columns);
        gap: var(--_widget-atlas-hero-gap);
        align-items: end;
        margin-bottom: var(--_widget-atlas-space-xl);
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.32rem 0.7rem;
        border-radius: 999px;
        background: var(--_widget-atlas-accent-soft);
        color: var(--_widget-atlas-accent-strong);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      h1 {
        margin: var(--_widget-atlas-space-sm) 0 var(--_widget-atlas-space-sm);
        font-family: var(--_widget-atlas-title-font-family);
        font-size: var(--_widget-atlas-title-size);
        line-height: var(--_widget-atlas-title-line-height);
        letter-spacing: var(--_widget-atlas-title-letter-spacing);
        color: var(--_widget-atlas-title-color);
      }

      .subtitle {
        max-width: 38rem;
        margin: 0;
        color: var(--_widget-atlas-subtitle-color);
        font-size: var(--_widget-atlas-subtitle-size);
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

      .stat-value--stable {
        color: var(--_widget-atlas-success);
      }

      .stat-value--beta {
        color: var(--_widget-atlas-accent-strong);
      }

      .stat-value--new {
        color: var(--_widget-atlas-info);
      }

      .search-section {
        margin-bottom: var(--_widget-atlas-space-2xl);
      }

      .results-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--_widget-atlas-space-sm);
        margin-bottom: var(--_widget-atlas-space-lg);
      }

      .results-header h2,
      .empty-state h2 {
        margin: 0;
        font-size: 1.35rem;
      }

      .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
        gap: var(--_widget-atlas-space-lg);
      }

      .empty-state {
        padding: var(--_widget-atlas-space-2xl);
        text-align: center;
        border: 1px dashed var(--_widget-atlas-border-strong);
        border-radius: var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-surface);
      }

      .empty-state p {
        margin: var(--_widget-atlas-space-xs) auto 0;
        max-width: 28rem;
        color: var(--_widget-atlas-text-muted);
      }

      @media (max-width: 900px) {
        .hero {
          grid-template-columns: 1fr;
        }

        .stats-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 640px) {
        .catalogue-container {
          padding-inline: var(--_widget-atlas-space-md);
        }

        .stats-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
];
__decorate([
    state()
], WidgetCataloguePage.prototype, "searchQuery", void 0);
__decorate([
    state()
], WidgetCataloguePage.prototype, "searchResults", void 0);
__decorate([
    state()
], WidgetCataloguePage.prototype, "isSearching", void 0);
WidgetCataloguePage = __decorate([
    customElement('widget-catalogue-page')
], WidgetCataloguePage);
export { WidgetCataloguePage };
