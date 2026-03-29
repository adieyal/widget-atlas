import { LitElement } from 'lit';
import type { EventDef } from '../core/types.js';
export declare class WidgetEventsTable extends LitElement {
    static styles: import("lit").CSSResult[];
    events: EventDef[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'widget-events-table': WidgetEventsTable;
    }
}
