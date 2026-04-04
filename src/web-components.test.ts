import { catalogue } from './core/catalogue.js';
import { registerTagGroups } from './core/register-tag-groups.js';
import { tagGroupRegistry } from './core/tag-group-registry.js';
import { setTagUrlBuilders } from './core/tag-url-strategy.js';
import { setWidgetUrlBuilder } from './core/url-strategy.js';
import type { WidgetMetadata } from './core/types.js';

import './elements.js';

function makeMeta(overrides: Partial<WidgetMetadata> = {}): WidgetMetadata {
  return {
    tag: 'rs-button',
    name: 'RS Button',
    description: 'Button component',
    category: 'atoms',
    useCase: 'buttons-links',
    level: 'atom',
    status: 'stable',
    properties: [],
    events: [],
    slots: [],
    cssProperties: [],
    parts: [],
    examples: [{ id: 'ex1', title: 'Example', code: '<rs-button>Click</rs-button>' }],
    ...overrides,
  };
}

describe('widget-atlas web components', () => {
  beforeAll(() => {
    if (!customElements.get('rs-prop-demo')) {
      class RsPropDemo extends HTMLElement {
        payload: { title?: string } | null = null;

        connectedCallback(): void {
          this.renderPayload();
        }

        private renderPayload(): void {
          this.textContent = this.payload?.title || 'empty';
        }
      }

      customElements.define('rs-prop-demo', RsPropDemo);
    }
  });

  beforeEach(() => {
    catalogue.clear();
    tagGroupRegistry.clear();
    setWidgetUrlBuilder();
    setTagUrlBuilders({});
    document.body.innerHTML = '';
  });

  test('registers custom elements from the elements entry point', () => {
    expect(customElements.get('widget-search')).toBeDefined();
    expect(customElements.get('widget-catalogue-page')).toBeDefined();
    expect(customElements.get('widget-demo-page')).toBeDefined();
    expect(customElements.get('widget-listing-page')).toBeDefined();
    expect(customElements.get('widget-card')).toBeDefined();
    expect(customElements.get('widget-category-section')).toBeDefined();
    expect(customElements.get('widget-code-block')).toBeDefined();
    expect(customElements.get('widget-preview')).toBeDefined();
    expect(customElements.get('widget-props-table')).toBeDefined();
    expect(customElements.get('widget-events-table')).toBeDefined();
    expect(customElements.get('widget-slots-table')).toBeDefined();
    expect(customElements.get('widget-css-props-table')).toBeDefined();
  });

  test('page-level atlas hosts render as block elements to avoid shrink-wrapped layouts', () => {
    const pageTags = [
      'widget-catalogue-page',
      'widget-demo-page',
      'widget-listing-page',
      'widget-tag-page',
      'widget-tag-group-page',
    ] as const;

    for (const tagName of pageTags) {
      const ctor = customElements.get(tagName) as {
        styles?: { cssText?: string } | Array<{ cssText?: string } | undefined>;
      };
      const styles = Array.isArray(ctor.styles)
        ? ctor.styles
        : ctor.styles == null
          ? []
          : [ctor.styles];
      const cssText = styles.map((style) => style?.cssText ?? '').join('\n');

      expect(cssText).toContain(':host');
      expect(cssText).toContain('display: block');
    }
  });

  test('catalogue page uses custom URL builder for widget links', async () => {
    setWidgetUrlBuilder((widget) => `/custom/${widget.category}/${widget.tag}/`);
    catalogue.register(makeMeta());

    const el = document.createElement('widget-catalogue-page') as HTMLElement & {
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const listingPage = el.shadowRoot.querySelector('widget-listing-page') as
      | (HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> })
      | null;
    await listingPage?.updateComplete;
    const categorySection = listingPage?.shadowRoot.querySelector('widget-category-section') as
      | (HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> })
      | null;
    await categorySection?.updateComplete;
    const nestedCard = categorySection?.shadowRoot.querySelector('widget-card') as
      | (HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> })
      | null;
    await nestedCard?.updateComplete;
    const link = nestedCard?.shadowRoot.querySelector('a.card');
    expect(link?.getAttribute('href')).toBe('/custom/atoms/rs-button/');
  });

  test('catalogue cards prefer shortDescription when provided', async () => {
    catalogue.register(
      makeMeta({
        shortDescription: 'Short catalogue summary',
        description: 'Longer component description for detail pages',
      })
    );

    const el = document.createElement('widget-catalogue-page') as HTMLElement & {
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const listingPage = el.shadowRoot.querySelector('widget-listing-page') as
      | (HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> })
      | null;
    await listingPage?.updateComplete;
    const categorySection = listingPage?.shadowRoot.querySelector('widget-category-section') as
      | (HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> })
      | null;
    await categorySection?.updateComplete;

    const card = categorySection?.shadowRoot.querySelector('widget-card') as
      | (HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> })
      | null;
    await card?.updateComplete;

    const description = card?.shadowRoot.querySelector('.description')?.textContent?.trim();
    expect(description).toBe('Short catalogue summary');
  });

  test('catalogue page keeps the stats header when rendered through the shared listing page', async () => {
    catalogue.register(makeMeta({ status: 'stable' }));
    catalogue.register(
      makeMeta({
        tag: 'rs-beta-card',
        name: 'RS Beta Card',
        status: 'beta',
        category: 'molecules',
        useCase: 'cards',
        level: 'molecule',
      })
    );

    const el = document.createElement('widget-catalogue-page') as HTMLElement & {
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const listingPage = el.shadowRoot.querySelector('widget-listing-page');
    expect(listingPage).toBeTruthy();
    expect(el.shadowRoot.textContent).toContain('Total');
    expect(el.shadowRoot.textContent).toContain('Stable');
    expect(el.shadowRoot.textContent).toContain('Beta');
  });

  test('catalogue page groups widgets by use case inside the shared listing page', async () => {
    catalogue.register(
      makeMeta({
        tag: 'rs-input',
        name: 'RS Input',
        useCase: 'inputs-selection',
        category: 'atoms',
      })
    );
    catalogue.register(
      makeMeta({
        tag: 'rs-button',
        name: 'RS Button',
        useCase: 'buttons-links',
        category: 'atoms',
      })
    );

    const el = document.createElement('widget-catalogue-page') as HTMLElement & {
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const listingPage = el.shadowRoot.querySelector('widget-listing-page') as
      | (HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> })
      | null;
    await listingPage?.updateComplete;

    const sections = Array.from(
      listingPage?.shadowRoot.querySelectorAll('widget-category-section') ?? []
    ) as Array<HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> }>;
    for (const section of sections) {
      await section.updateComplete;
    }

    const headings = sections.map(
      (section) => section.shadowRoot.querySelector('h2')?.textContent?.trim()
    );

    expect(headings).toContain('Buttons & Links');
    expect(headings).toContain('Inputs & Selection');
  });

  test('widget cards mark wrapped tags so wrapped tags can left-align', async () => {
    const card = document.createElement('widget-card') as HTMLElement & {
      name: string;
      tag: string;
      href: string;
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
      updateHeaderWrapState?: () => void;
    };

    card.name = 'RS Sort Button Group';
    card.tag = 'rs-sort-button-group';
    card.href = '#/rs-sort-button-group';
    document.body.appendChild(card);
    await card.updateComplete;

    const name = card.shadowRoot.querySelector('.name') as HTMLElement | null;
    const tag = card.shadowRoot.querySelector('.tag') as HTMLElement | null;
    const header = card.shadowRoot.querySelector('.header');

    expect(header?.hasAttribute('data-wrapped')).toBe(false);

    Object.defineProperty(name, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: 0 }),
    });
    Object.defineProperty(tag, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: 24 }),
    });

    card.updateHeaderWrapState?.();

    expect(header?.hasAttribute('data-wrapped')).toBe(true);
  });

  test('demo page uses custom URL builder for related links', async () => {
    setWidgetUrlBuilder((widget) => `/custom/${widget.category}/${widget.tag}/`);

    catalogue.register(
      makeMeta({
        tag: 'rs-input',
        name: 'RS Input',
        description: 'Input',
      })
    );

    catalogue.register(
      makeMeta({
        tag: 'rs-form',
        name: 'RS Form',
        description: 'Form',
        category: 'organisms',
        useCase: 'inputs-selection',
        level: 'organism',
        relatedComponents: ['rs-input'],
      })
    );

    const el = document.createElement('widget-demo-page') as HTMLElement & {
      tag: string;
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    el.tag = 'rs-form';
    document.body.appendChild(el);
    await el.updateComplete;

    const relatedLink = el.shadowRoot.querySelector('a.related-link');
    expect(relatedLink?.getAttribute('href')).toBe('/custom/atoms/rs-input/');
  });

  test('demo page renders live preview markup for examples', async () => {
    catalogue.register(
      makeMeta({
        tag: 'rs-live-demo',
        name: 'RS Live Demo',
        description: 'Component with live example output',
        examples: [
          {
            id: 'live',
            title: 'Live',
            code: '<button type="button" data-testid="preview-button">Live Preview</button>',
          },
        ],
      })
    );

    const el = document.createElement('widget-demo-page') as HTMLElement & {
      tag: string;
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    el.tag = 'rs-live-demo';
    document.body.appendChild(el);
    await el.updateComplete;

    const preview = el.shadowRoot.querySelector('widget-preview') as
      | (HTMLElement & { shadowRoot: ShadowRoot })
      | null;
    const previewButton = preview?.shadowRoot.querySelector('[data-testid="preview-button"]');
    expect(previewButton?.textContent).toBe('Live Preview');
  });

  test('demo page applies object props for live preview components', async () => {
    catalogue.register(
      makeMeta({
        tag: 'rs-prop-demo',
        name: 'RS Prop Demo',
        description: 'Component with object-property preview',
        examples: [
          {
            id: 'props',
            title: 'Props Example',
            code: '<rs-prop-demo></rs-prop-demo>',
            props: {
              payload: {
                title: 'Rendered via props',
              },
            },
          },
        ],
      })
    );

    const el = document.createElement('widget-demo-page') as HTMLElement & {
      tag: string;
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    el.tag = 'rs-prop-demo';
    document.body.appendChild(el);
    await el.updateComplete;

    const preview = el.shadowRoot.querySelector('.example-preview rs-prop-demo');
    expect(preview).toBeDefined();
    expect(preview?.textContent).toBe('Rendered via props');
  });

  test('listing page renders heading and description', async () => {
    const el = document.createElement('widget-listing-page') as HTMLElement & {
      heading: string;
      description: string;
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };

    el.heading = 'Contracts';
    el.description = 'Browse contract groups and members.';
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('widget-page-layout')).toBeTruthy();
    expect(el.shadowRoot.textContent).toContain('Contracts');
    expect(el.shadowRoot.textContent).toContain('Browse contract groups and members.');
  });

  test('listing page renders a single section from widgets when grouping is disabled', async () => {
    const el = document.createElement('widget-listing-page') as HTMLElement & {
      heading: string;
      widgets: WidgetMetadata[];
      groupBy: string;
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };

    el.heading = 'Widget List';
    el.groupBy = 'none';
    el.widgets = [
      makeMeta({ tag: 'rs-alpha', name: 'RS Alpha', useCase: 'behavior', category: 'atoms' }),
      makeMeta({ tag: 'rs-beta', name: 'RS Beta', useCase: 'layout', category: 'molecules' }),
    ];
    document.body.appendChild(el);
    await el.updateComplete;

    const sections = Array.from(el.shadowRoot.querySelectorAll('widget-category-section'));
    expect(sections).toHaveLength(1);

    const cards = Array.from(sections[0].shadowRoot.querySelectorAll('widget-card'));
    expect(cards).toHaveLength(2);
  });

  test('tag group page renders one shared-section card per contract tag', async () => {
    registerTagGroups([
      {
        id: 'contracts',
        name: 'Contracts',
        description: 'Shared component contracts.',
        tags: [
          {
            id: 'sortable',
            name: 'Sortable',
            description: 'Supports sort interactions.',
          },
          {
            id: 'filterable',
            name: 'Filterable',
            description: 'Supports filter interactions.',
          },
        ],
      },
    ]);

    setTagUrlBuilders({
      tag: (groupId, tagId) => `/contracts/${groupId}/${tagId}`,
    });

    catalogue.register(
      makeMeta({
        tag: 'rs-table',
        name: 'RS Table',
        description: 'Table component',
        memberOf: { contracts: ['sortable'] },
      })
    );
    catalogue.register(
      makeMeta({
        tag: 'rs-data-grid',
        name: 'RS Data Grid',
        description: 'Grid component',
        memberOf: { contracts: ['filterable'] },
      })
    );

    const el = document.createElement('widget-tag-group-page');
    el.group = 'contracts';
    document.body.appendChild(el);
    await el.updateComplete;

    const listingPage = el.shadowRoot.querySelector('widget-listing-page') as
      | (HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> })
      | null;
    await listingPage?.updateComplete;

    const sections = Array.from(
      listingPage?.shadowRoot.querySelectorAll('widget-category-section') ?? []
    ) as Array<HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> }>;
    for (const section of sections) {
      await section.updateComplete;
    }

    expect(sections).toHaveLength(1);
    expect(sections[0].shadowRoot.querySelector('h2')?.textContent?.trim()).toBe('Contracts');

    const cards = Array.from(sections[0].shadowRoot.querySelectorAll('widget-card')) as Array<
      HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> }
    >;
    expect(cards).toHaveLength(2);
    for (const card of cards) {
      await card.updateComplete;
    }

    const hrefs = cards.map((card) => card.shadowRoot.querySelector('a.card')?.getAttribute('href'));
    expect(hrefs).toEqual([
      '/contracts/contracts/filterable',
      '/contracts/contracts/sortable',
    ]);
    expect(cards.map((card) => card.shadowRoot.querySelector('.name')?.textContent?.trim())).toEqual([
      'Filterable',
      'Sortable',
    ]);
    expect(cards.map((card) => card.shadowRoot.querySelector('.tag')?.textContent?.trim())).toEqual([
      'filterable',
      'sortable',
    ]);
    expect(cards.map((card) => card.shadowRoot.querySelector('.chip--meta')?.textContent?.trim())).toEqual([
      '1 component',
      '1 component',
    ]);
    expect(el.shadowRoot.textContent).not.toContain('Total');
  });

  test('tag group page uses the shared listing shell without the widget stats bar', async () => {
    registerTagGroups([
      {
        id: 'contracts',
        name: 'Contracts',
        description: 'Shared component contracts.',
        tags: [
          {
            id: 'sortable',
            name: 'Sortable',
            description: 'Supports sort interactions.',
          },
        ],
      },
    ]);

    catalogue.register(
      makeMeta({
        tag: 'rs-table',
        name: 'RS Table',
        description: 'Table component',
        memberOf: { contracts: ['sortable'] },
      })
    );

    const el = document.createElement('widget-tag-group-page') as HTMLElement & {
      group: string;
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    el.group = 'contracts';
    document.body.appendChild(el);
    await el.updateComplete;

    const listingPage = el.shadowRoot.querySelector('widget-listing-page') as
      | (HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> })
      | null;
    await listingPage?.updateComplete;

    const pageLayout = listingPage?.shadowRoot.querySelector('widget-page-layout') as
      | (HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> })
      | null;
    await pageLayout?.updateComplete;

    expect(listingPage).toBeTruthy();
    const header = pageLayout?.shadowRoot.querySelector('[part="header"]');
    expect(header?.classList.contains('has-aside')).toBe(false);
    expect(listingPage?.shadowRoot.textContent).not.toContain('Total');
  });

  test('detail layout collapses to one column immediately when no sidebar slot is populated', async () => {
    registerTagGroups([
      {
        id: 'contracts',
        name: 'Contracts',
        tags: [
          {
            id: 'button-like',
            name: 'Button-Like',
            description: 'Contract description.',
          },
        ],
      },
    ]);

    const el = document.createElement('widget-tag-page') as HTMLElement & {
      group: string;
      tag: string;
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    el.group = 'contracts';
    el.tag = 'button-like';
    document.body.appendChild(el);
    await el.updateComplete;

    const detailLayout = el.shadowRoot.querySelector('widget-detail-layout') as
      | (HTMLElement & { updateComplete?: Promise<unknown> })
      | null;

    expect(detailLayout).toBeTruthy();
    expect(detailLayout?.classList.contains('no-sidebar')).toBe(true);
  });

  test('listing page renders explicit sections', async () => {
    const el = document.createElement('widget-listing-page') as HTMLElement & {
      heading: string;
      sections: Array<{
        id: string;
        heading: string;
        widgets: WidgetMetadata[];
      }>;
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };

    el.heading = 'Contracts';
    el.sections = [
      {
        id: 'behavior',
        heading: 'Behavior',
        widgets: [makeMeta({ tag: 'rs-behavior', name: 'RS Behavior' })],
      },
      {
        id: 'layout',
        heading: 'Layout',
        widgets: [makeMeta({ tag: 'rs-layout', name: 'RS Layout' })],
      },
    ];

    document.body.appendChild(el);
    await el.updateComplete;

    const sections = Array.from(el.shadowRoot.querySelectorAll('widget-category-section'));
    expect(sections).toHaveLength(2);
    expect(sections[0].shadowRoot.querySelector('h2')?.textContent?.trim()).toBe('Behavior');
    expect(sections[1].shadowRoot.querySelector('h2')?.textContent?.trim()).toBe('Layout');
  });

  test('listing page removes empty sections after filtering', async () => {
    const el = document.createElement('widget-listing-page') as HTMLElement & {
      heading: string;
      query: string;
      sections: Array<{
        id: string;
        heading: string;
        widgets: WidgetMetadata[];
      }>;
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };

    el.heading = 'Contracts';
    el.query = 'layout';
    el.sections = [
      {
        id: 'behavior',
        heading: 'Behavior',
        widgets: [makeMeta({ tag: 'rs-behavior', name: 'RS Behavior' })],
      },
      {
        id: 'layout',
        heading: 'Layout',
        widgets: [makeMeta({ tag: 'rs-layout', name: 'RS Layout' })],
      },
    ];

    document.body.appendChild(el);
    await el.updateComplete;

    const sections = Array.from(el.shadowRoot.querySelectorAll('widget-category-section'));
    expect(sections).toHaveLength(1);
    expect(sections[0].shadowRoot.querySelector('h2')?.textContent?.trim()).toBe('Layout');
  });

  test('listing page preserves an explicitly set sort value', async () => {
    const el = document.createElement('widget-listing-page') as HTMLElement & {
      heading: string;
      sort: string;
      sortOptions: Array<{ value: string; label: string }>;
      widgets: WidgetMetadata[];
      updateComplete?: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };

    el.heading = 'Widget List';
    el.sort = 'name-desc';
    el.sortOptions = [
      { value: 'name-asc', label: 'Name A → Z' },
      { value: 'name-desc', label: 'Name Z → A' },
    ];
    el.widgets = [
      makeMeta({ tag: 'rs-alpha', name: 'RS Alpha' }),
      makeMeta({ tag: 'rs-beta', name: 'RS Beta' }),
    ];

    document.body.appendChild(el);
    await el.updateComplete;

    const toolbar = el.shadowRoot.querySelector('widget-filter-toolbar') as
      | (HTMLElement & { sort: string })
      | null;
    expect(toolbar?.sort).toBe('name-desc');
  });
});
