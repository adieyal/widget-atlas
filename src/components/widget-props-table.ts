import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PropertyDef } from '../core/types.js';
import { widgetAtlasThemeStyles } from './shared-styles.js';

@customElement('widget-props-table')
export class WidgetPropsTable extends LitElement {
  static styles = [
    widgetAtlasThemeStyles,
    css`
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
        min-width: 42rem;
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
      }

      .badge--required {
        background: var(--_widget-atlas-accent-soft);
        color: var(--_widget-atlas-accent-strong);
      }

      .badge--deprecated {
        background: var(--_widget-atlas-danger-soft);
        color: var(--_widget-atlas-danger);
      }
    `,
  ];

  @property({ type: Array }) properties: PropertyDef[] = [];

  render() {
    return html`
      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${this.properties.map(
              (prop) => html`
                <tr>
                  <td>
                    <code>${prop.name}</code>
                    ${(prop.required || prop.deprecated)
                      ? html`
                          <div class="badges">
                            ${prop.required ? html`<span class="badge badge--required">Required</span>` : ''}
                            ${prop.deprecated
                              ? html`<span class="badge badge--deprecated">Deprecated</span>`
                              : ''}
                          </div>
                        `
                      : ''}
                  </td>
                  <td><code>${prop.type}</code></td>
                  <td><code>${prop.default}</code></td>
                  <td>${prop.description}</td>
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
    'widget-props-table': WidgetPropsTable;
  }
}
