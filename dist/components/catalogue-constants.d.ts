import type { Category, Status, UseCase } from '../core/types.js';
export declare const USE_CASE_LABELS: Record<UseCase, string>;
export declare const USE_CASE_ORDER: UseCase[];
export declare const CATEGORY_LABELS: Record<Category, string>;
export declare const CATEGORY_ORDER: Category[];
export declare const STATUS_LABELS: Record<Status, string>;
export declare const STATUS_ORDER: Status[];
export declare function titleCase(value: string): string;
export declare function statusTone(status?: Status): string;
