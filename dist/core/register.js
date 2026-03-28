import { catalogue } from './catalogue.js';
export function registerWidgets(widgets, options = {}) {
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
