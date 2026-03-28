import type { Category } from './types.js';

export interface WidgetRouteRef {
  tag: string;
  category: Category;
}

export type WidgetUrlBuilder = (widget: WidgetRouteRef) => string;

export const defaultWidgetUrlBuilder: WidgetUrlBuilder = (widget) =>
  `/widgets/${widget.category}/${widget.tag}/`;

let widgetUrlBuilder: WidgetUrlBuilder = defaultWidgetUrlBuilder;

export function setWidgetUrlBuilder(builder?: WidgetUrlBuilder): void {
  widgetUrlBuilder = builder || defaultWidgetUrlBuilder;
}

export function getWidgetUrlBuilder(): WidgetUrlBuilder {
  return widgetUrlBuilder;
}

export function buildWidgetUrl(widget: WidgetRouteRef): string {
  return widgetUrlBuilder(widget);
}
