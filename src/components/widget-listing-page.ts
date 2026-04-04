import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { WidgetListingItem, WidgetListingSection } from '../core/types.js';
import { CATEGORY_LABELS, formatUseCaseLabel } from './catalogue-constants.js';
import type { SortOption, FilterToolbarChangeDetail } from './widget-filter-toolbar.js';
import { widgetAtlasThemeStyles } from './shared-styles.js';

import './widget-category-section.js';
import './widget-filter-toolbar.js';
import './widget-page-layout.js';

type GroupByMode = 'none' | 'useCase' | 'category';

@customElement('widget-listing-page')
export class WidgetListingPage extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    css`
      :host {
        display: block;
      }

      .toolbar-stack {
        display: flex;
        flex-direction: column;
        gap: var(--_widget-atlas-space-md);
      }

      .empty-state {
        padding: var(--_widget-atlas-space-2xl);
        text-align: center;
        border: 1px dashed var(--_widget-atlas-border-strong);
        border-radius: var(--_widget-atlas-radius-md);
        color: var(--_widget-atlas-text-muted);
      }
    `,
  ];

  @property({ type: String }) eyebrow = '';
  @property({ type: String }) heading = '';
  @property({ type: String }) description = '';
  @property({ attribute: false }) widgets: WidgetListingItem[] = [];
  @property({ attribute: false }) sections: WidgetListingSection[] | null = null;
  @property({ attribute: false }) groupBy:
    | GroupByMode
    | ((widgets: WidgetListingItem[]) => WidgetListingSection[]) = 'none';
  @property({ attribute: false }) getWidgetUrl: (widget: WidgetListingItem) => string = (widget) =>
    widget.href ?? `#/${widget.tag}`;
  @property({ type: String }) emptyMessage = 'No matching components found.';
  @property({ type: String, attribute: 'filter-placeholder' }) filterPlaceholder = 'Filter components...';
  @property({ type: Boolean, attribute: 'reserve-header-aside' }) reserveHeaderAside = false;
  @property({ attribute: false }) sortOptions: SortOption[] = [
    { value: 'name-asc', label: 'Name A → Z' },
    { value: 'name-desc', label: 'Name Z → A' },
  ];
  @property({ type: String, attribute: 'default-sort' }) defaultSort = 'name-asc';
  @property({ type: Boolean, attribute: 'enable-search' }) enableSearch = true;

  @property({ type: String }) query = '';
  @property({ type: String }) sort = '';

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.sort) {
      this.sort = this.defaultSort;
    }
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has('defaultSort') && !this.sort) {
      this.sort = this.defaultSort;
    }
  }

  private onFilterChange(event: CustomEvent<FilterToolbarChangeDetail>): void {
    this.query = event.detail.query;
    this.sort = event.detail.sort;
  }

  private matchesQuery(widget: WidgetListingItem): boolean {
    if (!this.query.trim()) {
      return true;
    }

    const query = this.query.trim().toLowerCase();
    return [
      widget.name,
      widget.tag,
      widget.tagLabel ?? '',
      widget.description,
      widget.shortDescription ?? '',
      widget.metaLabel ?? '',
    ]
      .join(' ')
      .toLowerCase()
      .includes(query);
  }

  private sortWidgets(widgets: WidgetListingItem[]): WidgetListingItem[] {
    const sorted = [...widgets];

    switch (this.sort || this.defaultSort) {
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'category-asc':
        return sorted.sort(
          (a, b) =>
            (a.category ?? '').localeCompare(b.category ?? '') || a.name.localeCompare(b.name)
        );
      case 'category-desc':
        return sorted.sort(
          (a, b) =>
            (b.category ?? '').localeCompare(a.category ?? '') || a.name.localeCompare(b.name)
        );
      case 'name-asc':
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  private buildSections(): WidgetListingSection[] {
    if (this.sections !== null) {
      return this.sections;
    }

    if (typeof this.groupBy === 'function') {
      return this.groupBy(this.widgets);
    }

    if (this.groupBy === 'useCase') {
      const groups = new Map<string, WidgetListingItem[]>();
      this.widgets.forEach((widget) => {
        const groupId = widget.useCase ?? 'other';
        const existing = groups.get(groupId) ?? [];
        existing.push(widget);
        groups.set(groupId, existing);
      });
      return Array.from(groups.entries()).map(([id, widgets]) => ({
        id,
        heading: formatUseCaseLabel(id),
        widgets,
      }));
    }

    if (this.groupBy === 'category') {
      const groups = new Map<string, WidgetListingItem[]>();
      this.widgets.forEach((widget) => {
        const groupId = widget.category ?? 'other';
        const existing = groups.get(groupId) ?? [];
        existing.push(widget);
        groups.set(groupId, existing);
      });
      return Array.from(groups.entries()).map(([id, widgets]) => ({
        id,
        heading: CATEGORY_LABELS[id as keyof typeof CATEGORY_LABELS],
        widgets,
      }));
    }

    return this.widgets.length ? [{ id: 'components', heading: 'Components', widgets: this.widgets }] : [];
  }

  private get visibleSections(): WidgetListingSection[] {
    return this.buildSections()
      .map((section) => ({
        ...section,
        widgets: this.sortWidgets(section.widgets.filter((widget) => this.matchesQuery(widget))),
      }))
      .filter((section) => section.widgets.length > 0);
  }

  private renderSections() {
    if (!this.visibleSections.length) {
      return html`
        <slot name="empty-state">
          <div class="empty-state">${this.emptyMessage}</div>
        </slot>
      `;
    }

    return this.visibleSections.map(
      (section) => html`
        <widget-category-section
          heading=${section.heading}
          description=${section.description ?? ''}
          .widgets=${section.widgets}
          .getWidgetUrl=${this.getWidgetUrl}
        ></widget-category-section>
      `
    );
  }

  private hasSlotContent(name: string): boolean {
    return this.querySelector(`[slot="${name}"]`) !== null;
  }

  render() {
    const hasToolbar = this.enableSearch || this.sortOptions.length > 0;
    const hasEyebrow = this.hasSlotContent('eyebrow') || Boolean(this.eyebrow);
    const hasDescription = this.hasSlotContent('description') || Boolean(this.description);
    const hasHeaderAside = this.hasSlotContent('header-aside');
    const showHeaderAside = hasHeaderAside || this.reserveHeaderAside;

    return html`
      <widget-page-layout .forceHeaderAside=${showHeaderAside}>
        ${hasEyebrow
          ? html`<span slot="eyebrow"><slot name="eyebrow">${this.eyebrow}</slot></span>`
          : nothing}
        <span slot="heading"><slot name="heading">${this.heading}</slot></span>
        ${hasDescription
          ? html`<p slot="description"><slot name="description">${this.description}</slot></p>`
          : nothing}

        ${showHeaderAside
          ? html`
              <div slot="header-aside">
                ${hasHeaderAside ? html`<slot name="header-aside"></slot>` : nothing}
              </div>
            `
          : nothing}

        ${hasToolbar
          ? html`
              <div class="toolbar-stack" slot="toolbar">
                <widget-filter-toolbar
                  placeholder=${this.filterPlaceholder}
                  .sorts=${this.sortOptions}
                  .sort=${this.sort || this.defaultSort}
                  @filter-toolbar-change=${this.onFilterChange}
                ></widget-filter-toolbar>
                <slot name="toolbar-extra"></slot>
              </div>
            `
          : nothing}

        <div class="sections">${this.renderSections()}</div>
      </widget-page-layout>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-listing-page': WidgetListingPage;
  }
}
