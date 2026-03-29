import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { EventDef } from '../core/types.js';
import { widgetAtlasThemeStyles } from './shared-styles.js';

@customElement('widget-events-table')
export class WidgetEventsTable extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    css`
      :host {
        display: block;
      }

      .table-shell {
        overflow: auto;
        border: 1px solid var(--widget-atlas-border);
        border-radius: var(--widget-atlas-radius-md);
        background: var(--widget-atlas-surface);
      }

      table {
        width: 100%;
        min-width: 38rem;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--widget-atlas-border);
        text-align: left;
        vertical-align: top;
      }

      th {
        background: var(--widget-atlas-surface-muted);
        color: var(--widget-atlas-text);
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      td {
        color: var(--widget-atlas-text-muted);
        font-size: 0.92rem;
      }

      tr:last-child td {
        border-bottom: none;
      }

      code {
        font-family: var(
          --widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.82rem;
        color: var(--widget-atlas-text);
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
        background: var(--widget-atlas-surface-muted);
        color: var(--widget-atlas-text-soft);
      }
    `,
  ];

  @property({ type: Array }) events: EventDef[] = [];

  render() {
    return html`
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
            ${this.events.map(
              (event) => html`
                <tr>
                  <td>
                    <code>${event.name}</code>
                    ${(event.bubbles || event.composed)
                      ? html`
                          <div class="badges">
                            ${event.bubbles ? html`<span class="badge">Bubbles</span>` : ''}
                            ${event.composed ? html`<span class="badge">Composed</span>` : ''}
                          </div>
                        `
                      : ''}
                  </td>
                  <td><code>${event.detail}</code></td>
                  <td>${event.description}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-events-table': WidgetEventsTable;
  }
}
