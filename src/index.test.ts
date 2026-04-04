import { catalogue, registerWidgets, setWidgetUrlBuilder } from './index.js';
import type { WidgetListingSection } from './index.js';
import * as widgetAtlas from './index.js';

describe('widget-atlas package root', () => {
  test('exports the core runtime surface', () => {
    expect(catalogue).toBeDefined();
    expect(registerWidgets).toBeDefined();
    expect(setWidgetUrlBuilder).toBeDefined();
    expect(widgetAtlas.setWidgetUsageData).toBeUndefined();
  });

  test('exports the widget listing section type from the package root', () => {
    const section: WidgetListingSection = {
      id: 'behavior',
      heading: 'Behavior',
      widgets: [],
    };

    expect(section.heading).toBe('Behavior');
  });
});
