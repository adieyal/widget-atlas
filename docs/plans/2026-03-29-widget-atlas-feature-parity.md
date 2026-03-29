---
last_updated: 2026-03-29
---

# Widget Atlas Feature Parity Implementation Plan

## Goal

Bring `/home/adi/Development/widget-atlas` to functional parity with the generic parts of Restoke's richer widget-library UI while keeping the package reusable and token-driven.

## Exclusions

Do not implement:
- used-in-templates presentation
- template usage counts
- used/unused filters

## Task List

1. Build the package-level design token and shared-style foundation.
2. Add reusable package-native helper components for cards, code blocks, preview controls, and API tables.
3. Expand `widget-search` with generic use-case/category/status filtering and richer toolbar styling.
4. Expand `widget-catalogue-page` with a richer header, stat summary, empty state, and grouped category sections built from package-owned widgets.
5. Expand `widget-demo-page` with:
   - back link
   - metadata chips
   - sticky table of contents
   - preview controls
   - container-width controls
   - code blocks
   - usage guideline cards
   - API reference sections
   - related component cards
6. Export and register the new helper components from `widget-atlas/components` and `widget-atlas/elements`.
7. Add or update tests to cover the new catalogue, search, preview, and demo-page behavior.
8. Run standalone package tests and build, then verify Restoke still builds against the upgraded package.

## File Targets

### New Shared Infrastructure

- `/home/adi/Development/widget-atlas/src/components/shared-styles.ts`

### New Helper Components

- `/home/adi/Development/widget-atlas/src/components/widget-card.ts`
- `/home/adi/Development/widget-atlas/src/components/widget-category-section.ts`
- `/home/adi/Development/widget-atlas/src/components/widget-code-block.ts`
- `/home/adi/Development/widget-atlas/src/components/widget-preview.ts`
- `/home/adi/Development/widget-atlas/src/components/widget-props-table.ts`
- `/home/adi/Development/widget-atlas/src/components/widget-events-table.ts`
- `/home/adi/Development/widget-atlas/src/components/widget-slots-table.ts`
- `/home/adi/Development/widget-atlas/src/components/widget-css-props-table.ts`

### Upgraded Existing Components

- `/home/adi/Development/widget-atlas/src/components/widget-search.ts`
- `/home/adi/Development/widget-atlas/src/components/widget-catalogue-page.ts`
- `/home/adi/Development/widget-atlas/src/components/widget-demo-page.ts`
- `/home/adi/Development/widget-atlas/src/components.ts`
- `/home/adi/Development/widget-atlas/src/elements.ts`

### Tests

- `/home/adi/Development/widget-atlas/src/web-components.test.ts`
- `/home/adi/Development/widget-atlas/src/index.test.ts`
- new focused component behavior tests as needed under `/home/adi/Development/widget-atlas/src/`

## Verification Commands

```bash
cd /home/adi/Development/widget-atlas
npm test -- --runInBand
npm run build

cd /home/adi/Development/widget-atlas/smoke/scratch-consumer
npm run build

cd /home/adi/Development/restoke/webapp/worktrees/wt-widget-library-migration/frontend
npm run build
```
