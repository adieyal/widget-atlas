import { LitElement } from 'lit';
import type { SlotDef } from '../core/types.js';
export declare class WidgetSlotsTable extends LitElement {
    static styles: import("lit").CSSResult[];
    slots: SlotDef[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'widget-slots-table': WidgetSlotsTable;
    }
}
