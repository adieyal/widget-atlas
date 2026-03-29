import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { CssPropertyDef } from '../core/types.js';
import { widgetAtlasThemeStyles } from './shared-styles.js';

@customElement('widget-css-props-table')
export class WidgetCssPropsTable extends LitElement {
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

  @property({ type: Array, attribute: 'css-properties' }) cssProperties: CssPropertyDef[] = [];

  render() {
    return html`
      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${this.cssProperties.map(
              (prop) => html`
                <tr>
                  <td><code>${prop.name}</code></td>
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
    'widget-css-props-table': WidgetCssPropsTable;
  }
}
