import type { TagDef, TagGroupDef } from './types.js';

export class TagGroupRegistry {
  private groups: Map<string, TagGroupDef> = new Map();

  register(group: TagGroupDef): void {
    this.groups.set(group.id, group);
  }

  get(groupId: string): TagGroupDef | undefined {
    return this.groups.get(groupId);
  }

  getTag(groupId: string, tagId: string): TagDef | undefined {
    return this.groups.get(groupId)?.tags.find((t) => t.id === tagId);
  }

  getAll(): TagGroupDef[] {
    return Array.from(this.groups.values());
  }

  clear(): void {
    this.groups.clear();
  }
}

export const tagGroupRegistry = new TagGroupRegistry();
