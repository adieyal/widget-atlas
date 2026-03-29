import type { Category, Status, UseCase } from '../core/types.js';

export const USE_CASE_LABELS: Record<UseCase, string> = {
  'design-system': 'Design System',
  buttons: 'Buttons & Links',
  cards: 'Cards',
  forms: 'Forms & Input',
  feedback: 'Feedback & Status',
  navigation: 'Navigation & Progress',
  'data-display': 'Data Display',
  charts: 'Charts & Visualizations',
  layout: 'Layout',
  modals: 'Modals & Dialogs',
  onboarding: 'Onboarding',
  icons: 'Icons',
  integrations: 'Integrations',
};

export const USE_CASE_ORDER: UseCase[] = [
  'design-system',
  'buttons',
  'cards',
  'forms',
  'feedback',
  'navigation',
  'data-display',
  'charts',
  'layout',
  'modals',
  'onboarding',
  'icons',
  'integrations',
];

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
