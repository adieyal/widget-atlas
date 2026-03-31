import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { catalogue } from '../core/catalogue.js';
import { buildWidgetUrl } from '../core/url-strategy.js';
import type { ExampleConfig, WidgetMetadata } from '../core/types.js';
import { statusTone, titleCase } from './catalogue-constants.js';
import { widgetAtlasControlStyles, widgetAtlasThemeStyles } from './shared-styles.js';

import './widget-code-block.js';
import './widget-css-props-table.js';
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
        display: grid;
        grid-template-columns: 15rem minmax(0, 1fr);
        min-height: 100vh;
        background:
          radial-gradient(circle at top right, rgb(var(--_widget-atlas-tint) / 0.07), transparent 30%),
          linear-gradient(180deg, var(--_widget-atlas-surface-muted), var(--_widget-atlas-surface-end) 18rem);
      }

      .sidebar {
        position: sticky;
        top: 0;
        align-self: start;
        height: 100vh;
        padding: var(--_widget-atlas-space-2xl) 0;
        border-right: 1px solid var(--_widget-atlas-border);
        background: var(--_widget-atlas-surface);
      }

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

      .demo-main {
        max-width: calc(var(--_widget-atlas-layout-max) - 8rem);
        width: 100%;
        padding: var(--_widget-atlas-space-2xl);
        box-sizing: border-box;
      }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        margin-bottom: var(--_widget-atlas-space-lg);
        color: var(--_widget-atlas-accent-strong);
        text-decoration: none;
        font-weight: 600;
      }

      .back-link:hover {
        color: var(--_widget-atlas-accent);
      }

      .demo-header {
        margin-bottom: var(--_widget-atlas-space-2xl);
        padding-bottom: var(--_widget-atlas-space-xl);
        border-bottom: 1px solid var(--_widget-atlas-border);
      }

      .header-title-row {
        display: flex;
        align-items: center;
        gap: var(--_widget-atlas-space-sm);
        flex-wrap: wrap;
        margin-bottom: var(--_widget-atlas-space-sm);
      }

      h1 {
        margin: 0;
        font-family: var(
          --_widget-atlas-font-display,
          'Fraunces',
          'DM Serif Display',
          Georgia,
          serif
        );
        font-size: clamp(2rem, 4vw, 3rem);
        line-height: 0.98;
        letter-spacing: -0.04em;
      }

      .status-chip,
      .meta-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        min-height: 2rem;
        padding: 0 0.75rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .status-chip::before {
        content: '';
        width: 0.46rem;
        height: 0.46rem;
        border-radius: 50%;
        background: currentColor;
      }

      .status-chip--success {
        background: var(--_widget-atlas-success-soft);
        color: var(--_widget-atlas-success);
      }

      .status-chip--brand {
        background: var(--_widget-atlas-accent-soft);
        color: var(--_widget-atlas-accent-strong);
      }

      .status-chip--accent {
        background: var(--_widget-atlas-info-soft);
        color: var(--_widget-atlas-info);
      }

      .status-chip--warning {
        background: var(--_widget-atlas-warning-soft);
        color: var(--_widget-atlas-warning);
      }

      .status-chip--danger {
        background: var(--_widget-atlas-danger-soft);
        color: var(--_widget-atlas-danger);
      }

      .status-chip--muted {
        background: var(--_widget-atlas-surface-strong);
        color: var(--_widget-atlas-text-muted);
      }

      .demo-subtitle {
        max-width: 40rem;
        margin: 0 0 var(--_widget-atlas-space-md);
        color: var(--_widget-atlas-text-muted);
        font-size: 1.02rem;
      }

      .header-meta {
        display: flex;
        flex-wrap: wrap;
        gap: var(--_widget-atlas-space-xs);
      }

      .meta-chip {
        border: 1px solid var(--_widget-atlas-border);
        background: var(--_widget-atlas-surface);
        color: var(--_widget-atlas-text-soft);
        text-transform: none;
        font-weight: 600;
      }

      .meta-chip code {
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.8rem;
        color: var(--_widget-atlas-text);
      }

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

      .section-heading {
        margin: 0;
        font-size: 1.6rem;
      }

      .section-description,
      .example-description {
        margin: var(--_widget-atlas-space-xs) 0 var(--_widget-atlas-space-lg);
        color: var(--_widget-atlas-text-muted);
      }

      .example-section h3 {
        margin: 0;
        font-size: 1.25rem;
      }

      .example-preview {
        margin-bottom: var(--_widget-atlas-space-md);
      }

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

      .guideline-card--do {
        background: var(--_widget-atlas-success-soft);
        border-color: color-mix(in srgb, var(--_widget-atlas-success) 35%, white);
      }

      .guideline-card--dont {
        background: var(--_widget-atlas-danger-soft);
        border-color: color-mix(in srgb, var(--_widget-atlas-danger) 35%, white);
      }

      .guideline-card--notes {
        grid-column: 1 / -1;
        background: var(--_widget-atlas-info-soft);
        border-color: color-mix(in srgb, var(--_widget-atlas-info) 35%, white);
      }

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

      .guideline-card--do .guideline-card__icon {
        background: var(--_widget-atlas-success);
        color: white;
      }

      .guideline-card--dont .guideline-card__icon {
        background: var(--_widget-atlas-danger);
        color: white;
      }

      .guideline-card--notes .guideline-card__icon {
        background: var(--_widget-atlas-info);
        color: white;
      }

      .guideline-card ul {
        margin: 0;
        padding-left: 1.15rem;
      }

      .guideline-card li + li {
        margin-top: 0.45rem;
      }

      .api-section + .api-section {
        margin-top: var(--_widget-atlas-space-lg);
      }

      .api-section h3 {
        margin: 0 0 var(--_widget-atlas-space-sm);
        font-size: 1.1rem;
      }

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

      .related-link:hover {
        border-color: var(--_widget-atlas-border-strong);
        box-shadow: var(--_widget-atlas-shadow-md);
      }

      .related-name {
        display: block;
        font-weight: 700;
      }

      .related-tag {
        display: block;
        margin-top: var(--_widget-atlas-space-2xs);
        color: var(--_widget-atlas-text-soft);
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.78rem;
      }

      .related-arrow {
        color: var(--_widget-atlas-accent);
        font-size: 1.1rem;
      }

      .error {
        margin: var(--_widget-atlas-space-2xl) auto;
        max-width: 40rem;
        padding: var(--_widget-atlas-space-xl);
        border-radius: var(--_widget-atlas-radius-md);
        border: 1px solid color-mix(in srgb, var(--_widget-atlas-danger) 34%, white);
        background: var(--_widget-atlas-danger-soft);
        color: var(--_widget-atlas-danger);
      }

      @media (max-width: 960px) {
        :host {
          grid-template-columns: 1fr;
        }

        .sidebar {
          position: static;
          height: auto;
          padding: var(--_widget-atlas-space-md) var(--_widget-atlas-space-md) 0;
          border-right: none;
          border-bottom: 1px solid var(--_widget-atlas-border);
          background: transparent;
        }

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
          border-bottom-color: var(--_widget-atlas-accent);
        }

        .demo-main {
          max-width: none;
          padding: var(--_widget-atlas-space-lg);
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

    if (!('IntersectionObserver' in window)) {
      return;
    }

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          this.activeSectionId = visible[0].target.id;
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.2, 0.6],
      }
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
    if (!(container instanceof HTMLElement)) {
      return;
    }

    const previewEl = document.createElement(tagName) as HTMLElement & Record<string, unknown>;
    Object.entries(props).forEach(([key, value]) => {
      previewEl[key] = value;
    });
    container.replaceChildren(previewEl);
  }

  private renderPreview(example: ExampleConfig) {
    if (example.props && this.meta) {
      return html`
        <widget-preview
          class="example-preview"
          ?full-width=${Boolean(example.fullWidth)}
          ?show-device-selector=${true}
          ?show-width-control=${!example.fullWidth}
          use-slot
        >
          <div ${ref((container) => this.mountPropPreview(container, this.meta!.tag, example.props!))}></div>
        </widget-preview>
      `;
    }

    return html`
      <widget-preview
        class="example-preview"
        .code=${example.code}
        ?full-width=${Boolean(example.fullWidth)}
        ?show-device-selector=${true}
        ?show-width-control=${!example.fullWidth}
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
        ${showCode
          ? html`<widget-code-block .code=${example.code} language="html"></widget-code-block>`
          : nothing}
      </article>
    `;
  }

  private renderUsageGuidelines() {
    const guidelines = this.meta?.usageGuidelines;
    if (!guidelines) {
      return nothing;
    }

    return html`
      <div class="guidelines-grid">
        ${guidelines.do.length
          ? html`
              <div class="guideline-card guideline-card--do">
                <div class="guideline-card__header">
                  <span class="guideline-card__icon">✓</span>
                  <strong>Do</strong>
                </div>
                <ul>
                  ${guidelines.do.map((item) => html`<li>${item}</li>`)}
                </ul>
              </div>
            `
          : nothing}
        ${guidelines.dont.length
          ? html`
              <div class="guideline-card guideline-card--dont">
                <div class="guideline-card__header">
                  <span class="guideline-card__icon">×</span>
                  <strong>Don't</strong>
                </div>
                <ul>
                  ${guidelines.dont.map((item) => html`<li>${item}</li>`)}
                </ul>
              </div>
            `
          : nothing}
        ${guidelines.notes?.length
          ? html`
              <div class="guideline-card guideline-card--notes">
                <div class="guideline-card__header">
                  <span class="guideline-card__icon">i</span>
                  <strong>Notes</strong>
                </div>
                <ul>
                  ${guidelines.notes.map((item) => html`<li>${item}</li>`)}
                </ul>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private renderApiReference() {
    if (!this.meta) {
      return nothing;
    }

    return html`
      ${this.meta.properties.length
        ? html`
            <div class="api-section">
              <h3>Properties</h3>
              <widget-props-table .properties=${this.meta.properties}></widget-props-table>
            </div>
          `
        : nothing}
      ${this.meta.events.length
        ? html`
            <div class="api-section">
              <h3>Events</h3>
              <widget-events-table .events=${this.meta.events}></widget-events-table>
            </div>
          `
        : nothing}
      ${this.meta.slots.length
        ? html`
            <div class="api-section">
              <h3>Slots</h3>
              <widget-slots-table .slots=${this.meta.slots}></widget-slots-table>
            </div>
          `
        : nothing}
      ${this.meta.cssProperties.length
        ? html`
            <div class="api-section">
              <h3>CSS Custom Properties</h3>
              <widget-css-props-table .cssProperties=${this.meta.cssProperties}></widget-css-props-table>
            </div>
          `
        : nothing}
    `;
  }

  private renderRelated() {
    if (!this.meta?.relatedComponents?.length) {
      return nothing;
    }

    return html`
      <div class="related-components">
        ${this.meta.relatedComponents.map((relatedTag) => {
          const related = catalogue.get(relatedTag);
          if (!related) return nothing;

          return html`
            <a
              class="related-link"
              href=${buildWidgetUrl({ category: related.category, tag: related.tag })}
            >
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

  private renderSection(
    id: string,
    title: string,
    description: string,
    content: unknown
  ) {
    return html`
      <section class="demo-section" id=${id}>
        <span class="section-kicker">Section</span>
        <h2 class="section-heading">${title}</h2>
        <p class="section-description">${description}</p>
        ${content}
      </section>
    `;
  }

  private buildTocSections() {
    if (!this.meta) {
      return [];
    }

    const sections = this.meta.examples.map((example) => ({ id: example.id, label: example.title }));
    if (this.meta.usageGuidelines) {
      sections.push({ id: 'usage', label: 'Usage Guidelines' });
    }
    sections.push({ id: 'api', label: 'API Reference' });
    if (this.meta.relatedComponents?.length) {
      sections.push({ id: 'related', label: 'Related Components' });
    }
    return sections;
  }

  private renderSidebar() {
    const sections = this.buildTocSections();
    if (!sections.length) {
      return nothing;
    }

    return html`
      <aside class="sidebar">
        <div class="sidebar__label">On this page</div>
        <nav>
          <ul class="sidebar__nav">
            ${sections.map(
              (section) => html`
                <li>
                  <button
                    class="sidebar__link ${this.activeSectionId === section.id
                      ? 'sidebar__link--active'
                      : ''}"
                    @click=${() =>
                      this.renderRoot
                        .querySelector<HTMLElement>(`#${section.id}`)
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    type="button"
                  >
                    ${section.label}
                  </button>
                </li>
              `
            )}
          </ul>
        </nav>
      </aside>
    `;
  }

  private renderHeader() {
    if (!this.meta) {
      return nothing;
    }

    return html`
      <header class="demo-header">
        <a class="back-link" href=${this.catalogueHref}>← Back to Catalogue</a>
        <div class="header-title-row">
          <h1>${this.meta.name}</h1>
          ${this.meta.status
            ? html`<span class="status-chip status-chip--${statusTone(this.meta.status)}">
                ${this.meta.status}
              </span>`
            : nothing}
        </div>
        <p class="demo-subtitle">${this.meta.description}</p>
        <div class="header-meta">
          <span class="meta-chip">Tag <code>&lt;${this.meta.tag}&gt;</code></span>
          <span class="meta-chip">Category <code>${titleCase(this.meta.category)}</code></span>
          <span class="meta-chip">Level <code>${titleCase(this.meta.level)}</code></span>
          ${this.meta.version ? html`<span class="meta-chip">Version <code>${this.meta.version}</code></span>` : nothing}
        </div>
      </header>
    `;
  }

  render() {
    if (!this.meta) {
      return html`
        <div class="demo-main">
          <div class="error">
            <strong>Widget not found</strong>
            <p>No metadata found for "${this.tag}".</p>
          </div>
        </div>
      `;
    }

    return html`
      ${this.renderSidebar()}
      <main class="demo-main">
        ${this.renderHeader()}
        ${this.meta.examples.map((example) => this.renderExample(example))}
        ${this.meta.usageGuidelines
          ? this.renderSection(
              'usage',
              'Usage Guidelines',
              'Practical guidance for choosing and composing this component well.',
              this.renderUsageGuidelines()
            )
          : nothing}
        ${this.renderSection(
          'api',
          'API Reference',
          'Inspect the public surface area exposed by this widget.',
          this.renderApiReference()
        )}
        ${this.meta.relatedComponents?.length
          ? this.renderSection(
              'related',
              'Related Components',
              'Other widgets that pair naturally with this one.',
              this.renderRelated()
            )
          : nothing}
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-demo-page': WidgetDemoPage;
  }
}
