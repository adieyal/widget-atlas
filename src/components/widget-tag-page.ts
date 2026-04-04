import { LitElement, css, html, nothing, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property } from 'lit/decorators.js';
import { catalogue } from '../core/catalogue.js';
import { tagGroupRegistry } from '../core/tag-group-registry.js';
import { buildTagGroupUrl, buildTagUrl } from '../core/tag-url-strategy.js';
import { buildWidgetUrl } from '../core/url-strategy.js';
import type { WidgetListingItem, WidgetMetadata } from '../core/types.js';
import { widgetAtlasThemeStyles } from './shared-styles.js';

import './widget-category-section.js';
import './widget-detail-layout.js';
import './widget-events-table.js';
import './widget-props-table.js';

@customElement('widget-tag-page')
export class WidgetTagPage extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    css`
      :host {
        display: block;
      }

      /* Breadcrumb — slotted into widget-detail-layout */
      .breadcrumb {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--_widget-atlas-text-muted);
        font-size: 0.85rem;
      }

      .breadcrumb a {
        color: var(--_widget-atlas-accent-strong);
        text-decoration: none;
        font-weight: 600;
      }

      .breadcrumb a:hover { color: var(--_widget-atlas-accent); }

      .breadcrumb-sep { color: var(--_widget-atlas-border-strong); }

      /* Rich-text description — inner elements of the slotted div */
      .description p {
        margin: 0 0 var(--_widget-atlas-space-sm);
        color: var(--_widget-atlas-text-muted);
        font-size: 1.02rem;
      }

      .description p:last-child { margin-bottom: 0; }

      .description ul,
      .description ol {
        margin: 0 0 var(--_widget-atlas-space-sm);
        padding-left: 1.4em;
        color: var(--_widget-atlas-text-muted);
        font-size: 1.02rem;
      }

      .description li { margin-bottom: 0.25em; line-height: 1.5; }

      .description code {
        padding: 0.1em 0.35em;
        border-radius: 3px;
        background: var(--_widget-atlas-accent-soft);
        color: var(--_widget-atlas-accent-strong);
        font-size: 0.88em;
      }

      /* API contract section */
      .api-surface { margin-bottom: var(--_widget-atlas-space-2xl); }

      .api-surface h2 {
        margin: 0 0 var(--_widget-atlas-space-lg);
        font-size: 1.35rem;
      }

      .api-surface-block { margin-bottom: var(--_widget-atlas-space-xl); }

      .api-surface-block h3 {
        margin: 0 0 var(--_widget-atlas-space-sm);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--_widget-atlas-text-muted);
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

  @property({ type: String }) group = '';
  @property({ type: String }) tag = '';

  private get groupDef() { return this.group ? tagGroupRegistry.get(this.group) : undefined; }

  private get tagDef() {
    return this.group && this.tag ? tagGroupRegistry.getTag(this.group, this.tag) : undefined;
  }

  private get members(): WidgetMetadata[] {
    if (!this.group || !this.tag) return [];
    return catalogue.getByTag(this.group, this.tag);
  }

  private renderDescription(description: string): TemplateResult {
    const isHtml = /<[a-z][\s\S]*>/i.test(description);
    return isHtml
      ? html`<div class="description">${unsafeHTML(description)}</div>`
      : html`<div class="description"><p>${description}</p></div>`;
  }

  private renderApiSurface() {
    const api = this.tagDef?.apiSurface;
    if (!api) return nothing;
    const hasProps = api.properties?.length;
    const hasEvents = api.events?.length;
    if (!hasProps && !hasEvents) return nothing;

    return html`
      <section class="api-surface">
        <h2>API Contract</h2>
        ${hasProps
          ? html`
              <div class="api-surface-block">
                <h3>Properties</h3>
                <widget-props-table .properties=${api.properties!}></widget-props-table>
              </div>
            `
          : nothing}
        ${hasEvents
          ? html`
              <div class="api-surface-block">
                <h3>Events</h3>
                <widget-events-table .events=${api.events!}></widget-events-table>
              </div>
            `
          : nothing}
      </section>
    `;
  }

  render() {
    if (!this.group || !this.tag) {
      return html`
        <widget-detail-layout>
          <span slot="heading">Invalid tag page</span>
          <p slot="description">
            Both <code>group</code> and <code>tag</code> attributes are required.
          </p>
        </widget-detail-layout>
      `;
    }

    const groupDef = this.groupDef;
    const tagDef = this.tagDef;
    const members = this.members;
    const groupLabel = groupDef?.name ?? this.group;
    const tagLabel = tagDef?.name ?? this.tag;
    const groupUrl = buildTagGroupUrl(this.group);
    const tagUrl = buildTagUrl(this.group, this.tag);

    return html`
      <widget-detail-layout>
        <nav class="breadcrumb" slot="breadcrumb" aria-label="Breadcrumb">
          ${groupUrl
            ? html`<a href=${groupUrl}>${groupLabel}</a>`
            : html`<span>${groupLabel}</span>`}
          <span class="breadcrumb-sep" aria-hidden="true">›</span>
          ${tagUrl
            ? html`<a href=${tagUrl} aria-current="page">${tagLabel}</a>`
            : html`<span>${tagLabel}</span>`}
        </nav>

        <span slot="eyebrow">${groupLabel}</span>
        <span slot="heading">${tagLabel}</span>

        ${tagDef?.description
          ? html`<div slot="description">${this.renderDescription(tagDef.description)}</div>`
          : nothing}

        ${this.renderApiSurface()}

        ${members.length
          ? html`
              <widget-category-section
                heading="Components"
                .widgets=${members}
                .getWidgetUrl=${(w: WidgetListingItem) =>
                  buildWidgetUrl({ category: w.category ?? 'atoms', tag: w.tag })}
              ></widget-category-section>
            `
          : html`<div class="empty-state">No components registered for this tag yet.</div>`}
      </widget-detail-layout>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-tag-page': WidgetTagPage;
  }
}
