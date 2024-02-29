import { describe, test } from 'node:test';
import { Cache } from './cache.interface';
import assert from 'node:assert/strict';

describe('LRU Cache', () => {
  test('returns null for unknown keys', () => {
    const cache: Cache = LRUCache.ofSize(3);

    assert.equal(cache.get('foo'), null);
  });
  test('returns the value for known keys', () => {
    const cache: Cache = LRUCache.ofSize(3);
    cache.set('foo', 'bar');
    assert.equal(cache.get('foo'), 'bar');
  });
  test.todo('evicts the least recently used key when at capacity');
});

class LRUCache implements Cache {
  private readonly cache: Map<string, string> = new Map();

  private constructor(private size: number) {}

  get(key: string): string | null {
    return this.cache.get(key) ?? null;
  }
  set(key: string, value: string): void {
    this.cache.set(key, value);
  }
  del(key: string): void {
    throw new Error('Method not implemented.');
  }
  public static ofSize(size: number): Cache {
    return new LRUCache(size);
  }
}
