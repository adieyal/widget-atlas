var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { widgetAtlasThemeStyles } from './shared-styles.js';
let WidgetEventsTable = class WidgetEventsTable extends LitElement {
    constructor() {
        super(...arguments);
        this.events = [];
    }
    render() {
        return html `
      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Detail</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${this.events.map((event) => html `
                <tr>
                  <td>
                    <code>${event.name}</code>
                    ${(event.bubbles || event.composed)
            ? html `
                          <div class="badges">
                            ${event.bubbles ? html `<span class="badge">Bubbles</span>` : ''}
                            ${event.composed ? html `<span class="badge">Composed</span>` : ''}
                          </div>
                        `
            : ''}
                  </td>
                  <td><code>${event.detail}</code></td>
                  <td>${event.description}</td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    `;
    }
};
WidgetEventsTable.styles = [
    widgetAtlasThemeStyles,
    css `
      :host {
        display: block;
      }

      .table-shell {
        overflow: auto;
        border: 1px solid var(--_widget-atlas-border);
        border-radius: var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-surface);
      }

      table {
        width: 100%;
        min-width: 38rem;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--_widget-atlas-border);
        text-align: left;
        vertical-align: top;
      }

      th {
        background: var(--_widget-atlas-surface-muted);
        color: var(--_widget-atlas-text);
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      td {
        color: var(--_widget-atlas-text-muted);
        font-size: 0.92rem;
      }

      tr:last-child td {
        border-bottom: none;
      }

      code {
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.82rem;
        color: var(--_widget-atlas-text);
      }

      .badges {
        display: flex;
        gap: 0.35rem;
        flex-wrap: wrap;
        margin-top: 0.35rem;
      }

      .badge {
        padding: 0.12rem 0.38rem;
        border-radius: 999px;
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        background: var(--_widget-atlas-surface-muted);
        color: var(--_widget-atlas-text-soft);
      }
    `,
];
__decorate([
    property({ type: Array })
], WidgetEventsTable.prototype, "events", void 0);
WidgetEventsTable = __decorate([
    customElement('widget-events-table')
], WidgetEventsTable);
export { WidgetEventsTable };
