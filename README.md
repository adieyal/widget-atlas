# widget-atlas

`widget-atlas` is a standalone reusable package for widget metadata, catalogue search, generic Lit-based demo components, and optional usage-data tracking.

## Install

```bash
npm install widget-atlas lit
```

## Imports

Use `widget-atlas` for the core APIs:

```ts
import {
  catalogue,
  registerWidgets,
  setWidgetUrlBuilder,
  type WidgetMetadata,
} from 'widget-atlas';
```

Use `widget-atlas/elements` when you want the custom elements defined for you:

```ts
import 'widget-atlas/elements';
```

Use `widget-atlas/usage-data` when your app wants to provide template or route usage signals:

```ts
import { setWidgetUsageData } from 'widget-atlas/usage-data';
```

## What It Provides

- Strongly typed widget metadata
- In-memory catalogue registration and search
- URL building helpers for consumer-specific routing
- Tag group system for labelling components with caller-defined sets (e.g. contracts, patterns)
- Optional usage-data storage
- Generic web components:
  - Layout shells: `<widget-page-layout>`, `<widget-detail-layout>`
  - Shared page: `<widget-listing-page>`
  - Pages: `<widget-catalogue-page>`, `<widget-demo-page>`, `<widget-tag-page>`, `<widget-tag-group-page>`
  - Primitives: `<widget-search>`, `<widget-filter-toolbar>`, `<widget-card>`, `<widget-category-section>`

## Basic Usage

```ts
import {
  catalogue,
  registerWidgets,
  setWidgetUrlBuilder,
  type WidgetMetadata,
} from 'widget-atlas';
import 'widget-atlas/elements';
import { setWidgetUsageData } from 'widget-atlas/usage-data';

const buttonMeta: WidgetMetadata = {
  tag: 'my-button',
  name: 'My Button',
  description: 'Example button',
  category: 'atoms',
  useCase: 'buttons',
  level: 'atom',
  status: 'stable',
  properties: [],
  events: [],
  slots: [],
  cssProperties: [],
  parts: [],
  examples: [{ id: 'basic', title: 'Basic', code: '<my-button>Click</my-button>' }],
};

registerWidgets([buttonMeta]);

setWidgetUrlBuilder((widget) => `/widgets/${widget.category}/${widget.tag}/`);

setWidgetUsageData({
  'my-button': ['templates/components/button.html'],
});

console.log(catalogue.get('my-button'));
```

## Tag Groups

Tag groups let you attach caller-defined labels to components and optionally render dedicated documentation pages for them. The classic use case is contracts — named behavioural interfaces that multiple components implement — but the mechanism is generic.

### 1. Register tag groups

```ts
import { registerTagGroups, type TagGroupDef } from 'widget-atlas';

registerTagGroups([
  {
    id: 'contracts',
    name: 'Contracts',
    description: 'Behavioural interfaces that components can conform to.',
    tags: [
      {
        id: 'sortable',
        name: 'Sortable',
        description: 'Exposes sort-column and sort-direction properties and a sort-change event.',
      },
      {
        id: 'filterable',
        name: 'Filterable',
        description: 'Accepts a filters property and emits a filter-change event.',
      },
    ],
  },
]);
```

### 2. Declare membership on component metadata

```ts
const tableMeta: WidgetMetadata = {
  tag: 'my-table',
  // ...
  memberOf: {
    contracts: ['sortable', 'filterable'],
  },
};
```

### 3. Configure URL builders (optional)

If you want the chips on component detail pages to link to tag pages, and the tag group page to exist, register URL builders:

```ts
import { setTagUrlBuilders } from 'widget-atlas';

setTagUrlBuilders({
  group: (groupId) => `/contracts/`,                          // group-level page
  tag: (groupId, tagId) => `/contracts/${tagId}/`,           // individual tag page
});
```

Returning `null` (or omitting a builder) renders chips as plain text with no link.

### 4. Mount the pages

```html
<!-- Group-level page: renders one section per tag, each containing matching components -->
<widget-tag-group-page group="contracts"></widget-tag-group-page>

<!-- Tag-level page: lists all components that declare membership -->
<widget-tag-page group="contracts" tag="sortable"></widget-tag-page>
```

### Searching by tag group

The catalogue search supports filtering by group and tag:

```ts
import { catalogue } from 'widget-atlas';

// All components that belong to the contracts group
catalogue.search('', { tagGroup: 'contracts' });

// Components that specifically implement the sortable contract
catalogue.search('', { tagGroup: 'contracts', tag: 'sortable' });

// Direct lookup without a text query
catalogue.getByTag('contracts', 'sortable');
```

### Unregistered tags

If a component declares a tag that has no matching `TagDef`, widget-atlas logs a `console.warn` and renders the raw tag id as a plain chip. This is a misconfiguration, not a crash.

## Layout Components

The built-in page components all share two structural shells that are also available to you directly.

### `<widget-page-layout>`

Shell for list and browse pages. Renders a centred content column with an optional header aside and toolbar slot.

| Slot | Purpose |
|---|---|
| `eyebrow` | Label pill above the heading |
| `heading` | Page title (wrapped in `h1`) |
| `description` | Subtitle below the heading |
| `header-aside` | Optional content beside the header (e.g. a stats grid); triggers 2-column hero layout |
| `toolbar` | Search/filter bar between the header and content |
| _(default)_ | Main page content |

CSS parts: `container`, `header`, `toolbar`, `content`

Overridable tokens: `--widget-atlas-page-layout-max`, `--widget-atlas-page-layout-padding`, `--widget-atlas-page-layout-hero-columns`

### `<widget-detail-layout>`

Shell for detail and reference pages. Renders a sticky sidebar + main column layout; collapses to a single column when the `sidebar` slot is empty.

| Slot | Purpose |
|---|---|
| `breadcrumb` | Optional nav above the header |
| `eyebrow` | Label pill above the heading |
| `heading` | Page title (wrapped in `h1`) |
| `header-meta` | Optional content between the heading and description (e.g. status chips) |
| `description` | Optional subtitle |
| `sidebar` | Sticky sidebar (ToC, etc.); omit for single-column layout |
| _(default)_ | Main content sections |

CSS parts: `sidebar`, `main`, `header`

Overridable tokens: `--widget-atlas-detail-sidebar-width`, `--widget-atlas-detail-max`, `--widget-atlas-detail-padding`

### Design tokens

All visual properties are overridable via CSS custom properties. The pattern is a public token (`--widget-atlas-*`) that resolves to an internal default (`--_widget-atlas-*`). Set the public token on any ancestor element.

```css
/* Override on the host app root */
:root {
  --widget-atlas-surface: #f9f9f9;
  --widget-atlas-accent: #2563eb;
  --widget-atlas-detail-sidebar-width: 18rem;
}
```

## Development

```bash
npm run build
npm test
```

## Smoke Test Consumer

There is a minimal consumer app under `smoke/scratch-consumer` that installs this package from the local repo and renders the catalogue UI through the public package contract.

```bash
cd smoke/scratch-consumer
npm install
npm run build
```

This is useful before switching a real consumer from a local path dependency to a Git dependency.

## Git Dependency Handoff

Once this repository is pushed to a remote, consumers can replace the local path dependency with a Git URL:

```json
{
  "dependencies": {
    "widget-atlas": "git+ssh://<host>/<org>/widget-atlas.git#<tag-or-sha>"
  }
}
```

Recommended handoff steps for a consumer app:
- switch `widget-atlas` from a local `file:` dependency to the Git URL
- run `npm install`
- run the consumer build and smoke tests
- pin to a tag once the package boundary is stable

## Restoke Example

If you are using this package inside Restoke, keep the app-specific metadata and usage generation in Restoke and consume only the public package APIs:

```ts
import { registerWidgets, setWidgetUrlBuilder } from 'widget-atlas';
import { setWidgetUsageData } from 'widget-atlas/usage-data';

setWidgetUrlBuilder(({ category, tag }) => `/dev-tools/${category}/${tag}/`);
setWidgetUsageData({
  'rs-button': ['restoke/templates/components/button.html'],
});
```
