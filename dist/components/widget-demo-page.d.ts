import { LitElement } from 'lit';
export declare class WidgetDemoPage extends LitElement {
    static styles: import("lit").CSSResult;
    tag: string;
    private meta;
    connectedCallback(): void;
    updated(changedProps: Map<string, unknown>): void;
    private loadMeta;
    private mountPropPreview;
    private renderPreview;
    private renderExample;
    private renderRelated;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'widget-demo-page': WidgetDemoPage;
    }
}
