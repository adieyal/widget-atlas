import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { catalogue } from '../core/catalogue.js';
import type { Category, SearchOptions, Status, UseCase, WidgetMetadata } from '../core/types.js';
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  STATUS_LABELS,
  STATUS_ORDER,
  USE_CASE_LABELS,
  USE_CASE_ORDER,
} from './catalogue-constants.js';
import { widgetAtlasControlStyles, widgetAtlasThemeStyles } from './shared-styles.js';

export interface WidgetSearchResultsDetail {
  results: WidgetMetadata[];
  query: string;
  filters: SearchOptions;
}

@customElement('widget-search')
export class WidgetSearch extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    widgetAtlasControlStyles,
    css`
      :host {
        display: block;
      }

      .toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: var(--widget-atlas-space-md);
        align-items: end;
        padding: var(--widget-atlas-space-md);
        border: 1px solid var(--widget-atlas-border);
        border-radius: var(--widget-atlas-radius-md);
        background:
          radial-gradient(circle at top right, rgb(29 122 82 / 0.08), transparent 28%),
          var(--widget-atlas-surface);
        box-shadow: var(--widget-atlas-shadow-sm);
      }

      .search-field {
        flex: 1 1 18rem;
      }

      .search-label,
      .filter-label {
        display: block;
        margin-bottom: var(--widget-atlas-space-2xs);
        color: var(--widget-atlas-text-muted);
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
        gap: var(--widget-atlas-space-sm);
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

  @property({ type: String }) query = '';
  @property({ type: String, attribute: 'use-case' }) useCase: UseCase | '' = '';
  @property({ type: String }) category: Category | '' = '';
  @property({ type: String }) status: Status | '' = '';
  @property({ type: Number, attribute: 'debounce-delay' }) debounceDelay = 250;
  @property({ type: Boolean, attribute: 'show-use-case-filter' }) showUseCaseFilter = true;
  @property({ type: Boolean, attribute: 'show-category-filter' }) showCategoryFilter = true;
  @property({ type: Boolean, attribute: 'show-status-filter' }) showStatusFilter = true;
  @property({ type: String }) placeholder = 'Search components...';

  @state() private results: WidgetMetadata[] = [];
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.performSearch();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  private performSearch(): void {
    const filters: SearchOptions = {};
    if (this.useCase) filters.useCase = this.useCase;
    if (this.category) filters.category = this.category;
    if (this.status) filters.status = this.status;

    this.results = catalogue.search(this.query, filters);

    this.dispatchEvent(
      new CustomEvent<WidgetSearchResultsDetail>('widget-search-results', {
        detail: {
          results: this.results,
          query: this.query,
          filters,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onQueryInput(event: Event): void {
    this.query = (event.target as HTMLInputElement).value;
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => this.performSearch(), this.debounceDelay);
  }

  private onUseCaseChange(event: Event): void {
    this.useCase = ((event.target as HTMLSelectElement).value || '') as UseCase | '';
    this.performSearch();
  }

  private onCategoryChange(event: Event): void {
    this.category = ((event.target as HTMLSelectElement).value || '') as Category | '';
    this.performSearch();
  }

  private onStatusChange(event: Event): void {
    this.status = ((event.target as HTMLSelectElement).value || '') as Status | '';
    this.performSearch();
  }

  render() {
    return html`
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
            ? html`
                <label class="filter-field">
                  <span class="filter-label">Use Case</span>
                  <select
                    class="control-select filter-select"
                    name="use-case"
                    .value=${this.useCase}
                    @change=${this.onUseCaseChange}
                  >
                    <option value="">All use cases</option>
                    ${USE_CASE_ORDER.map(
                      (useCase) =>
                        html`<option value=${useCase}>${USE_CASE_LABELS[useCase]}</option>`
                    )}
                  </select>
                </label>
              `
            : nothing}
          ${this.showCategoryFilter
            ? html`
                <label class="filter-field">
                  <span class="filter-label">Category</span>
                  <select
                    class="control-select filter-select"
                    name="category"
                    .value=${this.category}
                    @change=${this.onCategoryChange}
                  >
                    <option value="">All categories</option>
                    ${CATEGORY_ORDER.map(
                      (category) =>
                        html`<option value=${category}>${CATEGORY_LABELS[category]}</option>`
                    )}
                  </select>
                </label>
              `
            : nothing}
          ${this.showStatusFilter
            ? html`
                <label class="filter-field">
                  <span class="filter-label">Status</span>
                  <select
                    class="control-select filter-select"
                    name="status"
                    .value=${this.status}
                    @change=${this.onStatusChange}
                  >
                    <option value="">All statuses</option>
                    ${STATUS_ORDER.map(
                      (status) =>
                        html`<option value=${status}>${STATUS_LABELS[status]}</option>`
                    )}
                  </select>
                </label>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-search': WidgetSearch;
  }
}
