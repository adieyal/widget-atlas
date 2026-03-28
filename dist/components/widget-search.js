var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { catalogue } from '../core/catalogue.js';
let WidgetSearch = class WidgetSearch extends LitElement {
    constructor() {
        super(...arguments);
        this.query = '';
        this.useCase = '';
        this.category = '';
        this.status = '';
        this.debounceDelay = 250;
        this.showCategoryFilter = true;
        this.showStatusFilter = true;
        this.placeholder = 'Search components...';
        this.results = [];
        this.debounceTimer = null;
    }
    connectedCallback() {
        super.connectedCallback();
        this.performSearch();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
    }
    performSearch() {
        const filters = {};
        if (this.useCase)
            filters.useCase = this.useCase;
        if (this.category)
            filters.category = this.category;
        if (this.status)
            filters.status = this.status;
        this.results = catalogue.search(this.query, filters);
        this.dispatchEvent(new CustomEvent('widget-search-results', {
            detail: {
                results: this.results,
                query: this.query,
                filters,
            },
            bubbles: true,
            composed: true,
        }));
    }
    onQueryInput(event) {
        this.query = event.target.value;
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout(() => this.performSearch(), this.debounceDelay);
    }
    onCategoryChange(event) {
        this.category = (event.target.value || '');
        this.performSearch();
    }
    onStatusChange(event) {
        this.status = (event.target.value || '');
        this.performSearch();
    }
    render() {
        return html `
      <div class="search-container">
        <input
          class="search-input"
          type="search"
          placeholder=${this.placeholder}
          .value=${this.query}
          @input=${this.onQueryInput}
        />

        <div class="filters">
          ${this.showCategoryFilter
            ? html `
                <select class="filter-select" .value=${this.category} @change=${this.onCategoryChange}>
                  <option value="">All categories</option>
                  <option value="atoms">Atoms</option>
                  <option value="molecules">Molecules</option>
                  <option value="organisms">Organisms</option>
                  <option value="charts">Charts</option>
                  <option value="features">Features</option>
                  <option value="integrations">Integrations</option>
                </select>
              `
            : nothing}
          ${this.showStatusFilter
            ? html `
                <select class="filter-select" .value=${this.status} @change=${this.onStatusChange}>
                  <option value="">All statuses</option>
                  <option value="stable">Stable</option>
                  <option value="new">New</option>
                  <option value="alpha">Alpha</option>
                  <option value="deprecated">Deprecated</option>
                  <option value="legacy">Legacy</option>
                </select>
              `
            : nothing}
        </div>
      </div>
    `;
    }
};
WidgetSearch.styles = css `
    :host {
      display: block;
    }

    .search-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: end;
    }

    .search-input,
    .filter-select {
      border: 1px solid #d0d5dd;
      border-radius: 6px;
      padding: 8px 10px;
      font: inherit;
      font-size: 14px;
      background: #fff;
      color: #101828;
    }

    .search-input {
      min-width: 220px;
      flex: 1;
    }

    .filters {
      display: flex;
      gap: 8px;
    }
  `;
__decorate([
    property({ type: String })
], WidgetSearch.prototype, "query", void 0);
__decorate([
    property({ type: String, attribute: 'use-case' })
], WidgetSearch.prototype, "useCase", void 0);
__decorate([
    property({ type: String })
], WidgetSearch.prototype, "category", void 0);
__decorate([
    property({ type: String })
], WidgetSearch.prototype, "status", void 0);
__decorate([
    property({ type: Number, attribute: 'debounce-delay' })
], WidgetSearch.prototype, "debounceDelay", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-category-filter' })
], WidgetSearch.prototype, "showCategoryFilter", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-status-filter' })
], WidgetSearch.prototype, "showStatusFilter", void 0);
__decorate([
    property({ type: String })
], WidgetSearch.prototype, "placeholder", void 0);
__decorate([
    state()
], WidgetSearch.prototype, "results", void 0);
WidgetSearch = __decorate([
    customElement('widget-search')
], WidgetSearch);
export { WidgetSearch };
