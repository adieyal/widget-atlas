import { catalogue } from './catalogue.js';
import type { WidgetMetadata } from './types.js';

export type DuplicatePolicy = 'error' | 'ignore' | 'overwrite';

export interface RegisterWidgetsOptions {
  duplicatePolicy?: DuplicatePolicy;
}

export function registerWidgets(
  widgets: WidgetMetadata[],
  options: RegisterWidgetsOptions = {}
): void {
  const duplicatePolicy = options.duplicatePolicy || 'error';

  widgets.forEach((widget) => {
    if (!catalogue.has(widget.tag)) {
      catalogue.register(widget);
      return;
    }

    if (duplicatePolicy === 'ignore') {
      return;
    }

    if (duplicatePolicy === 'overwrite') {
      catalogue.register(widget);
      return;
    }

    throw new Error(`Duplicate widget metadata for tag "${widget.tag}"`);
  });
}
