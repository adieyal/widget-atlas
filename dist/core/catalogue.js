export class WidgetCatalogue {
    constructor() {
        this.widgets = new Map();
        this.byUseCase = new Map();
        this.byCategory = new Map();
    }
    register(meta) {
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
    get(tag) {
        return this.widgets.get(tag);
    }
    has(tag) {
        return this.widgets.has(tag);
    }
    getAll() {
        return Array.from(this.widgets.values());
    }
    getByUseCase(useCase) {
        return this.byUseCase.get(useCase) || [];
    }
    getByCategory(category) {
        return this.byCategory.get(category) || [];
    }
    search(query, options) {
        const normalizedQuery = query.toLowerCase().trim();
        let results = this.getAll();
        if (normalizedQuery) {
            results = results.filter((widget) => {
                if (widget.name.toLowerCase().includes(normalizedQuery))
                    return true;
                if (widget.tag.toLowerCase().includes(normalizedQuery))
                    return true;
                if (widget.description.toLowerCase().includes(normalizedQuery))
                    return true;
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
                if (options.useCase && widget.useCase !== options.useCase)
                    return false;
                if (options.category && widget.category !== options.category)
                    return false;
                if (options.status && widget.status !== options.status)
                    return false;
                if (options.level && widget.level !== options.level)
                    return false;
                return true;
            });
        }
        return results;
    }
    getGroupedByUseCase() {
        return new Map(this.byUseCase);
    }
    getGroupedByCategory() {
        return new Map(this.byCategory);
    }
    getStats() {
        const all = this.getAll();
        return {
            total: all.length,
            byStatus: this.countBy(all, 'status'),
            byCategory: this.countBy(all, 'category'),
            byUseCase: this.countBy(all, 'useCase'),
            byLevel: this.countBy(all, 'level'),
        };
    }
    getUseCases() {
        return Array.from(this.byUseCase.keys());
    }
    getCategories() {
        return Array.from(this.byCategory.keys());
    }
    clear() {
        this.widgets.clear();
        this.byUseCase.clear();
        this.byCategory.clear();
    }
    unindex(meta) {
        const useCaseList = this.byUseCase.get(meta.useCase);
        if (useCaseList) {
            const filtered = useCaseList.filter((widget) => widget.tag !== meta.tag);
            if (filtered.length) {
                this.byUseCase.set(meta.useCase, filtered);
            }
            else {
                this.byUseCase.delete(meta.useCase);
            }
        }
        const categoryList = this.byCategory.get(meta.category);
        if (categoryList) {
            const filtered = categoryList.filter((widget) => widget.tag !== meta.tag);
            if (filtered.length) {
                this.byCategory.set(meta.category, filtered);
            }
            else {
                this.byCategory.delete(meta.category);
            }
        }
    }
    countBy(widgets, key) {
        return widgets.reduce((acc, widget) => {
            const value = String(widget[key] || 'unknown');
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    }
}
export const catalogue = new WidgetCatalogue();
