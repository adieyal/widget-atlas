export const defaultWidgetUrlBuilder = (widget) => `/widgets/${widget.category}/${widget.tag}/`;
let widgetUrlBuilder = defaultWidgetUrlBuilder;
export function setWidgetUrlBuilder(builder) {
    widgetUrlBuilder = builder || defaultWidgetUrlBuilder;
}
export function getWidgetUrlBuilder() {
    return widgetUrlBuilder;
}
export function buildWidgetUrl(widget) {
    return widgetUrlBuilder(widget);
}
