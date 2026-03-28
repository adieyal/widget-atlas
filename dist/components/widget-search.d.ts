import { LitElement } from 'lit';
import type { WidgetMetadata, Category, Status, SearchOptions, UseCase } from '../core/types.js';
export interface WidgetSearchResultsDetail {
    results: WidgetMetadata[];
    query: string;
    filters: SearchOptions;
}
export declare class WidgetSearch extends LitElement {
    static styles: import("lit").CSSResult;
    query: string;
    useCase: UseCase | '';
    category: Category | '';
    status: Status | '';
    debounceDelay: number;
    showCategoryFilter: boolean;
    showStatusFilter: boolean;
    placeholder: string;
    private results;
    private debounceTimer;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private performSearch;
    private onQueryInput;
    private onCategoryChange;
    private onStatusChange;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'widget-search': WidgetSearch;
    }
}
