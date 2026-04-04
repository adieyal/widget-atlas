import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { widgetAtlasThemeStyles } from './shared-styles.js';

/**
 * Structural shell for list / browse pages.
 *
 * Named slots:
 *   breadcrumb    — optional nav rendered above the header
 *   eyebrow       — optional label pill above the h1
 *   heading       — page title content (wrapped in an h1)
 *   description   — optional subtitle below the h1
 *   header-aside  — optional content beside the header (e.g. a stats grid)
 *   toolbar       — optional search/filter bar between header and content
 *   (default)     — main page content
 *
 * CSS parts:  container · header · toolbar · content
 *
 * Overridable tokens:
 *   --widget-atlas-page-layout-max           max content width
 *   --widget-atlas-page-layout-padding       page padding
 *   --widget-atlas-page-layout-hero-columns  grid columns when header-aside is populated
 */
@customElement('widget-page-layout')
export class WidgetPageLayout extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    css`
      :host {
        display: block;
        min-height: 100vh;
        background: var(--_widget-atlas-page-bg);
        --_layout-max: var(--widget-atlas-page-layout-max, var(--_widget-atlas-layout-max));
        --_layout-pad: var(
          --widget-atlas-page-layout-padding,
          var(--_widget-atlas-space-2xl) var(--_widget-atlas-space-lg)
        );
        --_hero-cols: var(
          --widget-atlas-page-layout-hero-columns,
          minmax(0, 1.5fr) minmax(18rem, 1fr)
        );
      }

      [part='container'] {
        max-width: var(--_layout-max);
        margin: 0 auto;
        padding: var(--_layout-pad);
        box-sizing: border-box;
      }

      /* ── Breadcrumb ── */
      .breadcrumb-wrap {
        margin-bottom: var(--_widget-atlas-space-lg);
      }

      .breadcrumb-wrap.hidden { display: none; }

      /* ── Header ── */
      [part='header'] {
        margin-bottom: var(--_widget-atlas-space-2xl);
        padding-bottom: var(--_widget-atlas-space-xl);
        border-bottom: 1px solid var(--_widget-atlas-border);
      }

      /* Two-column hero when header-aside is populated */
      [part='header'].has-aside {
        display: grid;
        grid-template-columns: var(--_hero-cols);
        align-items: end;
        gap: var(--_widget-atlas-space-xl);
      }

      .header-content {
        display: flex;
        flex-direction: column;
        gap: var(--_widget-atlas-space-sm);
      }

      .header-aside-wrap.hidden { display: none; }

      /* ── Heading ── */
      .heading-wrap {
        margin: 0;
        font-family: var(--_widget-atlas-title-font-family);
        font-size: clamp(2rem, 4vw, 3rem);
        line-height: 0.98;
        letter-spacing: -0.04em;
      }

      /* ── Slotted helpers ── */
      ::slotted([slot='eyebrow']) {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.32rem 0.7rem;
        border-radius: 999px;
        background: var(--_widget-atlas-accent-soft);
        color: var(--_widget-atlas-accent-strong);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      ::slotted([slot='description']) {
        max-width: 40rem;
        margin: 0;
        color: var(--_widget-atlas-text-muted);
        font-size: 1.02rem;
      }

      /* ── Toolbar ── */
      [part='toolbar'] {
        margin-bottom: var(--_widget-atlas-space-xl);
      }

      [part='toolbar'].hidden { display: none; }

      @media (max-width: 900px) {
        [part='header'].has-aside {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 640px) {
        :host {
          --_layout-pad: var(
            --widget-atlas-page-layout-padding,
            var(--_widget-atlas-space-xl) var(--_widget-atlas-space-md)
          );
        }
      }
    `,
  ];

  @property({ type: String, attribute: 'breadcrumb-label' }) breadcrumbLabel = 'Breadcrumb';
  @property({ type: Boolean, attribute: 'force-header-aside' }) forceHeaderAside = false;

  @state() private _populated = new Set<string>();

  protected firstUpdated(): void {
    this.syncPopulatedSlots();
  }

  private syncPopulatedSlots(): void {
    const next = new Set<string>();
    const slots = this.renderRoot.querySelectorAll('slot');

    slots.forEach((slot) => {
      const name = slot.name;
      if (name && slot.assignedNodes({ flatten: true }).length > 0) {
        next.add(name);
      }
    });

    this._populated = next;
  }

  private trackSlot(name: string) {
    return (e: Event) => {
      const slot = e.target as HTMLSlotElement;
      const next = new Set(this._populated);
      if (slot.assignedNodes({ flatten: true }).length > 0) next.add(name);
      else next.delete(name);
      this._populated = next;
    };
  }

  private has(name: string) { return this._populated.has(name); }

  render() {
    const hasAside = this.forceHeaderAside || this.has('header-aside');
    const hasToolbar = this.has('toolbar');

    return html`
      <div part="container">
        <nav
          class="breadcrumb-wrap ${this.has('breadcrumb') ? '' : 'hidden'}"
          aria-label=${this.breadcrumbLabel}
        >
          <slot name="breadcrumb" @slotchange=${this.trackSlot('breadcrumb')}></slot>
        </nav>

        <header part="header" class="${hasAside ? 'has-aside' : ''}">
          <div class="header-content">
            <slot name="eyebrow" @slotchange=${this.trackSlot('eyebrow')}></slot>
            <h1 class="heading-wrap"><slot name="heading"></slot></h1>
            <slot name="description" @slotchange=${this.trackSlot('description')}></slot>
          </div>
          <div class="header-aside-wrap ${hasAside ? '' : 'hidden'}">
            <slot name="header-aside" @slotchange=${this.trackSlot('header-aside')}></slot>
          </div>
        </header>

        <div part="toolbar" class="${hasToolbar ? '' : 'hidden'}">
          <slot name="toolbar" @slotchange=${this.trackSlot('toolbar')}></slot>
        </div>

        <main part="content">
          <slot></slot>
        </main>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-page-layout': WidgetPageLayout;
  }
}
