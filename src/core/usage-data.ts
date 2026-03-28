let widgetUsageData: Record<string, string[]> = {};

export function setWidgetUsageData(usageData: Record<string, string[]>): void {
  widgetUsageData = { ...usageData };
}

export function getWidgetUsageData(): Record<string, string[]> {
  return { ...widgetUsageData };
}

export function clearWidgetUsageData(): void {
  widgetUsageData = {};
}
