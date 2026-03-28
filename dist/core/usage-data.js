let widgetUsageData = {};
export function setWidgetUsageData(usageData) {
    widgetUsageData = { ...usageData };
}
export function getWidgetUsageData() {
    return { ...widgetUsageData };
}
export function clearWidgetUsageData() {
    widgetUsageData = {};
}
