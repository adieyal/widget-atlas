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
