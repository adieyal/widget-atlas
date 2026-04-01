import type { Category, Status } from '../core/types.js';
export declare const CATEGORY_LABELS: Record<Category, string>;
export declare const CATEGORY_ORDER: Category[];
export declare const STATUS_LABELS: Record<Status, string>;
export declare const STATUS_ORDER: Status[];
export declare function titleCase(value: string): string;
export declare function formatUseCaseLabel(useCase: string): string;
export declare function statusTone(status?: Status): string;
