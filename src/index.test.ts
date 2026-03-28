import { catalogue, registerWidgets, setWidgetUrlBuilder } from './index.js';
import * as widgetAtlas from './index.js';

describe('widget-atlas package root', () => {
  test('exports the core runtime surface', () => {
    expect(catalogue).toBeDefined();
    expect(registerWidgets).toBeDefined();
    expect(setWidgetUrlBuilder).toBeDefined();
    expect(widgetAtlas.setWidgetUsageData).toBeUndefined();
  });
});
