var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { widgetAtlasThemeStyles } from './shared-styles.js';
let WidgetSlotsTable = class WidgetSlotsTable extends LitElement {
    constructor() {
        super(...arguments);
        this.slots = [];
    }
    render() {
        return html `
      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th>Slot</th>
              <th>Description</th>
              <th>Accepts</th>
            </tr>
          </thead>
          <tbody>
            ${this.slots.map((slot) => html `
                <tr>
                  <td><code>${slot.name || 'default'}</code></td>
                  <td>${slot.description}</td>
                  <td>${slot.accepts || 'Any content'}</td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    `;
    }
};
WidgetSlotsTable.styles = [
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
        min-width: 34rem;
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
    `,
];
__decorate([
    property({ type: Array })
], WidgetSlotsTable.prototype, "slots", void 0);
WidgetSlotsTable = __decorate([
    customElement('widget-slots-table')
], WidgetSlotsTable);
export { WidgetSlotsTable };
