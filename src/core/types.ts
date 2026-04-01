/**
 * Widget Library Type Definitions
 *
 * Core type definitions for the declarative widget library system.
 * These types define the metadata schema used to document and catalogue
 * all UI components in the design system.
 */

export interface PropertyDef {
  name: string;
  type: string;
  default: string;
  description: string;
  required?: boolean;
  deprecated?: boolean;
  since?: string;
}

export interface EventDef {
  name: string;
  detail: string;
  description: string;
  bubbles?: boolean;
  composed?: boolean;
}

export interface SlotDef {
  name: string;
  description: string;
  accepts?: string;
}

export interface CssPropertyDef {
  name: string;
  default: string;
  description: string;
}

export interface PartDef {
  name: string;
  description: string;
}

export interface ExampleConfig {
  id: string;
  title: string;
  description?: string;
  code: string;
  props?: Record<string, unknown>;
  showCode?: boolean;
  showPreview?: boolean;
  fullWidth?: boolean;
}

export interface UsageGuideline {
  do: string[];
  dont: string[];
  notes?: string[];
}

export type UseCase = string;

export type Category = 'atoms' | 'molecules' | 'organisms' | 'charts' | 'features';

export type Level = 'atom' | 'molecule' | 'organism' | 'foundation';

export type Status = 'new' | 'alpha' | 'beta' | 'stable' | 'deprecated' | 'legacy';

export interface WidgetMetadata {
  tag: string;
  name: string;
  description: string;
  shortDescription?: string;
  category: Category;
  useCase: UseCase;
  level: Level;
  status?: Status;
  version?: string;
  since?: string;
  properties: PropertyDef[];
  events: EventDef[];
  slots: SlotDef[];
  cssProperties: CssPropertyDef[];
  parts: PartDef[];
  examples: ExampleConfig[];
  usageGuidelines?: UsageGuideline;
  relatedComponents?: string[];
  keywords?: string[];
  aliases?: string[];
  demoComponent?: string;
  demoImport?: string;
}

export interface SearchOptions {
  useCase?: UseCase;
  category?: Category;
  status?: Status;
  level?: Level;
}

export interface CatalogueStats {
  total: number;
  byStatus: Record<string, number>;
  byCategory: Record<string, number>;
  byUseCase: Record<string, number>;
  byLevel: Record<string, number>;
}
