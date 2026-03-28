import type { WidgetMetadata } from './types.js';
export type DuplicatePolicy = 'error' | 'ignore' | 'overwrite';
export interface RegisterWidgetsOptions {
    duplicatePolicy?: DuplicatePolicy;
}
export declare function registerWidgets(widgets: WidgetMetadata[], options?: RegisterWidgetsOptions): void;
