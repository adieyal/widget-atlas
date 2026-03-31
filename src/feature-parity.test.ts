import { catalogue } from './core/catalogue.js';
import { WidgetCard } from './components/widget-card.js';
import { WidgetCataloguePage } from './components/widget-catalogue-page.js';
import { WidgetCategorySection } from './components/widget-category-section.js';
import { WidgetSearch } from './components/widget-search.js';
import { setWidgetUrlBuilder } from './core/url-strategy.js';
import type { WidgetMetadata } from './core/types.js';
import { widgetAtlasThemeStyles } from './components/shared-styles.js';

import './elements.js';

function makeMeta(overrides: Partial<WidgetMetadata> = {}): WidgetMetadata {
  return {
    tag: 'rs-button',
    name: 'RS Button',
    description: 'Button component',
    category: 'atoms',
    useCase: 'buttons',
    level: 'atom',
    status: 'stable',
    version: '1.2.3',
    properties: [
      {
        name: 'variant',
        type: "'primary' | 'secondary'",
        default: "'primary'",
        description: 'Visual appearance variant.',
      },
    ],
    events: [
      {
        name: 'rs-click',
        detail: '{ source: string }',
        description: 'Fired when the button is activated.',
        bubbles: true,
        composed: true,
      },
    ],
    slots: [
      {
        name: '',
        description: 'Main label content.',
        accepts: 'Text or inline content',
      },
    ],
    cssProperties: [
      {
        name: '--rs-button-bg',
        default: '#0a5c36',
        description: 'Primary button background.',
      },
    ],
    parts: [],
    usageGuidelines: {
      do: ['Use concise labels.'],
      dont: ['Use more than one primary action in the same area.'],
      notes: ['Pair with a descriptive loading state when work takes time.'],
    },
    examples: [
      {
        id: 'basic',
        title: 'Basic',
        description: 'Default button preview.',
        code: '<button type="button" data-testid="preview-button">Preview</button>',
      },
    ],
    relatedComponents: ['rs-link'],
    ...overrides,
  };
}

describe('widget-atlas parity surface', () => {
  beforeEach(() => {
    catalogue.clear();
    setWidgetUrlBuilder();
    document.body.innerHTML = '';
    sessionStorage.clear();
  });

  test('widget-search exposes generic use-case, category, and status filters', async () => {
    catalogue.register(makeMeta());
    catalogue.register(
      makeMeta({
        tag: 'rs-table',
        name: 'RS Table',
        description: 'Table component',
        category: 'organisms',
        useCase: 'data-display',
        level: 'organism',
        status: 'beta',
      })
    );

    const el = document.createElement('widget-search') as HTMLElement & {
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const useCaseSelect = el.shadowRoot.querySelector(
      'select[name="use-case"]'
    ) as HTMLSelectElement | null;
    const categorySelect = el.shadowRoot.querySelector(
      'select[name="category"]'
    ) as HTMLSelectElement | null;
    const statusSelect = el.shadowRoot.querySelector(
      'select[name="status"]'
    ) as HTMLSelectElement | null;

    expect(useCaseSelect).toBeTruthy();
    expect(categorySelect).toBeTruthy();
    expect(statusSelect).toBeTruthy();

    const detail = await new Promise<{
      results: WidgetMetadata[];
      filters: { useCase?: string; category?: string; status?: string };
    }>((resolve) => {
      el.addEventListener(
        'widget-search-results',
        (event) => resolve((event as CustomEvent).detail),
        { once: true }
      );

      useCaseSelect!.value = 'data-display';
      useCaseSelect!.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    });

    expect(detail.filters.useCase).toBe('data-display');
    expect(detail.results.map((widget) => widget.tag)).toEqual(['rs-table']);
  });

  test('shared theme styles resolve public tokens through internal defaults', () => {
    expect(widgetAtlasThemeStyles.cssText).toContain('--_widget-atlas-surface: var(--widget-atlas-surface, #ffffff);');
    expect(widgetAtlasThemeStyles.cssText).not.toContain(
      '--widget-atlas-surface: var(--widget-atlas-surface, #ffffff);'
    );
  });

  test('catalogue primitives expose theme hooks for page, search, section, and card chrome', () => {
    expect(widgetAtlasThemeStyles.cssText).toContain('--_widget-atlas-page-bg: var(');
    expect(widgetAtlasThemeStyles.cssText).toContain('--widget-atlas-page-bg,');
    expect(widgetAtlasThemeStyles.cssText).toContain('--_widget-atlas-search-toolbar-bg: var(');
    expect(widgetAtlasThemeStyles.cssText).toContain('--widget-atlas-search-toolbar-bg,');
    expect(widgetAtlasThemeStyles.cssText).toContain('--_widget-atlas-title-font-family: var(');
    expect(widgetAtlasThemeStyles.cssText).toContain('--widget-atlas-title-font-family,');
    expect(widgetAtlasThemeStyles.cssText).toContain('--_widget-atlas-stat-card-direction: var(');
    expect(widgetAtlasThemeStyles.cssText).toContain('--widget-atlas-stat-card-direction,');
    expect(widgetAtlasThemeStyles.cssText).toContain('--_widget-atlas-card-bg: var(');
    expect(widgetAtlasThemeStyles.cssText).toContain('--widget-atlas-card-bg,');
    expect(widgetAtlasThemeStyles.cssText).toContain('--_widget-atlas-category-accent-bg: var(');
    expect(widgetAtlasThemeStyles.cssText).toContain('--widget-atlas-category-accent-bg,');

    const catalogueCss = WidgetCataloguePage.styles.map((style) => style.cssText).join('\n');
    const searchCss = WidgetSearch.styles.map((style) => style.cssText).join('\n');
    const categoryCss = WidgetCategorySection.styles.map((style) => style.cssText).join('\n');
    const cardCss = WidgetCard.styles.map((style) => style.cssText).join('\n');

    expect(catalogueCss).toContain('background: var(--_widget-atlas-page-bg);');
    expect(catalogueCss).toContain('grid-template-columns: var(--_widget-atlas-stats-grid-columns);');
    expect(catalogueCss).toContain('font-family: var(--_widget-atlas-title-font-family);');
    expect(catalogueCss).toContain('flex-direction: var(--_widget-atlas-stat-card-direction);');
    expect(searchCss).toContain('background: var(--_widget-atlas-search-toolbar-bg);');
    expect(searchCss).toContain('display: var(--_widget-atlas-search-label-display);');
    expect(categoryCss).toContain('background: var(--_widget-atlas-category-accent-bg);');
    expect(cardCss).toContain('background: var(--_widget-atlas-card-bg);');
    expect(cardCss).toContain('background: var(--_widget-atlas-card-accent-bg);');
  });

  test('widget-catalogue-page renders stat summary cards for total, stable, beta, and new widgets', async () => {
    catalogue.register(makeMeta());
    catalogue.register(
      makeMeta({
        tag: 'rs-table',
        name: 'RS Table',
        description: 'Table component',
        category: 'organisms',
        useCase: 'data-display',
        level: 'organism',
        status: 'beta',
      })
    );
    catalogue.register(
      makeMeta({
        tag: 'rs-banner',
        name: 'RS Banner',
        description: 'Banner component',
        category: 'molecules',
        useCase: 'feedback',
        level: 'molecule',
        status: 'new',
      })
    );

    const el = document.createElement('widget-catalogue-page') as HTMLElement & {
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const statCards = Array.from(el.shadowRoot.querySelectorAll('.stat-card')).map((card) =>
      card.textContent?.replace(/\s+/g, ' ').trim()
    );

    expect(statCards).toHaveLength(4);
    expect(statCards.join(' | ')).toContain('Total');
    expect(statCards.join(' | ')).toContain('Stable');
    expect(statCards.join(' | ')).toContain('Beta');
    expect(statCards.join(' | ')).toContain('New');
  });

  test('widget-preview exposes device presets and a container width control', async () => {
    const el = document.createElement('widget-preview') as HTMLElement & {
      code: string;
      showDeviceSelector: boolean;
      showWidthControl: boolean;
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    el.code = '<button type="button">Preview</button>';
    el.showDeviceSelector = true;
    el.showWidthControl = true;
    document.body.appendChild(el);
    await el.updateComplete;

    const tabletButton = el.shadowRoot.querySelector(
      'button[data-device="tablet"]'
    ) as HTMLButtonElement | null;
    const widthInput = el.shadowRoot.querySelector(
      'input[name="preview-width"]'
    ) as HTMLInputElement | null;

    expect(tabletButton).toBeTruthy();
    expect(widthInput).toBeTruthy();

    tabletButton!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await el.updateComplete;
    const updatedWidthInput = el.shadowRoot.querySelector(
      'input[name="preview-width"]'
    ) as HTMLInputElement | null;
    updatedWidthInput!.value = '640';
    updatedWidthInput!.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    updatedWidthInput!.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    await el.updateComplete;

    const frame = el.shadowRoot.querySelector('.preview-frame') as HTMLDivElement | null;
    expect(frame?.getAttribute('data-device')).toBe('tablet');
    expect(frame?.style.getPropertyValue('--widget-atlas-preview-width')).toBe('640px');
  });

  test('widget-demo-page renders toc, guidelines, api reference, and related sections', async () => {
    setWidgetUrlBuilder((widget) => `/catalogue/${widget.category}/${widget.tag}`);

    catalogue.register(
      makeMeta({
        tag: 'rs-link',
        name: 'RS Link',
        description: 'Text link',
        relatedComponents: [],
      })
    );
    catalogue.register(makeMeta());

    const el = document.createElement('widget-demo-page') as HTMLElement & {
      tag: string;
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    el.tag = 'rs-button';
    document.body.appendChild(el);
    await el.updateComplete;

    const tocLabels = Array.from(el.shadowRoot.querySelectorAll('.sidebar__link')).map((link) =>
      link.textContent?.trim()
    );

    expect(tocLabels).toEqual(
      expect.arrayContaining(['Basic', 'Usage Guidelines', 'API Reference', 'Related Components'])
    );

    const apiSections = Array.from(el.shadowRoot.querySelectorAll('.api-section h3')).map((heading) =>
      heading.textContent?.trim()
    );

    expect(apiSections).toEqual(
      expect.arrayContaining(['Properties', 'Events', 'Slots', 'CSS Custom Properties'])
    );
    expect(el.shadowRoot.querySelector('widget-props-table')).toBeTruthy();
    expect(el.shadowRoot.querySelector('widget-events-table')).toBeTruthy();
    expect(el.shadowRoot.querySelector('widget-slots-table')).toBeTruthy();
    expect(el.shadowRoot.querySelector('widget-css-props-table')).toBeTruthy();
    expect(el.shadowRoot.querySelector('.guideline-card--do')).toBeTruthy();
    expect(el.shadowRoot.querySelector('.guideline-card--dont')).toBeTruthy();
    expect(el.shadowRoot.querySelector('.guideline-card--notes')).toBeTruthy();

    const relatedLink = el.shadowRoot.querySelector('.related-link') as HTMLAnchorElement | null;
    expect(relatedLink?.getAttribute('href')).toBe('/catalogue/atoms/rs-link');
  });
});
