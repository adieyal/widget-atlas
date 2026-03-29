import { LitElement } from 'lit';
import type { PropertyDef } from '../core/types.js';
export declare class WidgetPropsTable extends LitElement {
    static styles: import("lit").CSSResult[];
    properties: PropertyDef[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'widget-props-table': WidgetPropsTable;
    }
}
