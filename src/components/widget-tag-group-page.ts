import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { catalogue } from '../core/catalogue.js';
import { tagGroupRegistry } from '../core/tag-group-registry.js';
import { buildTagUrl } from '../core/tag-url-strategy.js';
import type { WidgetListingItem, WidgetListingSection } from '../core/types.js';

import './widget-listing-page.js';

@customElement('widget-tag-group-page')
export class WidgetTagGroupPage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: String }) group = '';

  private get groupDef() {
    return this.group ? tagGroupRegistry.get(this.group) : undefined;
  }

  private get contractCards(): WidgetListingItem[] {
    const groupDef = this.groupDef;
    if (!groupDef) {
      return [];
    }

    return groupDef.tags.map((tag) => {
      const count = catalogue.getByTag(this.group, tag.id).length;

      return {
        tag: tag.id,
        name: tag.name,
        description: tag.shortDescription ?? tag.description ?? '',
        shortDescription: tag.shortDescription,
        href: buildTagUrl(this.group, tag.id) ?? `#/${this.group}/${tag.id}`,
        tagLabel: tag.id,
        tagLabelMode: 'plain',
        metaLabel: `${count} component${count === 1 ? '' : 's'}`,
      };
    });
  }

  private get sections(): WidgetListingSection[] {
    if (!this.contractCards.length) {
      return [];
    }

    return [
      {
        id: `${this.group}-contracts`,
        heading: 'Contracts',
        widgets: this.contractCards,
      },
    ];
  }

  render() {
    if (!this.group) {
      return html`
        <widget-listing-page
          heading="Invalid group page"
          description="The group attribute is required."
          .sections=${[]}
          .sortOptions=${[]}
          .enableSearch=${false}
          emptyMessage="No contracts available."
        ></widget-listing-page>
      `;
    }

    const groupDef = this.groupDef;
    if (!groupDef) {
      return html`
        <widget-listing-page
          heading="Group not found"
          description=${`No tag group registered for "${this.group}".`}
          .sections=${[]}
          .sortOptions=${[]}
          .enableSearch=${false}
          emptyMessage="No contracts available."
        ></widget-listing-page>
      `;
    }

    return html`
      <widget-listing-page
        .eyebrow=${'Contracts'}
        .heading=${groupDef.name}
        .description=${groupDef.description ?? ''}
        filter-placeholder="Filter contracts..."
        emptyMessage="No contracts registered for this group yet."
        .sections=${this.sections}
      ></widget-listing-page>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-tag-group-page': WidgetTagGroupPage;
  }
}
