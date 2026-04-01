import { LitElement } from 'lit';
import type { Level, Status } from '../core/types.js';
export declare class WidgetCard extends LitElement {
    static styles: import("lit").CSSResult[];
    name: string;
    tag: string;
    description: string;
    href: string;
    status?: Status;
    level?: Level;
    private resizeObserver?;
    private readonly handleWindowResize;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    updated(): void;
    private setupHeaderWrapObserver;
    private updateHeaderWrapState;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'widget-card': WidgetCard;
    }
}
