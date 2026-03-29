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
import { USE_CASE_LABELS, USE_CASE_ORDER } from './catalogue-constants.js';
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
        .description=${widget.description}
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
      ${USE_CASE_ORDER.map((useCase) => {
            const widgets = this.groupedWidgets.get(useCase);
            if (!widgets?.length)
                return nothing;
            return html `
          <widget-category-section
            heading=${USE_CASE_LABELS[useCase]}
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
        background:
          radial-gradient(circle at top right, rgb(29 122 82 / 0.06), transparent 32%),
          linear-gradient(180deg, var(--widget-atlas-surface-muted), #f8fbf7 18rem);
      }

      .catalogue-container {
        max-width: var(--widget-atlas-layout-max);
        margin: 0 auto;
        padding: var(--widget-atlas-space-2xl) var(--widget-atlas-space-lg);
      }

      .catalogue-header {
        margin-bottom: var(--widget-atlas-space-2xl);
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1.5fr) minmax(18rem, 1fr);
        gap: var(--widget-atlas-space-xl);
        align-items: end;
        margin-bottom: var(--widget-atlas-space-xl);
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.32rem 0.7rem;
        border-radius: 999px;
        background: var(--widget-atlas-accent-soft);
        color: var(--widget-atlas-accent-strong);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      h1 {
        margin: var(--widget-atlas-space-sm) 0 var(--widget-atlas-space-sm);
        font-family: var(
          --widget-atlas-font-display,
          'Fraunces',
          'DM Serif Display',
          Georgia,
          serif
        );
        font-size: clamp(2.2rem, 4vw, 3.4rem);
        line-height: 0.98;
        letter-spacing: -0.04em;
      }

      .subtitle {
        max-width: 38rem;
        margin: 0;
        color: var(--widget-atlas-text-muted);
        font-size: 1.05rem;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--widget-atlas-space-sm);
      }

      .stat-card {
        padding: var(--widget-atlas-space-md);
        border-radius: var(--widget-atlas-radius-md);
        border: 1px solid var(--widget-atlas-border);
        background: var(--widget-atlas-surface);
        box-shadow: var(--widget-atlas-shadow-sm);
      }

      .stat-label {
        display: block;
        margin-bottom: var(--widget-atlas-space-xs);
        color: var(--widget-atlas-text-soft);
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
        color: var(--widget-atlas-success);
      }

      .stat-value--beta {
        color: var(--widget-atlas-accent-strong);
      }

      .stat-value--new {
        color: var(--widget-atlas-info);
      }

      .search-section {
        margin-bottom: var(--widget-atlas-space-2xl);
      }

      .results-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--widget-atlas-space-sm);
        margin-bottom: var(--widget-atlas-space-lg);
      }

      .results-header h2,
      .empty-state h2 {
        margin: 0;
        font-size: 1.35rem;
      }

      .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
        gap: var(--widget-atlas-space-lg);
      }

      .empty-state {
        padding: var(--widget-atlas-space-2xl);
        text-align: center;
        border: 1px dashed var(--widget-atlas-border-strong);
        border-radius: var(--widget-atlas-radius-md);
        background: var(--widget-atlas-surface);
      }

      .empty-state p {
        margin: var(--widget-atlas-space-xs) auto 0;
        max-width: 28rem;
        color: var(--widget-atlas-text-muted);
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
          padding-inline: var(--widget-atlas-space-md);
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
