var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { catalogue } from '../core/catalogue.js';
import { buildWidgetUrl } from '../core/url-strategy.js';
let WidgetDemoPage = class WidgetDemoPage extends LitElement {
    constructor() {
        super(...arguments);
        this.tag = '';
        this.meta = null;
    }
    connectedCallback() {
        super.connectedCallback();
        this.loadMeta();
    }
    updated(changedProps) {
        if (changedProps.has('tag')) {
            this.loadMeta();
        }
    }
    loadMeta() {
        this.meta = this.tag ? catalogue.get(this.tag) || null : null;
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
        <div
          class="example-preview"
          ${ref((container) => this.mountPropPreview(container, this.meta.tag, example.props))}
        ></div>
      `;
        }
        return html `
      <div class="example-preview">
        ${unsafeHTML(example.code)}
      </div>
    `;
    }
    renderExample(example) {
        const showPreview = example.showPreview ?? true;
        const showCode = example.showCode ?? true;
        return html `
      <article class="example" id=${example.id}>
        <h3>${example.title}</h3>
        ${example.description ? html `<p>${example.description}</p>` : nothing}
        ${showPreview ? this.renderPreview(example) : nothing}
        ${showCode ? html `<pre class="code">${example.code}</pre>` : nothing}
      </article>
    `;
    }
    renderRelated() {
        if (!this.meta?.relatedComponents?.length) {
            return nothing;
        }
        return html `
      <section>
        <h3>Related Components</h3>
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
                &lt;${related.tag}&gt;
              </a>
            `;
        })}
        </div>
      </section>
    `;
    }
    render() {
        if (!this.meta) {
            return html `
        <div class="demo">
          <div class="error">
            <strong>Widget not found</strong>
            <p>No metadata found for "${this.tag}".</p>
          </div>
        </div>
      `;
        }
        return html `
      <main class="demo">
        <h1>${this.meta.name}</h1>
        <p>${this.meta.description}</p>
        <p><code>&lt;${this.meta.tag}&gt;</code></p>

        <section>
          <h2>Examples</h2>
          ${this.meta.examples.map((example) => this.renderExample(example))}
        </section>

        ${this.renderRelated()}
      </main>
    `;
    }
};
WidgetDemoPage.styles = css `
    :host {
      display: block;
      color: var(--widget-atlas-text, var(--color-text, #162018));
      font-family: var(--widget-atlas-font-body, var(--font-body, "Source Sans 3", system-ui, sans-serif));
      line-height: 1.5;
    }

    .demo {
      max-width: var(--widget-atlas-layout-max, var(--layout-max, 1100px));
      margin: 0 auto;
      padding: var(--widget-atlas-space-lg, var(--space-lg, 1rem));
    }

    .related-components {
      display: flex;
      gap: var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
      flex-wrap: wrap;
      margin-top: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
    }

    .related-link {
      border: 1px solid var(--widget-atlas-border, var(--color-border, #d7ddd5));
      border-radius: var(--widget-atlas-radius-sm, var(--radius-sm, 0.375rem));
      padding: var(--widget-atlas-space-xs, var(--space-xs, 0.25rem))
        var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
      text-decoration: none;
      color: var(--widget-atlas-text, var(--color-text, #162018));
      font-family: var(
        --widget-atlas-font-mono,
        var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)
      );
      font-size: 12px;
    }

    .error {
      color: var(--widget-atlas-danger-text, #b42318);
      border: 1px solid var(--widget-atlas-danger-border, #fecdca);
      border-radius: var(--widget-atlas-radius-md, var(--radius-md, 0.625rem));
      padding: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
      background: var(--widget-atlas-danger-surface, #fef3f2);
    }

    .example {
      border: 1px solid var(--widget-atlas-border, var(--color-border, #d7ddd5));
      border-radius: var(--widget-atlas-radius-md, var(--radius-md, 0.625rem));
      padding: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
      margin-bottom: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
      background: var(--widget-atlas-surface, var(--color-surface, #fff));
    }

    .example-preview {
      border: 1px dashed var(--widget-atlas-border-strong, var(--color-border, #d7ddd5));
      border-radius: var(--widget-atlas-radius-sm, var(--radius-sm, 0.375rem));
      padding: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
      margin-top: var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
      background: var(--widget-atlas-surface-raised, var(--color-surface-raised, #f2f5ef));
    }

    .code {
      background: #111827;
      color: #f9fafb;
      padding: var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
      border-radius: var(--widget-atlas-radius-sm, var(--radius-sm, 0.375rem));
      overflow: auto;
      font-family: var(
        --widget-atlas-font-mono,
        var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)
      );
      font-size: 12px;
      white-space: pre;
    }

    h1 {
      margin: 0;
      font-family: var(
        --widget-atlas-font-display,
        var(--font-display, "DM Serif Display", Georgia, serif)
      );
      font-size: clamp(1.6rem, 3vw, 2.1rem);
    }

    h2 {
      margin-top: var(--widget-atlas-space-lg, var(--space-lg, 1rem));
      margin-bottom: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
      font-size: 1.5rem;
    }

    h3 {
      margin: 0;
      font-size: 1.25rem;
    }
  `;
__decorate([
    property({ type: String })
], WidgetDemoPage.prototype, "tag", void 0);
__decorate([
    state()
], WidgetDemoPage.prototype, "meta", void 0);
WidgetDemoPage = __decorate([
    customElement('widget-demo-page')
], WidgetDemoPage);
export { WidgetDemoPage };
