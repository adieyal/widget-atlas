import type { WidgetMetadata, UseCase, Category, SearchOptions, CatalogueStats } from './types.js';
export declare class WidgetCatalogue {
    private widgets;
    private byUseCase;
    private byCategory;
    register(meta: WidgetMetadata): void;
    get(tag: string): WidgetMetadata | undefined;
    has(tag: string): boolean;
    getAll(): WidgetMetadata[];
    getByUseCase(useCase: UseCase): WidgetMetadata[];
    getByCategory(category: Category): WidgetMetadata[];
    search(query: string, options?: SearchOptions): WidgetMetadata[];
    getGroupedByUseCase(): Map<UseCase, WidgetMetadata[]>;
    getGroupedByCategory(): Map<Category, WidgetMetadata[]>;
    getStats(): CatalogueStats;
    getUseCases(): UseCase[];
    getCategories(): Category[];
    clear(): void;
    private unindex;
    private countBy;
}
export declare const catalogue: WidgetCatalogue;
