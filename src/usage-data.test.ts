import {
  clearWidgetUsageData,
  getWidgetUsageData,
  setWidgetUsageData,
} from './index.js';

describe('widget usage data', () => {
  beforeEach(() => {
    clearWidgetUsageData();
  });

  test('stores and returns usage paths by tag', () => {
    setWidgetUsageData({
      'rs-button': ['templates/dashboard.html'],
    });

    expect(getWidgetUsageData()).toEqual({
      'rs-button': ['templates/dashboard.html'],
    });
  });

  test('replaces usage data deterministically', () => {
    setWidgetUsageData({
      'rs-button': ['templates/dashboard.html'],
    });

    setWidgetUsageData({
      'rs-card': ['templates/report.html'],
    });

    expect(getWidgetUsageData()).toEqual({
      'rs-card': ['templates/report.html'],
    });
  });
});
