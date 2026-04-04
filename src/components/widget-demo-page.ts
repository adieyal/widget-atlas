import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { catalogue } from '../core/catalogue.js';
import { buildWidgetUrl } from '../core/url-strategy.js';
import { tagGroupRegistry } from '../core/tag-group-registry.js';
import { buildTagGroupUrl, buildTagUrl } from '../core/tag-url-strategy.js';
import type { ExampleConfig, WidgetMetadata } from '../core/types.js';
import { statusTone, titleCase } from './catalogue-constants.js';
import { widgetAtlasControlStyles, widgetAtlasThemeStyles } from './shared-styles.js';

import './widget-code-block.js';
import './widget-css-props-table.js';
import './widget-detail-layout.js';
import './widget-events-table.js';
import './widget-preview.js';
import './widget-props-table.js';
import './widget-slots-table.js';

@customElement('widget-demo-page')
export class WidgetDemoPage extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    widgetAtlasControlStyles,
    css`
      :host {
        display: block;
      }

      /* ── Back link (breadcrumb slot) ── */
      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--_widget-atlas-accent-strong);
        text-decoration: none;
        font-weight: 600;
      }

      .back-link:hover { color: var(--_widget-atlas-accent); }

      /* ── Heading row: title + inline status ── */
      .heading-row {
        display: flex;
        align-items: baseline;
        gap: var(--_widget-atlas-space-md);
        flex-wrap: wrap;
      }

      .heading-name {
        /* Inherits h1 font from detail-layout */
      }

      .status-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.2rem 0.65rem;
        border-radius: 999px;
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        /* Shift down slightly to align with baseline of large heading */
        position: relative;
        top: -0.15em;
      }

      .status-chip::before {
        content: '';
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background: currentColor;
      }

      .status-chip--success { background: var(--_widget-atlas-success-soft); color: var(--_widget-atlas-success); }
      .status-chip--brand   { background: var(--_widget-atlas-accent-soft);  color: var(--_widget-atlas-accent-strong); }
      .status-chip--accent  { background: var(--_widget-atlas-info-soft);    color: var(--_widget-atlas-info); }
      .status-chip--warning { background: var(--_widget-atlas-warning-soft); color: var(--_widget-atlas-warning); }
      .status-chip--danger  { background: var(--_widget-atlas-danger-soft);  color: var(--_widget-atlas-danger); }
      .status-chip--muted   { background: var(--_widget-atlas-surface-strong); color: var(--_widget-atlas-text-muted); }

      /* ── Header meta area ── */
      .header-meta-content {
        display: flex;
        flex-direction: column;
        gap: var(--_widget-atlas-space-md);
      }

      /* ── Meta strip: compact dot-separated classification line ── */
      .meta-strip {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.25rem 0;
        color: var(--_widget-atlas-text-soft);
        font-size: 0.85rem;
      }

      .meta-strip__item {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
      }

      .meta-strip__item + .meta-strip__item::before {
        content: '·';
        margin: 0 0.55rem;
        color: var(--_widget-atlas-border-strong);
        font-weight: 700;
      }

      .meta-strip__label {
        color: var(--_widget-atlas-text-soft);
      }

      .meta-strip__value {
        font-family: var(--_widget-atlas-font-mono);
        font-size: 0.82rem;
        color: var(--_widget-atlas-text);
      }

      /* ── Contracts band: unified container for all memberOf groups ── */
      .contracts-band {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--_widget-atlas-space-sm) var(--_widget-atlas-space-lg);
        padding: var(--_widget-atlas-space-sm) var(--_widget-atlas-space-md);
        border-radius: var(--_widget-atlas-radius-sm);
        background: var(--_widget-atlas-surface-muted);
        border: 1px solid var(--_widget-atlas-border);
      }

      .contract-group {
        display: flex;
        align-items: center;
        gap: var(--_widget-atlas-space-xs);
      }

      .contract-group__label {
        color: var(--_widget-atlas-text-soft);
        font-size: 0.74rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        white-space: nowrap;
      }

      .contract-group__label a { color: inherit; text-decoration: none; }
      .contract-group__label a:hover { color: var(--_widget-atlas-accent-strong); }

      .tag-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.3rem 0.7rem;
        border-radius: 999px;
        border: 1px solid var(--_widget-atlas-border);
        background: var(--_widget-atlas-surface);
        color: var(--_widget-atlas-accent-strong);
        font-size: 0.75rem;
        font-weight: 600;
        text-decoration: none;
        transition: border-color 150ms ease, background 150ms ease;
      }

      .tag-chip:hover {
        border-color: var(--_widget-atlas-accent);
        background: var(--_widget-atlas-accent-soft);
      }

      span.tag-chip { color: var(--_widget-atlas-text-soft); cursor: default; }
      span.tag-chip:hover { border-color: var(--_widget-atlas-border); background: var(--_widget-atlas-surface); }

      /* ── Sidebar nav (sidebar slot) ── */
      .sidebar__label {
        padding: 0 var(--_widget-atlas-space-lg);
        margin-bottom: var(--_widget-atlas-space-md);
        color: var(--_widget-atlas-text-soft);
        font-size: 0.74rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .sidebar__nav {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .sidebar__link {
        display: block;
        width: 100%;
        padding: 0.65rem var(--_widget-atlas-space-lg);
        border: none;
        border-left: 3px solid transparent;
        background: transparent;
        color: var(--_widget-atlas-text-muted);
        text-align: left;
        font: inherit;
        cursor: pointer;
      }

      .sidebar__link:hover {
        background: rgb(var(--_widget-atlas-tint-dark) / 0.04);
        color: var(--_widget-atlas-text);
      }

      .sidebar__link--active {
        color: var(--_widget-atlas-accent-strong);
        border-left-color: var(--_widget-atlas-accent);
        background: color-mix(in srgb, var(--_widget-atlas-accent) 9%, white);
      }

      /* ── Content sections (default slot) ── */
      .demo-section,
      .example-section {
        margin-bottom: var(--_widget-atlas-space-2xl);
      }

      .section-kicker {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        margin-bottom: var(--_widget-atlas-space-xs);
        color: var(--_widget-atlas-text-soft);
        font-size: 0.74rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .section-kicker::before {
        content: '';
        width: 1.4rem;
        height: 1px;
        background: var(--_widget-atlas-border-strong);
      }

      .section-heading { margin: 0; font-size: 1.6rem; }

      .section-description,
      .example-description {
        margin: var(--_widget-atlas-space-xs) 0 var(--_widget-atlas-space-lg);
        color: var(--_widget-atlas-text-muted);
      }

      .example-section h3 { margin: 0; font-size: 1.25rem; }
      .example-preview { margin-bottom: var(--_widget-atlas-space-md); }

      /* ── Usage guidelines ── */
      .guidelines-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--_widget-atlas-space-lg);
      }

      .guideline-card {
        padding: var(--_widget-atlas-space-lg);
        border-radius: var(--_widget-atlas-radius-md);
        border: 1px solid var(--_widget-atlas-border);
      }

      .guideline-card--do    { background: var(--_widget-atlas-success-soft); border-color: color-mix(in srgb, var(--_widget-atlas-success) 35%, white); }
      .guideline-card--dont  { background: var(--_widget-atlas-danger-soft);  border-color: color-mix(in srgb, var(--_widget-atlas-danger) 35%, white); }
      .guideline-card--notes { grid-column: 1 / -1; background: var(--_widget-atlas-info-soft); border-color: color-mix(in srgb, var(--_widget-atlas-info) 35%, white); }

      .guideline-card__header {
        display: flex;
        align-items: center;
        gap: var(--_widget-atlas-space-xs);
        margin-bottom: var(--_widget-atlas-space-sm);
      }

      .guideline-card__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        font-weight: 700;
      }

      .guideline-card--do    .guideline-card__icon { background: var(--_widget-atlas-success); color: white; }
      .guideline-card--dont  .guideline-card__icon { background: var(--_widget-atlas-danger);  color: white; }
      .guideline-card--notes .guideline-card__icon { background: var(--_widget-atlas-info);    color: white; }

      .guideline-card ul { margin: 0; padding-left: 1.15rem; }
      .guideline-card li + li { margin-top: 0.45rem; }

      /* ── API reference ── */
      .api-section + .api-section { margin-top: var(--_widget-atlas-space-lg); }
      .api-section h3 { margin: 0 0 var(--_widget-atlas-space-sm); font-size: 1.1rem; }

      /* ── Related components ── */
      .related-components {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: var(--_widget-atlas-space-md);
      }

      .related-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--_widget-atlas-space-sm);
        padding: var(--_widget-atlas-space-md);
        border-radius: var(--_widget-atlas-radius-md);
        border: 1px solid var(--_widget-atlas-border);
        background: var(--_widget-atlas-surface);
        color: inherit;
        text-decoration: none;
        box-shadow: var(--_widget-atlas-shadow-sm);
      }

      .related-link:hover { border-color: var(--_widget-atlas-border-strong); box-shadow: var(--_widget-atlas-shadow-md); }
      .related-name { display: block; font-weight: 700; }
      .related-tag  { display: block; margin-top: var(--_widget-atlas-space-2xs); color: var(--_widget-atlas-text-soft); font-family: var(--_widget-atlas-font-mono); font-size: 0.78rem; }
      .related-arrow { color: var(--_widget-atlas-accent); font-size: 1.1rem; }

      /* ── Responsive: sidebar nav becomes horizontal pill row ── */
      @media (max-width: 960px) {
        .sidebar__nav {
          display: flex;
          gap: var(--_widget-atlas-space-xs);
          overflow: auto;
          padding-bottom: var(--_widget-atlas-space-sm);
        }

        .sidebar__link {
          width: auto;
          border-left: none;
          border-bottom: 2px solid transparent;
          border-radius: 999px;
          white-space: nowrap;
        }

        .sidebar__link--active {
          border-left-color: transparent;
          border-bottom-color: var(--_widget-atlas-accent);
        }

        .guidelines-grid {
          grid-template-columns: 1fr;
        }

        .guideline-card--notes {
          grid-column: auto;
        }
      }
    `,
  ];

  @property({ type: String }) tag = '';
  @property({ type: String, attribute: 'catalogue-href' }) catalogueHref = '/widgets/';

  @state() private meta: WidgetMetadata | null = null;
  @state() private activeSectionId = '';

  private sectionObserver: IntersectionObserver | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.loadMeta();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.sectionObserver?.disconnect();
    this.sectionObserver = null;
  }

  updated(changedProps: Map<string, unknown>): void {
    if (changedProps.has('tag')) {
      this.loadMeta();
    }
    if (this.meta && changedProps.has('tag')) {
      queueMicrotask(() => this.setupScrollSpy());
    }
  }

  private loadMeta(): void {
    this.meta = this.tag ? catalogue.get(this.tag) || null : null;
    this.activeSectionId = this.meta?.examples[0]?.id ?? '';
  }

  private setupScrollSpy(): void {
    this.sectionObserver?.disconnect();
    this.sectionObserver = null;

    if (!('IntersectionObserver' in window)) return;

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          this.activeSectionId = visible[0].target.id;
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.2, 0.6] }
    );

    this.renderRoot.querySelectorAll('.demo-section[id], .example-section[id]').forEach((el) => {
      this.sectionObserver?.observe(el);
    });
  }

  private mountPropPreview(
    container: Element | undefined,
    tagName: string,
    props: Record<string, unknown>
  ): void {
    if (!(container instanceof HTMLElement)) return;
    const el = document.createElement(tagName) as HTMLElement & Record<string, unknown>;
    Object.entries(props).forEach(([k, v]) => { el[k] = v; });
    container.replaceChildren(el);
  }

  private renderPreview(example: ExampleConfig) {
    if (example.props && this.meta) {
      return html`
        <widget-preview class="example-preview" ?show-device-selector=${true} ?show-width-control=${true} use-slot>
          <div ${ref((c) => this.mountPropPreview(c, this.meta!.tag, example.props!))}></div>
        </widget-preview>
      `;
    }
    return html`
      <widget-preview
        class="example-preview"
        .code=${example.code}
        ?show-device-selector=${true}
        ?show-width-control=${true}
      ></widget-preview>
    `;
  }

  private renderExample(example: ExampleConfig) {
    const showPreview = example.showPreview ?? true;
    const showCode = example.showCode ?? true;
    return html`
      <article class="example-section" id=${example.id}>
        <span class="section-kicker">Example</span>
        <h3>${example.title}</h3>
        ${example.description ? html`<p class="example-description">${example.description}</p>` : nothing}
        ${showPreview ? this.renderPreview(example) : nothing}
        ${showCode ? html`<widget-code-block .code=${example.code} language="html"></widget-code-block>` : nothing}
      </article>
    `;
  }

  private renderUsageGuidelines() {
    const guidelines = this.meta?.usageGuidelines;
    if (!guidelines) return nothing;
    return html`
      <div class="guidelines-grid">
        ${guidelines.do.length ? html`
          <div class="guideline-card guideline-card--do">
            <div class="guideline-card__header">
              <span class="guideline-card__icon">✓</span>
              <strong>Do</strong>
            </div>
            <ul>${guidelines.do.map((item) => html`<li>${item}</li>`)}</ul>
          </div>
        ` : nothing}
        ${guidelines.dont.length ? html`
          <div class="guideline-card guideline-card--dont">
            <div class="guideline-card__header">
              <span class="guideline-card__icon">×</span>
              <strong>Don't</strong>
            </div>
            <ul>${guidelines.dont.map((item) => html`<li>${item}</li>`)}</ul>
          </div>
        ` : nothing}
        ${guidelines.notes?.length ? html`
          <div class="guideline-card guideline-card--notes">
            <div class="guideline-card__header">
              <span class="guideline-card__icon">i</span>
              <strong>Notes</strong>
            </div>
            <ul>${guidelines.notes.map((item) => html`<li>${item}</li>`)}</ul>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private renderApiReference() {
    if (!this.meta) return nothing;
    return html`
      ${this.meta.properties.length ? html`
        <div class="api-section">
          <h3>Properties</h3>
          <widget-props-table .properties=${this.meta.properties}></widget-props-table>
        </div>
      ` : nothing}
      ${this.meta.events.length ? html`
        <div class="api-section">
          <h3>Events</h3>
          <widget-events-table .events=${this.meta.events}></widget-events-table>
        </div>
      ` : nothing}
      ${this.meta.slots.length ? html`
        <div class="api-section">
          <h3>Slots</h3>
          <widget-slots-table .slots=${this.meta.slots}></widget-slots-table>
        </div>
      ` : nothing}
      ${this.meta.cssProperties.length ? html`
        <div class="api-section">
          <h3>CSS Custom Properties</h3>
          <widget-css-props-table .cssProperties=${this.meta.cssProperties}></widget-css-props-table>
        </div>
      ` : nothing}
    `;
  }

  private renderRelated() {
    if (!this.meta?.relatedComponents?.length) return nothing;
    return html`
      <div class="related-components">
        ${this.meta.relatedComponents.map((relatedTag) => {
          const related = catalogue.get(relatedTag);
          if (!related) return nothing;
          return html`
            <a class="related-link" href=${buildWidgetUrl({ category: related.category, tag: related.tag })}>
              <span>
                <span class="related-name">${related.name}</span>
                <span class="related-tag">&lt;${related.tag}&gt;</span>
              </span>
              <span class="related-arrow" aria-hidden="true">→</span>
            </a>
          `;
        })}
      </div>
    `;
  }

  private renderSection(id: string, title: string, description: string, content: unknown) {
    return html`
      <section class="demo-section" id=${id}>
        <span class="section-kicker">Section</span>
        <h2 class="section-heading">${title}</h2>
        <p class="section-description">${description}</p>
        ${content}
      </section>
    `;
  }

  private renderMemberOf() {
    const memberOf = this.meta?.memberOf;
    if (!memberOf || !Object.keys(memberOf).length) return nothing;

    const groups = Object.entries(memberOf).filter(([, tagIds]) => tagIds.length > 0);
    if (!groups.length) return nothing;

    return html`
      <div class="contracts-band">
        ${groups.map(([groupId, tagIds]) => {
          const groupDef = tagGroupRegistry.get(groupId);
          const groupLabel = groupDef?.name ?? groupId;
          const groupUrl = buildTagGroupUrl(groupId);
          return html`
            <div class="contract-group">
              <span class="contract-group__label">
                ${groupUrl ? html`<a href=${groupUrl}>${groupLabel}</a>` : groupLabel}
              </span>
              ${tagIds.map((tagId) => {
                const tagDef = tagGroupRegistry.getTag(groupId, tagId);
                if (!tagDef) {
                  console.warn(`[widget-atlas] Component "${this.meta?.tag}" declares memberOf["${groupId}"]["${tagId}"] but no TagDef is registered for this tag.`);
                }
                const tagLabel = tagDef?.name ?? tagId;
                const tagUrl = buildTagUrl(groupId, tagId);
                return tagUrl
                  ? html`<a class="tag-chip" href=${tagUrl}>${tagLabel} →</a>`
                  : html`<span class="tag-chip">${tagLabel}</span>`;
              })}
            </div>
          `;
        })}
      </div>
    `;
  }

  private renderSidebar() {
    if (!this.meta) return nothing;
    const sections = [
      ...this.meta.examples.map((e) => ({ id: e.id, label: e.title })),
      ...(this.meta.usageGuidelines ? [{ id: 'usage', label: 'Usage Guidelines' }] : []),
      { id: 'api', label: 'API Reference' },
      ...(this.meta.relatedComponents?.length ? [{ id: 'related', label: 'Related Components' }] : []),
    ];
    if (!sections.length) return nothing;

    return html`
      <div slot="sidebar">
        <div class="sidebar__label">On this page</div>
        <nav>
          <ul class="sidebar__nav">
            ${sections.map((section) => html`
              <li>
                <button
                  class="sidebar__link ${this.activeSectionId === section.id ? 'sidebar__link--active' : ''}"
                  @click=${() => this.renderRoot.querySelector<HTMLElement>(`#${section.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  type="button"
                >
                  ${section.label}
                </button>
              </li>
            `)}
          </ul>
        </nav>
      </div>
    `;
  }

  render() {
    if (!this.meta) {
      return html`
        <widget-detail-layout>
          <span slot="heading">Widget not found</span>
          <p slot="description">No metadata found for "${this.tag}".</p>
        </widget-detail-layout>
      `;
    }

    return html`
      <widget-detail-layout>
        <a slot="breadcrumb" class="back-link" href=${this.catalogueHref}>← Back to Catalogue</a>

        <span slot="heading" class="heading-row">
          <span class="heading-name">${this.meta.name}</span>
          ${this.meta.status
            ? html`<span class="status-chip status-chip--${statusTone(this.meta.status)}">${this.meta.status}</span>`
            : nothing}
        </span>

        <div slot="header-meta" class="header-meta-content">
          <div class="meta-strip">
            <span class="meta-strip__item">
              <span class="meta-strip__value">&lt;${this.meta.tag}&gt;</span>
            </span>
            <span class="meta-strip__item">
              <span class="meta-strip__label">Category</span>
              <span class="meta-strip__value">${titleCase(this.meta.category)}</span>
            </span>
            <span class="meta-strip__item">
              <span class="meta-strip__label">Level</span>
              <span class="meta-strip__value">${titleCase(this.meta.level)}</span>
            </span>
            ${this.meta.version ? html`
              <span class="meta-strip__item">
                <span class="meta-strip__label">v</span>
                <span class="meta-strip__value">${this.meta.version}</span>
              </span>
            ` : nothing}
          </div>
          ${this.renderMemberOf()}
        </div>

        <p slot="description">${this.meta.description}</p>

        ${this.renderSidebar()}

        ${this.meta.examples.map((example) => this.renderExample(example))}
        ${this.meta.usageGuidelines
          ? this.renderSection('usage', 'Usage Guidelines', 'Practical guidance for choosing and composing this component well.', this.renderUsageGuidelines())
          : nothing}
        ${this.renderSection('api', 'API Reference', 'Inspect the public surface area exposed by this widget.', this.renderApiReference())}
        ${this.meta.relatedComponents?.length
          ? this.renderSection('related', 'Related Components', 'Other widgets that pair naturally with this one.', this.renderRelated())
          : nothing}
      </widget-detail-layout>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-demo-page': WidgetDemoPage;
  }
}
