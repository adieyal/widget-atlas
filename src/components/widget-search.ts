import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { catalogue } from '../core/catalogue.js';
import type { WidgetMetadata, Category, Status, SearchOptions, UseCase } from '../core/types.js';

export interface WidgetSearchResultsDetail {
  results: WidgetMetadata[];
  query: string;
  filters: SearchOptions;
}

@customElement('widget-search')
export class WidgetSearch extends LitElement {
  static styles = css`
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

  @property({ type: String }) query = '';
  @property({ type: String, attribute: 'use-case' }) useCase: UseCase | '' = '';
  @property({ type: String }) category: Category | '' = '';
  @property({ type: String }) status: Status | '' = '';
  @property({ type: Number, attribute: 'debounce-delay' }) debounceDelay = 250;
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
            ? html`
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
            ? html`
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
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-search': WidgetSearch;
  }
}
