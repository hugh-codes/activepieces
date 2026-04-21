/// <reference types="vitest/globals" />

import { describe, it, expect } from 'vitest';
import { filterNewItems } from '../src/lib/triggers/new-video.trigger';

function makeItem(guid: string, updatedAt: string) {
  return { guid, 'atom:updated': { '@': {}, '#': updatedAt } };
}

describe('filterNewItems', () => {
  it('returns all items when no lastItemId and no storedLastUpdated', () => {
    const items = [
      makeItem('v3', '2024-01-03T00:00:00Z'),
      makeItem('v2', '2024-01-02T00:00:00Z'),
      makeItem('v1', '2024-01-01T00:00:00Z'),
    ];
    expect(filterNewItems({ items, lastItemId: null, storedLastUpdated: null })).toHaveLength(3);
  });

  it('returns only items newer than lastItemId', () => {
    const items = [
      makeItem('v4', '2024-01-04T00:00:00Z'),
      makeItem('v3', '2024-01-03T00:00:00Z'),
      makeItem('v2', '2024-01-02T00:00:00Z'),
      makeItem('v1', '2024-01-01T00:00:00Z'),
    ];
    const result = filterNewItems({ items, lastItemId: 'v2', storedLastUpdated: null });
    expect(result).toHaveLength(2);
    expect(result.map((i: any) => i.guid)).toEqual(['v4', 'v3']);
  });

  it('returns empty array when lastItemId is the newest item', () => {
    const items = [
      makeItem('v3', '2024-01-03T00:00:00Z'),
      makeItem('v2', '2024-01-02T00:00:00Z'),
      makeItem('v1', '2024-01-01T00:00:00Z'),
    ];
    expect(filterNewItems({ items, lastItemId: 'v3', storedLastUpdated: null })).toHaveLength(0);
  });

  it('stops at the date boundary (break not continue)', () => {
    const items = [
      makeItem('v4', '2024-01-04T00:00:00Z'),
      makeItem('v3', '2023-12-01T00:00:00Z'),
      makeItem('v2', '2023-11-01T00:00:00Z'),
    ];
    const result = filterNewItems({
      items,
      lastItemId: 'v2',
      storedLastUpdated: '2024-01-01T00:00:00Z',
    });
    expect(result).toHaveLength(1);
    expect(result[0].guid).toBe('v4');
  });

  it('does not include stale items when lastItemId was deleted', () => {
    const items = [
      makeItem('v4', '2024-01-04T00:00:00Z'),
      makeItem('v3', '2023-12-01T00:00:00Z'),
      makeItem('v1', '2023-11-01T00:00:00Z'),
    ];
    const result = filterNewItems({
      items,
      lastItemId: 'deleted-guid',
      storedLastUpdated: '2024-01-01T00:00:00Z',
    });
    expect(result).toHaveLength(1);
    expect(result[0].guid).toBe('v4');
  });

  it('returns empty array for an empty feed', () => {
    expect(
      filterNewItems({ items: [], lastItemId: 'v1', storedLastUpdated: '2024-01-01T00:00:00Z' }),
    ).toHaveLength(0);
  });

  it('returns empty array when lastItemId matches the only item', () => {
    const items = [makeItem('v1', '2024-01-01T00:00:00Z')];
    expect(filterNewItems({ items, lastItemId: 'v1', storedLastUpdated: null })).toHaveLength(0);
  });
});

describe('test() slice behaviour', () => {
  it('slice(0, 1) on a 15-item feed returns exactly 1 item (the newest)', () => {
    const feed = Array.from({ length: 15 }, (_, i) => {
      const n = 15 - i;
      return makeItem('v' + n, '2024-01-' + String(n).padStart(2, '0') + 'T00:00:00Z');
    });
    const result = feed.slice(0, 1);
    expect(result).toHaveLength(1);
    expect(result[0].guid).toBe('v15');
  });
});
