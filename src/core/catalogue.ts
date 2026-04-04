import type {
  WidgetMetadata,
  UseCase,
  Category,
  SearchOptions,
  CatalogueStats,
} from './types.js';

export class WidgetCatalogue {
  private widgets: Map<string, WidgetMetadata> = new Map();
  private byUseCase: Map<UseCase, WidgetMetadata[]> = new Map();
  private byCategory: Map<Category, WidgetMetadata[]> = new Map();

  register(meta: WidgetMetadata): void {
    const existing = this.widgets.get(meta.tag);
    if (existing) {
      this.unindex(existing);
    }

    this.widgets.set(meta.tag, meta);

    const useCaseList = this.byUseCase.get(meta.useCase) || [];
    useCaseList.push(meta);
    this.byUseCase.set(meta.useCase, useCaseList);

    const categoryList = this.byCategory.get(meta.category) || [];
    categoryList.push(meta);
    this.byCategory.set(meta.category, categoryList);
  }

  get(tag: string): WidgetMetadata | undefined {
    return this.widgets.get(tag);
  }

  has(tag: string): boolean {
    return this.widgets.has(tag);
  }

  getAll(): WidgetMetadata[] {
    return Array.from(this.widgets.values());
  }

  getByUseCase(useCase: UseCase): WidgetMetadata[] {
    return this.byUseCase.get(useCase) || [];
  }

  getByCategory(category: Category): WidgetMetadata[] {
    return this.byCategory.get(category) || [];
  }

  search(query: string, options?: SearchOptions): WidgetMetadata[] {
    const normalizedQuery = query.toLowerCase().trim();

    let results = this.getAll();

    if (normalizedQuery) {
      results = results.filter((widget) => {
        if (widget.name.toLowerCase().includes(normalizedQuery)) return true;
        if (widget.tag.toLowerCase().includes(normalizedQuery)) return true;
        if (widget.description.toLowerCase().includes(normalizedQuery)) return true;
        if (widget.shortDescription?.toLowerCase().includes(normalizedQuery)) return true;
        if (widget.keywords?.some((keyword) => keyword.toLowerCase().includes(normalizedQuery))) {
          return true;
        }
        if (widget.aliases?.some((alias) => alias.toLowerCase().includes(normalizedQuery))) {
          return true;
        }
        return false;
      });
    }

    if (options) {
      results = results.filter((widget) => {
        if (options.useCase && widget.useCase !== options.useCase) return false;
        if (options.category && widget.category !== options.category) return false;
        if (options.status && widget.status !== options.status) return false;
        if (options.level && widget.level !== options.level) return false;
        if (options.tagGroup) {
          const groupTags = widget.memberOf?.[options.tagGroup];
          if (!groupTags?.length) return false;
          if (options.tag && !groupTags.includes(options.tag)) return false;
        }
        return true;
      });
    }

    return results;
  }

  getGroupedByUseCase(): Map<UseCase, WidgetMetadata[]> {
    return new Map(this.byUseCase);
  }

  getGroupedByCategory(): Map<Category, WidgetMetadata[]> {
    return new Map(this.byCategory);
  }

  getStats(): CatalogueStats {
    const all = this.getAll();
    return {
      total: all.length,
      byStatus: this.countBy(all, 'status'),
      byCategory: this.countBy(all, 'category'),
      byUseCase: this.countBy(all, 'useCase'),
      byLevel: this.countBy(all, 'level'),
    };
  }

  getByTag(groupId: string, tagId: string): WidgetMetadata[] {
    return this.getAll().filter((widget) => widget.memberOf?.[groupId]?.includes(tagId));
  }

  getUseCases(): UseCase[] {
    return Array.from(this.byUseCase.keys());
  }

  getCategories(): Category[] {
    return Array.from(this.byCategory.keys());
  }

  clear(): void {
    this.widgets.clear();
    this.byUseCase.clear();
    this.byCategory.clear();
  }

  private unindex(meta: WidgetMetadata): void {
    const useCaseList = this.byUseCase.get(meta.useCase);
    if (useCaseList) {
      const filtered = useCaseList.filter((widget) => widget.tag !== meta.tag);
      if (filtered.length) {
        this.byUseCase.set(meta.useCase, filtered);
      } else {
        this.byUseCase.delete(meta.useCase);
      }
    }

    const categoryList = this.byCategory.get(meta.category);
    if (categoryList) {
      const filtered = categoryList.filter((widget) => widget.tag !== meta.tag);
      if (filtered.length) {
        this.byCategory.set(meta.category, filtered);
      } else {
        this.byCategory.delete(meta.category);
      }
    }
  }

  private countBy<K extends keyof WidgetMetadata>(
    widgets: WidgetMetadata[],
    key: K
  ): Record<string, number> {
    return widgets.reduce(
      (acc, widget) => {
        const value = String(widget[key] || 'unknown');
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }
}

export const catalogue = new WidgetCatalogue();
