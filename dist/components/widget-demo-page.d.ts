import { LitElement } from 'lit';
import './widget-code-block.js';
import './widget-css-props-table.js';
import './widget-events-table.js';
import './widget-preview.js';
import './widget-props-table.js';
import './widget-slots-table.js';
export declare class WidgetDemoPage extends LitElement {
    static styles: import("lit").CSSResult[];
    tag: string;
    catalogueHref: string;
    private meta;
    private activeSectionId;
    private sectionObserver;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changedProps: Map<string, unknown>): void;
    private loadMeta;
    private setupScrollSpy;
    private mountPropPreview;
    private renderPreview;
    private renderExample;
    private renderUsageGuidelines;
    private renderApiReference;
    private renderRelated;
    private renderSection;
    private buildTocSections;
    private renderSidebar;
    private renderHeader;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'widget-demo-page': WidgetDemoPage;
    }
}
