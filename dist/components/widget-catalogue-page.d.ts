import { LitElement } from 'lit';
import './widget-search.js';
export declare class WidgetCataloguePage extends LitElement {
    static styles: import("lit").CSSResult;
    private searchQuery;
    private searchResults;
    private isSearching;
    private get stats();
    private get groupedWidgets();
    private handleSearch;
    private clearSearch;
    private renderCard;
    private renderSearchResults;
    private renderCategories;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'widget-catalogue-page': WidgetCataloguePage;
    }
}
