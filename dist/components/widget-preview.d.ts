import { LitElement } from 'lit';
export declare class WidgetPreview extends LitElement {
    static styles: import("lit").CSSResult[];
    code: string;
    showDeviceSelector: boolean;
    showWidthControl: boolean;
    fullWidth: boolean;
    initialWidth: number;
    minWidth: number;
    maxWidth: number;
    useSlot: boolean;
    private device;
    private previewWidth;
    private previewFrame?;
    connectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    protected firstUpdated(): void;
    private executeInlineScripts;
    private setDevice;
    private onWidthInput;
    private onPresetClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'widget-preview': WidgetPreview;
    }
}
