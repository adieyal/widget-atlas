# widget-atlas

`widget-atlas` is a standalone reusable package for widget metadata, catalogue search, and generic Lit-based demo components.

Use `widget-atlas` for the core APIs and `widget-atlas/elements` when you want the custom elements defined for you.

## Install

```bash
npm install widget-atlas lit
```

## What It Provides

- Strongly typed widget metadata
- In-memory catalogue registration and search
- URL building helpers for consumer-specific routing
- Generic web components:
- `<widget-search>`
- `<widget-catalogue-page>`
- `<widget-demo-page>`

## Basic Usage

```ts
import { catalogue, registerWidgets, setWidgetUrlBuilder } from 'widget-atlas';
import 'widget-atlas/elements';
```

## Development

```bash
npm run build
npm test
```
