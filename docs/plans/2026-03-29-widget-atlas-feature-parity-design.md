---
last_updated: 2026-03-29
---

# Widget Atlas Feature Parity Design

## Goal

Upgrade `/home/adi/Development/widget-atlas` from the minimal extracted package into a feature-rich, reusable widget-library package with functional parity for the generic parts of Restoke's widget-library experience.

The package should keep working as a standalone dependency and should remain generic enough for other apps to adopt without inheriting Restoke-specific product assumptions.

## Explicit Exclusions

Do not migrate these Restoke-only features into the package:
- "Used in templates"
- template usage counts on catalogue cards
- `used` and `unused` search filters

The existing `widget-atlas/usage-data` API can remain because it is generic, but the package UI should not surface the excluded Restoke-specific features.

## Generic Capability Target

`widget-atlas` should provide:
- a richer catalogue page with a strong header, stat summary, and polished grouped browsing
- a richer search experience with generic category, use-case, and status filters
- a richer demo page with:
  - header metadata chips
  - sticky table of contents
  - example sections
  - responsive preview controls
  - container-width controls
  - code blocks with copy/collapse behavior
  - usage guideline sections
  - API reference sections
  - related component links
- a token-driven visual system based on overridable `--widget-atlas-*` custom properties

## Package Boundary

Keep in `widget-atlas`:
- generic catalogue/search/demo web components
- reusable helper components needed by those pages
- reusable presentation primitives for code, preview, tables, cards, and section layout
- generic preview-side fixture inspection support only if it does not depend on Restoke fixture registries

Leave out of `widget-atlas`:
- Django template path discovery
- Restoke template usage presentation
- Restoke-specific widgets such as `rs-badge`, `rs-search-input`, `rs-select`, and `rs-text-link`
- Restoke demo shared resource helpers that encode Restoke design tokens or app routing

## Replacement Strategy For Restoke-Specific Widgets

Where the richer Restoke UI currently depends on Restoke-only widgets, `widget-atlas` should provide package-native replacements with the same functional role:
- replace `rs-badge` with tokenized inline status and metadata chips
- replace `rs-search-input` with a package-native search field
- replace `rs-select` with package-native select controls
- replace `rs-text-link` with a styled anchor/back-link pattern
- replace Restoke demo section helpers with package-native section layout and typography

These replacements should be internal building blocks for the package pages and also be exported from the components entry point when they represent useful generic widgets.

## Design Token Contract

All package-owned styles should flow through `--widget-atlas-*` CSS custom properties with sensible fallbacks.

The token contract should cover:
- typography
- colors
- surface elevations
- spacing
- radii
- borders
- shadows
- focus styles
- code block colors
- preview canvas styling
- status accent colors

The package should not depend on consumer-specific token names for its default rendering, though it may fall back to neutral raw values.

## Planned Package Components

Add or upgrade the following package-owned components:
- `widget-search`
- `widget-catalogue-page`
- `widget-demo-page`
- `widget-card`
- `widget-category-section`
- `widget-code-block`
- `widget-preview`
- `widget-props-table`
- `widget-events-table`
- `widget-slots-table`
- `widget-css-props-table`

These components should live under `src/components/` and be available through:
- `widget-atlas/components` for direct imports
- `widget-atlas/elements` for automatic custom-element registration

## Feature Checklist

### Catalogue Features To Add

- richer page header copy and layout
- stat summary cards for total, stable, beta, and new widgets
- dedicated widget cards with status and level chips
- grouped category sections with stronger headings and visual accents
- nicer empty state for search results

### Search Features To Add

- use-case filter
- category filter
- status filter
- generic, package-native search and select controls
- polished toolbar layout and responsive behavior

Do not add:
- used/unused filter
- session persistence that stores excluded template-usage concerns

### Demo Page Features To Add

- sticky sidebar table of contents with scroll spy
- back link
- richer header with chips for tag, category, level, and version
- preview container with device presets
- container-width selector/resizer support
- code block with copy and collapse
- usage guidelines section with do/don't/notes cards
- API reference sections for properties, events, slots, and CSS custom properties
- polished related component links

Do not add:
- used-in-templates section
- Restoke fixture registry coupling

## Verification Expectations

The work is complete when:
- `widget-atlas` builds and tests in isolation
- `widget-atlas/elements` registers all public custom elements, including the new helper widgets
- the demo page exposes the missing generic sections and controls
- the catalogue page exposes the richer generic browsing surface without excluded Restoke-only features
- consumers can restyle the package using `--widget-atlas-*` tokens without editing package code
- Restoke still builds while consuming the upgraded package
