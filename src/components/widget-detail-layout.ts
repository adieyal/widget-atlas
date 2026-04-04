import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { widgetAtlasThemeStyles } from './shared-styles.js';

/**
 * Structural shell for detail / reference pages.
 *
 * Renders a 2-column layout (sticky sidebar + main) when the `sidebar` slot
 * is populated; collapses to a single column otherwise. Both `widget-demo-page`
 * and `widget-tag-page` use this layout so they share the same structural chrome.
 *
 * Named slots:
 *   breadcrumb   — optional nav above the header
 *   eyebrow      — optional label pill above the h1
 *   heading      — page title (wrapped in h1)
 *   header-meta  — optional content between h1 and description (e.g. status/meta chips)
 *   description  — optional subtitle / body
 *   sidebar      — optional sticky sidebar (ToC, etc.); omit for single-column
 *   (default)    — main content sections
 *
 * CSS parts:  sidebar · main · header
 *
 * Overridable tokens:
 *   --widget-atlas-detail-sidebar-width   sidebar column width   (default 15rem)
 *   --widget-atlas-detail-max             max width of main col  (default layout-max − 8rem)
 *   --widget-atlas-detail-padding         main col padding       (default 3rem)
 */
@customElement('widget-detail-layout')
export class WidgetDetailLayout extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    css`
      :host {
        display: grid;
        grid-template-columns: var(--_sidebar-width, var(--widget-atlas-detail-sidebar-width, 15rem)) minmax(0, 1fr);
        min-height: 100vh;
        background:
          radial-gradient(circle at top right, rgb(var(--_widget-atlas-tint) / 0.07), transparent 30%),
          linear-gradient(180deg, var(--_widget-atlas-surface-muted), var(--_widget-atlas-surface-end) 18rem);
      }

      :host(.no-sidebar) {
        grid-template-columns: minmax(0, 1fr);
      }

      /* ── Sidebar ── */
      [part='sidebar'] {
        position: sticky;
        top: 0;
        align-self: start;
        height: 100vh;
        overflow-y: auto;
        padding: var(--_widget-atlas-space-2xl) 0;
        border-right: 1px solid var(--_widget-atlas-border);
        background: var(--_widget-atlas-surface);
      }

      .sidebar-hidden {
        display: none;
      }

      /* ── Main column ── */
      [part='main'] {
        max-width: var(--widget-atlas-detail-max, calc(var(--_widget-atlas-layout-max) - 8rem));
        width: 100%;
        padding: var(--widget-atlas-detail-padding, var(--_widget-atlas-space-2xl));
        box-sizing: border-box;
      }

      /* ── Breadcrumb ── */
      .breadcrumb-wrap {
        margin-bottom: var(--_widget-atlas-space-lg);
      }

      .breadcrumb-wrap.hidden { display: none; }

      /* ── Header ── */
      [part='header'] {
        display: flex;
        flex-direction: column;
        gap: var(--_widget-atlas-space-md);
        margin-bottom: var(--_widget-atlas-space-2xl);
        padding-bottom: var(--_widget-atlas-space-xl);
        border-bottom: 1px solid var(--_widget-atlas-border);
      }

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
        max-width: 64rem;
        margin: 0;
        color: var(--_widget-atlas-text-muted);
        font-size: 1.02rem;
      }

      /* Empty-slot wrappers collapse */
      .eyebrow-wrap.hidden,
      .header-meta-wrap.hidden,
      .description-wrap.hidden { display: none; }

      /* ── Responsive ── */
      @media (max-width: 960px) {
        :host {
          grid-template-columns: 1fr;
        }

        [part='sidebar'] {
          position: static;
          height: auto;
          overflow-y: visible;
          padding: var(--_widget-atlas-space-md) var(--_widget-atlas-space-md) 0;
          border-right: none;
          border-bottom: 1px solid var(--_widget-atlas-border);
          background: transparent;
        }
      }
    `,
  ];

  @state() private _populated = new Set<string>();

  firstUpdated(): void {
    this.syncPopulatedSlots();
  }

  private syncPopulatedSlots(): void {
    const next = new Set<string>();
    const slots = Array.from(this.renderRoot.querySelectorAll('slot')) as HTMLSlotElement[];

    for (const slot of slots) {
      const name = slot.name;
      if (!name) {
        continue;
      }

      if (slot.assignedNodes({ flatten: true }).length > 0) {
        next.add(name);
      }
    }

    this._populated = next;
    this.classList.toggle('no-sidebar', !next.has('sidebar'));
  }

  private trackSlot(name: string) {
    return (e: Event) => {
      const slot = e.target as HTMLSlotElement;
      const next = new Set(this._populated);
      if (slot.assignedNodes({ flatten: true }).length > 0) next.add(name);
      else next.delete(name);
      this._populated = next;
      // Toggle host class for the sidebar column — must update host attribute for CSS
      if (name === 'sidebar') {
        this.classList.toggle('no-sidebar', !this._populated.has('sidebar'));
      }
    };
  }

  private has(name: string) { return this._populated.has(name); }

  render() {
    const hasSidebar = this.has('sidebar');

    return html`
      <aside part="sidebar" class="${hasSidebar ? '' : 'sidebar-hidden'}">
        <slot name="sidebar" @slotchange=${this.trackSlot('sidebar')}></slot>
      </aside>

      <div part="main">
        <nav
          class="breadcrumb-wrap ${this.has('breadcrumb') ? '' : 'hidden'}"
          aria-label="Breadcrumb"
        >
          <slot name="breadcrumb" @slotchange=${this.trackSlot('breadcrumb')}></slot>
        </nav>

        <header part="header">
          <div class="eyebrow-wrap ${this.has('eyebrow') ? '' : 'hidden'}">
            <slot name="eyebrow" @slotchange=${this.trackSlot('eyebrow')}></slot>
          </div>

          <h1 class="heading-wrap"><slot name="heading"></slot></h1>

          <div class="header-meta-wrap ${this.has('header-meta') ? '' : 'hidden'}">
            <slot name="header-meta" @slotchange=${this.trackSlot('header-meta')}></slot>
          </div>

          <div class="description-wrap ${this.has('description') ? '' : 'hidden'}">
            <slot name="description" @slotchange=${this.trackSlot('description')}></slot>
          </div>
        </header>

        <main>
          <slot></slot>
        </main>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-detail-layout': WidgetDetailLayout;
  }
}
