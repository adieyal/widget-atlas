import type { Category } from './types.js';
export interface WidgetRouteRef {
    tag: string;
    category: Category;
}
export type WidgetUrlBuilder = (widget: WidgetRouteRef) => string;
export declare const defaultWidgetUrlBuilder: WidgetUrlBuilder;
export declare function setWidgetUrlBuilder(builder?: WidgetUrlBuilder): void;
export declare function getWidgetUrlBuilder(): WidgetUrlBuilder;
export declare function buildWidgetUrl(widget: WidgetRouteRef): string;
