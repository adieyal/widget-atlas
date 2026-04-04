import { tagGroupRegistry } from './tag-group-registry.js';
import type { TagGroupDef } from './types.js';

export function registerTagGroups(groups: TagGroupDef[]): void {
  groups.forEach((group) => tagGroupRegistry.register(group));
}
