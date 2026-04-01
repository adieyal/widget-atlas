import type { Category, Status } from '../core/types.js';

export const CATEGORY_LABELS: Record<Category, string> = {
  atoms: 'Atoms',
  molecules: 'Molecules',
  organisms: 'Organisms',
  charts: 'Charts',
  features: 'Features',
};

export const CATEGORY_ORDER: Category[] = ['atoms', 'molecules', 'organisms', 'charts', 'features'];

export const STATUS_LABELS: Record<Status, string> = {
  new: 'New',
  alpha: 'Alpha',
  beta: 'Beta',
  stable: 'Stable',
  deprecated: 'Deprecated',
  legacy: 'Legacy',
};

export const STATUS_ORDER: Status[] = ['stable', 'beta', 'new', 'alpha', 'deprecated', 'legacy'];

export function titleCase(value: string): string {
  return value
    .split(/[-\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function formatUseCaseLabel(useCase: string): string {
  const parts = useCase.split('-').filter(Boolean);
  if (parts.length === 2) {
    return `${titleCase(parts[0])} & ${titleCase(parts[1])}`;
  }
  return titleCase(useCase);
}

export function statusTone(status?: Status): string {
  switch (status) {
    case 'stable':
      return 'success';
    case 'beta':
      return 'brand';
    case 'new':
      return 'accent';
    case 'alpha':
      return 'warning';
    case 'deprecated':
      return 'danger';
    case 'legacy':
      return 'muted';
    default:
      return 'muted';
  }
}
