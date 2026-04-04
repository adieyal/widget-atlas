export interface TagUrlBuilders {
  group?: (groupId: string) => string | null;
  tag?: (groupId: string, tagId: string) => string | null;
}

let tagUrlBuilders: TagUrlBuilders = {};

export function setTagUrlBuilders(builders: TagUrlBuilders): void {
  tagUrlBuilders = builders;
}

export function buildTagGroupUrl(groupId: string): string | null {
  return tagUrlBuilders.group?.(groupId) ?? null;
}

export function buildTagUrl(groupId: string, tagId: string): string | null {
  return tagUrlBuilders.tag?.(groupId, tagId) ?? null;
}
