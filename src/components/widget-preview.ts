import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { widgetAtlasControlStyles, widgetAtlasThemeStyles } from './shared-styles.js';

type DeviceType = 'mobile' | 'mobile-lg' | 'tablet' | 'laptop' | 'desktop';

const DEVICE_PRESETS: Array<{ id: DeviceType; label: string; width: number | null }> = [
  { id: 'mobile', label: 'Mobile', width: 375 },
  { id: 'mobile-lg', label: 'Mobile L', width: 428 },
  { id: 'tablet', label: 'Tablet', width: 768 },
  { id: 'laptop', label: 'Laptop', width: 1024 },
  { id: 'desktop', label: 'Desktop', width: null },
];

@customElement('widget-preview')
export class WidgetPreview extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    widgetAtlasControlStyles,
    css`
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

  @property({ type: String }) code = '';
  @property({ type: Boolean, attribute: 'show-device-selector' }) showDeviceSelector = false;
  @property({ type: Boolean, attribute: 'show-width-control' }) showWidthControl = false;
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;
  @property({ type: Number, attribute: 'initial-width' }) initialWidth = 960;
  @property({ type: Number, attribute: 'min-width' }) minWidth = 280;
  @property({ type: Number, attribute: 'max-width' }) maxWidth = 1280;
  @property({ type: Boolean, attribute: 'use-slot' }) useSlot = false;

  @state() private device: DeviceType = 'desktop';
  @state() private previewWidth = 960;

  @query('.preview-frame') private previewFrame?: HTMLDivElement;

  connectedCallback(): void {
    super.connectedCallback();
    this.previewWidth = this.initialWidth;
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('code') && !this.useSlot) {
      this.executeInlineScripts();
    }
  }

  protected firstUpdated(): void {
    const links = document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]');
    for (const link of links) {
      this.shadowRoot?.appendChild(link.cloneNode(true));
    }
  }

  private executeInlineScripts(): void {
    const frame = this.previewFrame;
    if (!frame) {
      return;
    }

    const scripts = frame.querySelectorAll<HTMLScriptElement>('script');
    scripts.forEach((script) => {
      const source = script.textContent?.trim();
      script.remove();
      if (!source) {
        return;
      }

      try {
        const runDemoScript = new Function('demoRoot', source) as (demoRoot: HTMLElement) => void;
        runDemoScript(frame);
      } catch (error) {
        console.error('[widget-preview] Failed to execute inline demo script.', error);
      }
    });
  }

  private setDevice(device: DeviceType): void {
    this.device = device;
    const preset = DEVICE_PRESETS.find((item) => item.id === device);
    if (preset?.width) {
      this.previewWidth = preset.width;
    } else if (device === 'desktop') {
      this.previewWidth = this.initialWidth;
    }
    this.requestUpdate();
  }

  private onWidthInput(event: Event): void {
    this.previewWidth = Number((event.target as HTMLInputElement).value);
    this.requestUpdate();
  }

  private onPresetClick(event: Event): void {
    const button = event.currentTarget as HTMLButtonElement | null;
    const device = button?.dataset.device as DeviceType | undefined;
    if (!device) {
      return;
    }

    this.setDevice(device);
  }

  render() {
    const frameStyles = styleMap({
      '--widget-atlas-preview-width': this.fullWidth ? '100%' : `${this.previewWidth}px`,
    });

    return html`
      <div class="preview-shell">
        ${(this.showDeviceSelector || (this.showWidthControl && !this.fullWidth))
          ? html`
              <div class="preview-toolbar">
                ${this.showDeviceSelector
                  ? html`
                      <div class="toolbar-group">
                        <span class="toolbar-label">Preview</span>
                        ${DEVICE_PRESETS.map(
                          (preset) => html`
                            <button
                              class="control-button preset-button ${this.device === preset.id ? 'is-active' : ''}"
                              data-device=${preset.id}
                              @click=${this.onPresetClick}
                              type="button"
                            >
                              ${preset.label}
                              ${preset.width
                                ? html`<span class="preset-size">${preset.width}px</span>`
                                : nothing}
                            </button>
                          `
                        )}
                      </div>
                    `
                  : nothing}

                ${this.showWidthControl && !this.fullWidth
                  ? html`
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
            ${this.useSlot ? html`<slot></slot>` : unsafeHTML(this.code)}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-preview': WidgetPreview;
  }
}
