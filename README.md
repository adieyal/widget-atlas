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
- Optional usage-data storage
- Generic web components:
- `<widget-search>`
- `<widget-catalogue-page>`
- `<widget-demo-page>`

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

## Development

```bash
npm run build
npm test
```

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
