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
import './widget-search.js';
const USE_CASE_LABELS = {
    'design-system': 'Design System',
    buttons: 'Buttons & Links',
    cards: 'Cards',
    forms: 'Forms & Input',
    feedback: 'Feedback & Status',
    navigation: 'Navigation & Progress',
    'data-display': 'Data Display',
    charts: 'Charts & Visualizations',
    layout: 'Layout',
    modals: 'Modals & Dialogs',
    onboarding: 'Onboarding',
    icons: 'Icons',
    integrations: 'Integrations',
};
const USE_CASE_ORDER = [
    'design-system',
    'buttons',
    'cards',
    'forms',
    'feedback',
    'navigation',
    'data-display',
    'charts',
    'layout',
    'modals',
    'onboarding',
    'icons',
    'integrations',
];
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
            event.detail.filters.category ||
            event.detail.filters.status ||
            event.detail.filters.useCase);
    }
    clearSearch() {
        this.searchQuery = '';
        this.searchResults = null;
        this.isSearching = false;
        const search = this.shadowRoot?.querySelector('widget-search');
        if (search) {
            search.query = '';
            search.category = '';
            search.status = '';
        }
    }
    renderCard(widget) {
        return html `
      <a class="widget-card" href=${buildWidgetUrl({ category: widget.category, tag: widget.tag })}>
        <div><strong>${widget.name}</strong></div>
        <div class="widget-tag">&lt;${widget.tag}&gt;</div>
        <p class="widget-description">${widget.description}</p>
      </a>
    `;
    }
    renderSearchResults() {
        if (!this.searchResults?.length) {
            return html `<div>No results found.</div>`;
        }
        return html `
      <div class="category-section">
        <div class="results-header">
          <h2>Search Results (${this.searchResults.length})</h2>
          <button class="clear-search" @click=${this.clearSearch} type="button">Clear search</button>
        </div>
        <div class="widgets-grid">${this.searchResults.map((widget) => this.renderCard(widget))}</div>
      </div>
    `;
    }
    renderCategories() {
        return html `
      ${USE_CASE_ORDER.map((useCase) => {
            const widgets = this.groupedWidgets.get(useCase);
            if (!widgets?.length)
                return nothing;
            return html `
          <section class="category-section">
            <div class="category-header">
              <h2>${USE_CASE_LABELS[useCase]}</h2>
              <span class="category-count">${widgets.length}</span>
            </div>
            <div class="widgets-grid">${widgets.map((widget) => this.renderCard(widget))}</div>
          </section>
        `;
        })}
    `;
    }
    render() {
        return html `
      <div class="catalogue-container">
        <h1>Widget Library</h1>
        <p>${this.stats.total} components</p>
        <widget-search @widget-search-results=${this.handleSearch}></widget-search>
        ${this.isSearching ? this.renderSearchResults() : this.renderCategories()}
      </div>
    `;
    }
};
WidgetCataloguePage.styles = css `
    :host {
      display: block;
      color: var(--widget-atlas-text, var(--color-text, #162018));
      font-family: var(--widget-atlas-font-body, var(--font-body, "Source Sans 3", system-ui, sans-serif));
      line-height: 1.5;
    }

    .catalogue-container {
      max-width: var(--widget-atlas-layout-max, 1200px);
      margin: 0 auto;
      padding: var(--widget-atlas-space-lg, var(--space-lg, 1rem));
    }

    .widgets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
    }

    .widget-card {
      display: block;
      border: 1px solid var(--widget-atlas-border, var(--color-border, #d7ddd5));
      border-radius: var(--widget-atlas-radius-md, var(--radius-md, 0.625rem));
      padding: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
      color: inherit;
      text-decoration: none;
      background: var(--widget-atlas-surface, var(--color-surface, #fff));
    }

    .widget-card:hover {
      border-color: var(--widget-atlas-border-strong, var(--color-border, #d7ddd5));
    }

    .category-section {
      margin-top: var(--widget-atlas-space-xl, var(--space-xl, 1.5rem));
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
      margin-bottom: var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
    }

    .category-count {
      color: var(--widget-atlas-text-secondary, var(--color-text-secondary, #4d5d52));
      font-size: 12px;
      border: 1px solid var(--widget-atlas-border, var(--color-border, #d7ddd5));
      border-radius: 999px;
      padding: 2px var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
    }

    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: var(--widget-atlas-space-lg, var(--space-lg, 1rem)) 0;
    }

    .clear-search {
      border: none;
      background: transparent;
      color: var(--widget-atlas-link, var(--color-primary, #0a5c36));
      cursor: pointer;
    }

    .widget-tag {
      font-family: var(--widget-atlas-font-mono, var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace));
      font-size: 12px;
      color: var(--widget-atlas-text-secondary, var(--color-text-secondary, #4d5d52));
    }

    .widget-description {
      color: var(--widget-atlas-text-secondary, var(--color-text-secondary, #4d5d52));
      font-size: 13px;
      margin: var(--widget-atlas-space-sm, var(--space-sm, 0.5rem)) 0;
    }

    h1 {
      margin: 0;
      font-family: var(
        --widget-atlas-font-display,
        var(--font-display, "DM Serif Display", Georgia, serif)
      );
      font-size: clamp(1.6rem, 3vw, 2.1rem);
    }

    h2 {
      margin: 0;
      font-size: 1.25rem;
    }
  `;
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
