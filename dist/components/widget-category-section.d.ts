import { LitElement, nothing } from 'lit';
import type { WidgetMetadata } from '../core/types.js';
import './widget-card.js';
export declare class WidgetCategorySection extends LitElement {
    static styles: import("lit").CSSResult[];
    heading: string;
    description: string;
    widgets: WidgetMetadata[];
    getWidgetUrl: (widget: WidgetMetadata) => string;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        'widget-category-section': WidgetCategorySection;
    }
}
