import { LitElement } from 'lit';
import type { CssPropertyDef } from '../core/types.js';
export declare class WidgetCssPropsTable extends LitElement {
    static styles: import("lit").CSSResult[];
    cssProperties: CssPropertyDef[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'widget-css-props-table': WidgetCssPropsTable;
    }
}
