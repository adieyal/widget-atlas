import { catalogue } from './core/catalogue.js';
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
    setWidgetUrlBuilder();
    document.body.innerHTML = '';
  });

  test('registers custom elements from the elements entry point', () => {
    expect(customElements.get('widget-search')).toBeDefined();
    expect(customElements.get('widget-catalogue-page')).toBeDefined();
    expect(customElements.get('widget-demo-page')).toBeDefined();
    expect(customElements.get('widget-card')).toBeDefined();
    expect(customElements.get('widget-category-section')).toBeDefined();
    expect(customElements.get('widget-code-block')).toBeDefined();
    expect(customElements.get('widget-preview')).toBeDefined();
    expect(customElements.get('widget-props-table')).toBeDefined();
    expect(customElements.get('widget-events-table')).toBeDefined();
    expect(customElements.get('widget-slots-table')).toBeDefined();
    expect(customElements.get('widget-css-props-table')).toBeDefined();
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

    const card = el.shadowRoot.querySelector('widget-card') as
      | (HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> })
      | null;
    const categorySection = el.shadowRoot.querySelector('widget-category-section') as
      | (HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> })
      | null;
    await categorySection?.updateComplete;
    const nestedCard = categorySection?.shadowRoot.querySelector('widget-card') as
      | (HTMLElement & { shadowRoot: ShadowRoot; updateComplete?: Promise<unknown> })
      | null;
    await nestedCard?.updateComplete;
    const link = (card ?? nestedCard)?.shadowRoot.querySelector('a.card');
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

    const categorySection = el.shadowRoot.querySelector('widget-category-section') as
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
});
