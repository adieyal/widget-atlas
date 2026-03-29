var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { widgetAtlasControlStyles, widgetAtlasThemeStyles } from './shared-styles.js';
const DEVICE_PRESETS = [
    { id: 'mobile', label: 'Mobile', width: 375 },
    { id: 'mobile-lg', label: 'Mobile L', width: 428 },
    { id: 'tablet', label: 'Tablet', width: 768 },
    { id: 'laptop', label: 'Laptop', width: 1024 },
    { id: 'desktop', label: 'Desktop', width: null },
];
let WidgetPreview = class WidgetPreview extends LitElement {
    constructor() {
        super(...arguments);
        this.code = '';
        this.showDeviceSelector = false;
        this.showWidthControl = false;
        this.fullWidth = false;
        this.initialWidth = 960;
        this.minWidth = 280;
        this.maxWidth = 1280;
        this.useSlot = false;
        this.device = 'desktop';
        this.previewWidth = 960;
    }
    connectedCallback() {
        super.connectedCallback();
        this.previewWidth = this.initialWidth;
    }
    updated(changed) {
        if (changed.has('code') && !this.useSlot) {
            this.executeInlineScripts();
        }
    }
    firstUpdated() {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        for (const link of links) {
            this.shadowRoot?.appendChild(link.cloneNode(true));
        }
    }
    executeInlineScripts() {
        const frame = this.previewFrame;
        if (!frame) {
            return;
        }
        const scripts = frame.querySelectorAll('script');
        scripts.forEach((script) => {
            const source = script.textContent?.trim();
            script.remove();
            if (!source) {
                return;
            }
            try {
                const runDemoScript = new Function('demoRoot', source);
                runDemoScript(frame);
            }
            catch (error) {
                console.error('[widget-preview] Failed to execute inline demo script.', error);
            }
        });
    }
    setDevice(device) {
        this.device = device;
        const preset = DEVICE_PRESETS.find((item) => item.id === device);
        if (preset?.width) {
            this.previewWidth = preset.width;
        }
        else if (device === 'desktop') {
            this.previewWidth = this.initialWidth;
        }
        this.requestUpdate();
    }
    onWidthInput(event) {
        this.previewWidth = Number(event.target.value);
        this.requestUpdate();
    }
    onPresetClick(event) {
        const button = event.currentTarget;
        const device = button?.dataset.device;
        if (!device) {
            return;
        }
        this.setDevice(device);
    }
    render() {
        const frameStyles = styleMap({
            '--widget-atlas-preview-width': this.fullWidth ? '100%' : `${this.previewWidth}px`,
        });
        return html `
      <div class="preview-shell">
        ${(this.showDeviceSelector || (this.showWidthControl && !this.fullWidth))
            ? html `
              <div class="preview-toolbar">
                ${this.showDeviceSelector
                ? html `
                      <div class="toolbar-group">
                        <span class="toolbar-label">Preview</span>
                        ${DEVICE_PRESETS.map((preset) => html `
                            <button
                              class="control-button preset-button ${this.device === preset.id ? 'is-active' : ''}"
                              data-device=${preset.id}
                              @click=${this.onPresetClick}
                              type="button"
                            >
                              ${preset.label}
                              ${preset.width
                    ? html `<span class="preset-size">${preset.width}px</span>`
                    : nothing}
                            </button>
                          `)}
                      </div>
                    `
                : nothing}

                ${this.showWidthControl && !this.fullWidth
                ? html `
                      <div class="range-row">
                        <span class="toolbar-label">Container</span>
                        <input
                          class="width-input"
                          name="preview-width"
                          type="range"
                          min=${String(this.minWidth)}
                          max=${String(this.maxWidth)}
                          .value=${String(this.previewWidth)}
                          @input=${this.onWidthInput}
                          @change=${this.onWidthInput}
                        />
                        <span class="width-value">${this.previewWidth}px</span>
                      </div>
                    `
                : nothing}
              </div>
            `
            : nothing}

        <div class="preview-canvas">
          <div
            class="preview-frame ${this.fullWidth ? 'is-full-width' : ''}"
            data-device=${this.device}
            style=${frameStyles}
          >
            ${this.useSlot ? html `<slot></slot>` : unsafeHTML(this.code)}
          </div>
        </div>
      </div>
    `;
    }
};
WidgetPreview.styles = [
    widgetAtlasThemeStyles,
    widgetAtlasControlStyles,
    css `
      :host {
        display: block;
      }

      .preview-shell {
        overflow: hidden;
        border: 1px solid var(--widget-atlas-border);
        border-radius: var(--widget-atlas-radius-md);
        background: var(--widget-atlas-surface);
        box-shadow: var(--widget-atlas-shadow-sm);
      }

      .preview-toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: var(--widget-atlas-space-sm) var(--widget-atlas-space-md);
        padding: var(--widget-atlas-space-sm) var(--widget-atlas-space-md);
        border-bottom: 1px solid var(--widget-atlas-border);
        background:
          linear-gradient(180deg, rgb(255 255 255 / 0.75), transparent),
          var(--widget-atlas-surface-muted);
      }

      .toolbar-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--widget-atlas-space-xs);
      }

      .toolbar-label {
        color: var(--widget-atlas-text-muted);
        font-size: 0.77rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .preset-button {
        min-height: 2rem;
        padding: 0.4rem 0.7rem;
        font-size: 0.76rem;
      }

      .preset-button.is-active {
        border-color: color-mix(in srgb, var(--widget-atlas-accent) 36%, white);
        background: var(--widget-atlas-accent-soft);
        color: var(--widget-atlas-accent-strong);
      }

      .preset-size {
        color: var(--widget-atlas-text-soft);
        font-family: var(
          --widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.7rem;
      }

      .range-row {
        display: flex;
        align-items: center;
        gap: var(--widget-atlas-space-sm);
        min-width: min(100%, 18rem);
      }

      .width-input {
        flex: 1;
      }

      .width-value {
        min-width: 4rem;
        color: var(--widget-atlas-text-soft);
        font-family: var(
          --widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.8rem;
        text-align: right;
      }

      .preview-canvas {
        padding: var(--widget-atlas-space-lg);
        background:
          linear-gradient(90deg, rgb(23 34 24 / 0.03) 1px, transparent 1px),
          linear-gradient(rgb(23 34 24 / 0.03) 1px, transparent 1px),
          var(--widget-atlas-surface-muted);
        background-size: 24px 24px;
      }

      .preview-frame {
        width: min(100%, var(--widget-atlas-preview-width, 100%));
        min-height: 6rem;
        margin: 0 auto;
        padding: var(--widget-atlas-space-lg);
        border-radius: var(--widget-atlas-radius-sm);
        border: 1px dashed var(--widget-atlas-border-strong);
        background: var(--widget-atlas-surface);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: var(--widget-atlas-space-sm);
        box-sizing: border-box;
        transition: width 180ms ease;
      }

      .preview-frame.is-full-width {
        width: 100%;
      }

      .preview-frame.is-full-width > * {
        width: 100%;
      }

      @media (max-width: 820px) {
        .preview-toolbar {
          align-items: stretch;
        }

        .toolbar-group,
        .range-row {
          width: 100%;
        }
      }
    `,
];
__decorate([
    property({ type: String })
], WidgetPreview.prototype, "code", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-device-selector' })
], WidgetPreview.prototype, "showDeviceSelector", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-width-control' })
], WidgetPreview.prototype, "showWidthControl", void 0);
__decorate([
    property({ type: Boolean, attribute: 'full-width' })
], WidgetPreview.prototype, "fullWidth", void 0);
__decorate([
    property({ type: Number, attribute: 'initial-width' })
], WidgetPreview.prototype, "initialWidth", void 0);
__decorate([
    property({ type: Number, attribute: 'min-width' })
], WidgetPreview.prototype, "minWidth", void 0);
__decorate([
    property({ type: Number, attribute: 'max-width' })
], WidgetPreview.prototype, "maxWidth", void 0);
__decorate([
    property({ type: Boolean, attribute: 'use-slot' })
], WidgetPreview.prototype, "useSlot", void 0);
__decorate([
    state()
], WidgetPreview.prototype, "device", void 0);
__decorate([
    state()
], WidgetPreview.prototype, "previewWidth", void 0);
__decorate([
    query('.preview-frame')
], WidgetPreview.prototype, "previewFrame", void 0);
WidgetPreview = __decorate([
    customElement('widget-preview')
], WidgetPreview);
export { WidgetPreview };
