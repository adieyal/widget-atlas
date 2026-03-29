import { LitElement } from 'lit';
export declare class WidgetCodeBlock extends LitElement {
    static styles: import("lit").CSSResult[];
    code: string;
    language: string;
    collapsible: boolean;
    collapseThreshold: number;
    private copied;
    private collapsed;
    private copiedTimer;
    disconnectedCallback(): void;
    private get shouldCollapse();
    private copyCode;
    private toggleCollapsed;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'widget-code-block': WidgetCodeBlock;
    }
}
