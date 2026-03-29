var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { catalogue } from '../core/catalogue.js';
import { buildWidgetUrl } from '../core/url-strategy.js';
import { statusTone, titleCase } from './catalogue-constants.js';
import { widgetAtlasControlStyles, widgetAtlasThemeStyles } from './shared-styles.js';
import './widget-code-block.js';
import './widget-css-props-table.js';
import './widget-events-table.js';
import './widget-preview.js';
import './widget-props-table.js';
import './widget-slots-table.js';
let WidgetDemoPage = class WidgetDemoPage extends LitElement {
    constructor() {
        super(...arguments);
        this.tag = '';
        this.catalogueHref = '/widgets/';
        this.meta = null;
        this.activeSectionId = '';
        this.sectionObserver = null;
    }
    connectedCallback() {
        super.connectedCallback();
        this.loadMeta();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.sectionObserver?.disconnect();
        this.sectionObserver = null;
    }
    updated(changedProps) {
        if (changedProps.has('tag')) {
            this.loadMeta();
        }
        if (this.meta && changedProps.has('tag')) {
            queueMicrotask(() => this.setupScrollSpy());
        }
    }
    loadMeta() {
        this.meta = this.tag ? catalogue.get(this.tag) || null : null;
        this.activeSectionId = this.meta?.examples[0]?.id ?? '';
    }
    setupScrollSpy() {
        this.sectionObserver?.disconnect();
        this.sectionObserver = null;
        if (!('IntersectionObserver' in window)) {
            return;
        }
        this.sectionObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            if (visible[0]?.target.id) {
                this.activeSectionId = visible[0].target.id;
            }
        }, {
            rootMargin: '-30% 0px -55% 0px',
            threshold: [0.2, 0.6],
        });
        this.renderRoot.querySelectorAll('.demo-section[id], .example-section[id]').forEach((el) => {
            this.sectionObserver?.observe(el);
        });
    }
    mountPropPreview(container, tagName, props) {
        if (!(container instanceof HTMLElement)) {
            return;
        }
        const previewEl = document.createElement(tagName);
        Object.entries(props).forEach(([key, value]) => {
            previewEl[key] = value;
        });
        container.replaceChildren(previewEl);
    }
    renderPreview(example) {
        if (example.props && this.meta) {
            return html `
        <widget-preview
          class="example-preview"
          ?full-width=${Boolean(example.fullWidth)}
          ?show-device-selector=${true}
          ?show-width-control=${!example.fullWidth}
          use-slot
        >
          <div ${ref((container) => this.mountPropPreview(container, this.meta.tag, example.props))}></div>
        </widget-preview>
      `;
        }
        return html `
      <widget-preview
        class="example-preview"
        .code=${example.code}
        ?full-width=${Boolean(example.fullWidth)}
        ?show-device-selector=${true}
        ?show-width-control=${!example.fullWidth}
      ></widget-preview>
    `;
    }
    renderExample(example) {
        const showPreview = example.showPreview ?? true;
        const showCode = example.showCode ?? true;
        return html `
      <article class="example-section" id=${example.id}>
        <span class="section-kicker">Example</span>
        <h3>${example.title}</h3>
        ${example.description ? html `<p class="example-description">${example.description}</p>` : nothing}
        ${showPreview ? this.renderPreview(example) : nothing}
        ${showCode
            ? html `<widget-code-block .code=${example.code} language="html"></widget-code-block>`
            : nothing}
      </article>
    `;
    }
    renderUsageGuidelines() {
        const guidelines = this.meta?.usageGuidelines;
        if (!guidelines) {
            return nothing;
        }
        return html `
      <div class="guidelines-grid">
        ${guidelines.do.length
            ? html `
              <div class="guideline-card guideline-card--do">
                <div class="guideline-card__header">
                  <span class="guideline-card__icon">✓</span>
                  <strong>Do</strong>
                </div>
                <ul>
                  ${guidelines.do.map((item) => html `<li>${item}</li>`)}
                </ul>
              </div>
            `
            : nothing}
        ${guidelines.dont.length
            ? html `
              <div class="guideline-card guideline-card--dont">
                <div class="guideline-card__header">
                  <span class="guideline-card__icon">×</span>
                  <strong>Don't</strong>
                </div>
                <ul>
                  ${guidelines.dont.map((item) => html `<li>${item}</li>`)}
                </ul>
              </div>
            `
            : nothing}
        ${guidelines.notes?.length
            ? html `
              <div class="guideline-card guideline-card--notes">
                <div class="guideline-card__header">
                  <span class="guideline-card__icon">i</span>
                  <strong>Notes</strong>
                </div>
                <ul>
                  ${guidelines.notes.map((item) => html `<li>${item}</li>`)}
                </ul>
              </div>
            `
            : nothing}
      </div>
    `;
    }
    renderApiReference() {
        if (!this.meta) {
            return nothing;
        }
        return html `
      ${this.meta.properties.length
            ? html `
            <div class="api-section">
              <h3>Properties</h3>
              <widget-props-table .properties=${this.meta.properties}></widget-props-table>
            </div>
          `
            : nothing}
      ${this.meta.events.length
            ? html `
            <div class="api-section">
              <h3>Events</h3>
              <widget-events-table .events=${this.meta.events}></widget-events-table>
            </div>
          `
            : nothing}
      ${this.meta.slots.length
            ? html `
            <div class="api-section">
              <h3>Slots</h3>
              <widget-slots-table .slots=${this.meta.slots}></widget-slots-table>
            </div>
          `
            : nothing}
      ${this.meta.cssProperties.length
            ? html `
            <div class="api-section">
              <h3>CSS Custom Properties</h3>
              <widget-css-props-table .cssProperties=${this.meta.cssProperties}></widget-css-props-table>
            </div>
          `
            : nothing}
    `;
    }
    renderRelated() {
        if (!this.meta?.relatedComponents?.length) {
            return nothing;
        }
        return html `
      <div class="related-components">
        ${this.meta.relatedComponents.map((relatedTag) => {
            const related = catalogue.get(relatedTag);
            if (!related)
                return nothing;
            return html `
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
    renderSection(id, title, description, content) {
        return html `
      <section class="demo-section" id=${id}>
        <span class="section-kicker">Section</span>
        <h2 class="section-heading">${title}</h2>
        <p class="section-description">${description}</p>
        ${content}
      </section>
    `;
    }
    buildTocSections() {
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
    renderSidebar() {
        const sections = this.buildTocSections();
        if (!sections.length) {
            return nothing;
        }
        return html `
      <aside class="sidebar">
        <div class="sidebar__label">On this page</div>
        <nav>
          <ul class="sidebar__nav">
            ${sections.map((section) => html `
                <li>
                  <button
                    class="sidebar__link ${this.activeSectionId === section.id
            ? 'sidebar__link--active'
            : ''}"
                    @click=${() => this.renderRoot
            .querySelector(`#${section.id}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    type="button"
                  >
                    ${section.label}
                  </button>
                </li>
              `)}
          </ul>
        </nav>
      </aside>
    `;
    }
    renderHeader() {
        if (!this.meta) {
            return nothing;
        }
        return html `
      <header class="demo-header">
        <a class="back-link" href=${this.catalogueHref}>← Back to Catalogue</a>
        <div class="header-title-row">
          <h1>${this.meta.name}</h1>
          ${this.meta.status
            ? html `<span class="status-chip status-chip--${statusTone(this.meta.status)}">
                ${this.meta.status}
              </span>`
            : nothing}
        </div>
        <p class="demo-subtitle">${this.meta.description}</p>
        <div class="header-meta">
          <span class="meta-chip">Tag <code>&lt;${this.meta.tag}&gt;</code></span>
          <span class="meta-chip">Category <code>${titleCase(this.meta.category)}</code></span>
          <span class="meta-chip">Level <code>${titleCase(this.meta.level)}</code></span>
          ${this.meta.version ? html `<span class="meta-chip">Version <code>${this.meta.version}</code></span>` : nothing}
        </div>
      </header>
    `;
    }
    render() {
        if (!this.meta) {
            return html `
        <div class="demo-main">
          <div class="error">
            <strong>Widget not found</strong>
            <p>No metadata found for "${this.tag}".</p>
          </div>
        </div>
      `;
        }
        return html `
      ${this.renderSidebar()}
      <main class="demo-main">
        ${this.renderHeader()}
        ${this.meta.examples.map((example) => this.renderExample(example))}
        ${this.meta.usageGuidelines
            ? this.renderSection('usage', 'Usage Guidelines', 'Practical guidance for choosing and composing this component well.', this.renderUsageGuidelines())
            : nothing}
        ${this.renderSection('api', 'API Reference', 'Inspect the public surface area exposed by this widget.', this.renderApiReference())}
        ${this.meta.relatedComponents?.length
            ? this.renderSection('related', 'Related Components', 'Other widgets that pair naturally with this one.', this.renderRelated())
            : nothing}
      </main>
    `;
    }
};
WidgetDemoPage.styles = [
    widgetAtlasThemeStyles,
    widgetAtlasControlStyles,
    css `
      :host {
        display: grid;
        grid-template-columns: 15rem minmax(0, 1fr);
        min-height: 100vh;
        background:
          radial-gradient(circle at top right, rgb(29 122 82 / 0.07), transparent 30%),
          linear-gradient(180deg, var(--widget-atlas-surface-muted), #f7faf5 18rem);
      }

      .sidebar {
        position: sticky;
        top: 0;
        align-self: start;
        height: 100vh;
        padding: var(--widget-atlas-space-2xl) 0;
        border-right: 1px solid var(--widget-atlas-border);
        background: rgb(255 255 255 / 0.74);
        backdrop-filter: blur(14px);
      }

      .sidebar__label {
        padding: 0 var(--widget-atlas-space-lg);
        margin-bottom: var(--widget-atlas-space-md);
        color: var(--widget-atlas-text-soft);
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
        padding: 0.65rem var(--widget-atlas-space-lg);
        border: none;
        border-left: 3px solid transparent;
        background: transparent;
        color: var(--widget-atlas-text-muted);
        text-align: left;
        cursor: pointer;
      }

      .sidebar__link:hover {
        background: rgb(23 34 24 / 0.04);
        color: var(--widget-atlas-text);
      }

      .sidebar__link--active {
        color: var(--widget-atlas-accent-strong);
        border-left-color: var(--widget-atlas-accent);
        background: color-mix(in srgb, var(--widget-atlas-accent) 9%, white);
      }

      .demo-main {
        max-width: calc(var(--widget-atlas-layout-max) - 8rem);
        width: 100%;
        padding: var(--widget-atlas-space-2xl);
        box-sizing: border-box;
      }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        margin-bottom: var(--widget-atlas-space-lg);
        color: var(--widget-atlas-accent-strong);
        text-decoration: none;
        font-weight: 600;
      }

      .back-link:hover {
        color: var(--widget-atlas-accent);
      }

      .demo-header {
        margin-bottom: var(--widget-atlas-space-2xl);
        padding-bottom: var(--widget-atlas-space-xl);
        border-bottom: 1px solid var(--widget-atlas-border);
      }

      .header-title-row {
        display: flex;
        align-items: center;
        gap: var(--widget-atlas-space-sm);
        flex-wrap: wrap;
        margin-bottom: var(--widget-atlas-space-sm);
      }

      h1 {
        margin: 0;
        font-family: var(
          --widget-atlas-font-display,
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
        background: var(--widget-atlas-success-soft);
        color: var(--widget-atlas-success);
      }

      .status-chip--brand {
        background: var(--widget-atlas-accent-soft);
        color: var(--widget-atlas-accent-strong);
      }

      .status-chip--accent {
        background: var(--widget-atlas-info-soft);
        color: var(--widget-atlas-info);
      }

      .status-chip--warning {
        background: var(--widget-atlas-warning-soft);
        color: var(--widget-atlas-warning);
      }

      .status-chip--danger {
        background: var(--widget-atlas-danger-soft);
        color: var(--widget-atlas-danger);
      }

      .status-chip--muted {
        background: var(--widget-atlas-surface-strong);
        color: var(--widget-atlas-text-muted);
      }

      .demo-subtitle {
        max-width: 40rem;
        margin: 0 0 var(--widget-atlas-space-md);
        color: var(--widget-atlas-text-muted);
        font-size: 1.02rem;
      }

      .header-meta {
        display: flex;
        flex-wrap: wrap;
        gap: var(--widget-atlas-space-xs);
      }

      .meta-chip {
        border: 1px solid var(--widget-atlas-border);
        background: var(--widget-atlas-surface);
        color: var(--widget-atlas-text-soft);
        text-transform: none;
        font-weight: 600;
      }

      .meta-chip code {
        font-family: var(
          --widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.8rem;
        color: var(--widget-atlas-text);
      }

      .demo-section,
      .example-section {
        margin-bottom: var(--widget-atlas-space-2xl);
      }

      .section-kicker {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        margin-bottom: var(--widget-atlas-space-xs);
        color: var(--widget-atlas-text-soft);
        font-size: 0.74rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .section-kicker::before {
        content: '';
        width: 1.4rem;
        height: 1px;
        background: var(--widget-atlas-border-strong);
      }

      .section-heading {
        margin: 0;
        font-size: 1.6rem;
      }

      .section-description,
      .example-description {
        margin: var(--widget-atlas-space-xs) 0 var(--widget-atlas-space-lg);
        color: var(--widget-atlas-text-muted);
      }

      .example-section h3 {
        margin: 0;
        font-size: 1.25rem;
      }

      .example-preview {
        margin-bottom: var(--widget-atlas-space-md);
      }

      .guidelines-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--widget-atlas-space-lg);
      }

      .guideline-card {
        padding: var(--widget-atlas-space-lg);
        border-radius: var(--widget-atlas-radius-md);
        border: 1px solid var(--widget-atlas-border);
      }

      .guideline-card--do {
        background: var(--widget-atlas-success-soft);
        border-color: color-mix(in srgb, var(--widget-atlas-success) 35%, white);
      }

      .guideline-card--dont {
        background: var(--widget-atlas-danger-soft);
        border-color: color-mix(in srgb, var(--widget-atlas-danger) 35%, white);
      }

      .guideline-card--notes {
        grid-column: 1 / -1;
        background: var(--widget-atlas-info-soft);
        border-color: color-mix(in srgb, var(--widget-atlas-info) 35%, white);
      }

      .guideline-card__header {
        display: flex;
        align-items: center;
        gap: var(--widget-atlas-space-xs);
        margin-bottom: var(--widget-atlas-space-sm);
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
        background: var(--widget-atlas-success);
        color: white;
      }

      .guideline-card--dont .guideline-card__icon {
        background: var(--widget-atlas-danger);
        color: white;
      }

      .guideline-card--notes .guideline-card__icon {
        background: var(--widget-atlas-info);
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
        margin-top: var(--widget-atlas-space-lg);
      }

      .api-section h3 {
        margin: 0 0 var(--widget-atlas-space-sm);
        font-size: 1.1rem;
      }

      .related-components {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: var(--widget-atlas-space-md);
      }

      .related-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--widget-atlas-space-sm);
        padding: var(--widget-atlas-space-md);
        border-radius: var(--widget-atlas-radius-md);
        border: 1px solid var(--widget-atlas-border);
        background: var(--widget-atlas-surface);
        color: inherit;
        text-decoration: none;
        box-shadow: var(--widget-atlas-shadow-sm);
      }

      .related-link:hover {
        border-color: var(--widget-atlas-border-strong);
        box-shadow: var(--widget-atlas-shadow-md);
      }

      .related-name {
        display: block;
        font-weight: 700;
      }

      .related-tag {
        display: block;
        margin-top: var(--widget-atlas-space-2xs);
        color: var(--widget-atlas-text-soft);
        font-family: var(
          --widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.78rem;
      }

      .related-arrow {
        color: var(--widget-atlas-accent);
        font-size: 1.1rem;
      }

      .error {
        margin: var(--widget-atlas-space-2xl) auto;
        max-width: 40rem;
        padding: var(--widget-atlas-space-xl);
        border-radius: var(--widget-atlas-radius-md);
        border: 1px solid color-mix(in srgb, var(--widget-atlas-danger) 34%, white);
        background: var(--widget-atlas-danger-soft);
        color: var(--widget-atlas-danger);
      }

      @media (max-width: 960px) {
        :host {
          grid-template-columns: 1fr;
        }

        .sidebar {
          position: static;
          height: auto;
          padding: var(--widget-atlas-space-md) var(--widget-atlas-space-md) 0;
          border-right: none;
          border-bottom: 1px solid var(--widget-atlas-border);
          background: transparent;
        }

        .sidebar__nav {
          display: flex;
          gap: var(--widget-atlas-space-xs);
          overflow: auto;
          padding-bottom: var(--widget-atlas-space-sm);
        }

        .sidebar__link {
          width: auto;
          border-left: none;
          border-bottom: 2px solid transparent;
          border-radius: 999px;
          white-space: nowrap;
        }

        .sidebar__link--active {
          border-bottom-color: var(--widget-atlas-accent);
        }

        .demo-main {
          max-width: none;
          padding: var(--widget-atlas-space-lg);
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
__decorate([
    property({ type: String })
], WidgetDemoPage.prototype, "tag", void 0);
__decorate([
    property({ type: String, attribute: 'catalogue-href' })
], WidgetDemoPage.prototype, "catalogueHref", void 0);
__decorate([
    state()
], WidgetDemoPage.prototype, "meta", void 0);
__decorate([
    state()
], WidgetDemoPage.prototype, "activeSectionId", void 0);
WidgetDemoPage = __decorate([
    customElement('widget-demo-page')
], WidgetDemoPage);
export { WidgetDemoPage };
