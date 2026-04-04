import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { widgetAtlasControlStyles, widgetAtlasThemeStyles } from './shared-styles.js';

export interface SortOption {
  value: string;
  label: string;
}

export interface FilterToolbarChangeDetail {
  query: string;
  sort: string;
}

/**
 * Search input with an optional sort select.
 *
 * Fires `filter-toolbar-change` (bubbles, composed) whenever the query or sort
 * changes. The query is debounced; sort changes are immediate.
 *
 * Properties:
 *   placeholder     search input placeholder text
 *   sorts           array of { value, label } sort options; omit to hide sort
 *   sort            current sort value (controlled)
 *   debounce-delay  ms to debounce query input (default 250)
 *
 * Overridable tokens:
 *   --widget-atlas-filter-toolbar-bg      toolbar background
 *   --widget-atlas-filter-toolbar-shadow  toolbar box shadow
 */
@customElement('widget-filter-toolbar')
export class WidgetFilterToolbar extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    widgetAtlasControlStyles,
    css`
      :host {
        display: block;
        --_widget-atlas-filter-toolbar-bg: var(
          --widget-atlas-filter-toolbar-bg,
          var(--_widget-atlas-search-toolbar-bg)
        );
        --_widget-atlas-filter-toolbar-shadow: var(
          --widget-atlas-filter-toolbar-shadow,
          var(--_widget-atlas-search-toolbar-shadow)
        );
      }

      .toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: var(--_widget-atlas-space-md);
        align-items: end;
        padding: var(--_widget-atlas-space-md);
        border: 1px solid var(--_widget-atlas-border);
        border-radius: var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-filter-toolbar-bg);
        box-shadow: var(--_widget-atlas-filter-toolbar-shadow);
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: var(--_widget-atlas-space-2xs);
      }

      .search-field {
        flex: 1 1 18rem;
      }

      .sort-field {
        min-width: 14rem;
      }

      .field-label {
        color: var(--_widget-atlas-text-muted);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      .search-input {
        width: 100%;
      }

      .sort-select {
        width: 100%;
      }

      @media (max-width: 640px) {
        .sort-field {
          flex: 1 1 12rem;
        }
      }
    `,
  ];

  @property({ type: String }) placeholder = 'Search...';
  @property({ attribute: false }) sorts: SortOption[] = [];
  @property({ type: String }) sort = '';
  @property({ type: Number, attribute: 'debounce-delay' }) debounceDelay = 250;

  @state() private query = '';

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  private dispatch(): void {
    this.dispatchEvent(
      new CustomEvent<FilterToolbarChangeDetail>('filter-toolbar-change', {
        detail: { query: this.query, sort: this.sort },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onQueryInput(e: Event): void {
    this.query = (e.target as HTMLInputElement).value;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.dispatch(), this.debounceDelay);
  }

  private onSortChange(e: Event): void {
    this.sort = (e.target as HTMLSelectElement).value;
    this.dispatch();
  }

  render() {
    return html`
      <div class="toolbar">
        <label class="field search-field">
          <span class="field-label">Search</span>
          <input
            class="control-input search-input"
            type="search"
            placeholder=${this.placeholder}
            .value=${this.query}
            @input=${this.onQueryInput}
          />
        </label>
        ${this.sorts.length
          ? html`
              <label class="field sort-field">
                <span class="field-label">Sort</span>
                <select
                  class="control-select sort-select"
                  .value=${this.sort}
                  @change=${this.onSortChange}
                >
                  ${this.sorts.map(
                    (opt) => html`<option value=${opt.value}>${opt.label}</option>`
                  )}
                </select>
              </label>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-filter-toolbar': WidgetFilterToolbar;
  }
}
