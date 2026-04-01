var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { catalogue } from '../core/catalogue.js';
import { CATEGORY_LABELS, CATEGORY_ORDER, STATUS_LABELS, STATUS_ORDER, formatUseCaseLabel, } from './catalogue-constants.js';
import { widgetAtlasControlStyles, widgetAtlasThemeStyles } from './shared-styles.js';
let WidgetSearch = class WidgetSearch extends LitElement {
    constructor() {
        super(...arguments);
        this.query = '';
        this.useCase = '';
        this.category = '';
        this.status = '';
        this.debounceDelay = 250;
        this.showUseCaseFilter = true;
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
    onUseCaseChange(event) {
        this.useCase = (event.target.value || '');
        this.performSearch();
    }
    onCategoryChange(event) {
        this.category = (event.target.value || '');
        this.performSearch();
    }
    onStatusChange(event) {
        this.status = (event.target.value || '');
        this.performSearch();
    }
    get availableUseCases() {
        return catalogue.getUseCases();
    }
    render() {
        return html `
      <div class="toolbar">
        <label class="search-field">
          <span class="search-label">Search</span>
          <input
            class="control-input search-input"
            type="search"
            placeholder=${this.placeholder}
            .value=${this.query}
            @input=${this.onQueryInput}
          />
        </label>
        <div class="filters">
          ${this.showUseCaseFilter
            ? html `
                <label class="filter-field">
                  <span class="filter-label">Use Case</span>
                  <select
                    class="control-select filter-select"
                    name="use-case"
                    .value=${this.useCase}
                    @change=${this.onUseCaseChange}
                  >
                    <option value="">All use cases</option>
                    ${this.availableUseCases.map((useCase) => html `<option value=${useCase}>${formatUseCaseLabel(useCase)}</option>`)}
                  </select>
                </label>
              `
            : nothing}
          ${this.showCategoryFilter
            ? html `
                <label class="filter-field">
                  <span class="filter-label">Category</span>
                  <select
                    class="control-select filter-select"
                    name="category"
                    .value=${this.category}
                    @change=${this.onCategoryChange}
                  >
                    <option value="">All categories</option>
                    ${CATEGORY_ORDER.map((category) => html `<option value=${category}>${CATEGORY_LABELS[category]}</option>`)}
                  </select>
                </label>
              `
            : nothing}
          ${this.showStatusFilter
            ? html `
                <label class="filter-field">
                  <span class="filter-label">Status</span>
                  <select
                    class="control-select filter-select"
                    name="status"
                    .value=${this.status}
                    @change=${this.onStatusChange}
                  >
                    <option value="">All statuses</option>
                    ${STATUS_ORDER.map((status) => html `<option value=${status}>${STATUS_LABELS[status]}</option>`)}
                  </select>
                </label>
              `
            : nothing}
        </div>
      </div>
    `;
    }
};
WidgetSearch.styles = [
    widgetAtlasThemeStyles,
    widgetAtlasControlStyles,
    css `
      :host {
        display: block;
      }

      .toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: var(--_widget-atlas-space-md);
        align-items: end;
        padding: var(--_widget-atlas-space-md);
        border: 1px solid var(--_widget-atlas-border);
        border-radius: var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-search-toolbar-bg);
        box-shadow: var(--_widget-atlas-search-toolbar-shadow);
      }

      .search-field {
        flex: 1 1 18rem;
      }

      .search-label,
      .filter-label {
        display: var(--_widget-atlas-search-label-display);
        margin-bottom: var(--_widget-atlas-space-2xs);
        color: var(--_widget-atlas-text-muted);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      .search-input {
        width: 100%;
      }

      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: var(--_widget-atlas-space-sm);
      }

      .filter-field {
        min-width: 10rem;
      }

      .filter-select {
        width: 100%;
      }

      @media (max-width: 840px) {
        .filter-field {
          flex: 1 1 12rem;
        }
      }
    `,
];
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
    property({ type: Boolean, attribute: 'show-use-case-filter' })
], WidgetSearch.prototype, "showUseCaseFilter", void 0);
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
