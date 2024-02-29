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
  test('evicts the least recently used key when at capacity', () => {
    // Arrange
    const cache: Cache = LRUCache.ofSize(2);
    cache.set('A', '1');
    cache.set('B', '2');
    cache.set('C', '3');

    // Act
    const leastRecentlyValue = cache.get('1');

    // Assert
    assert.equal(leastRecentlyValue, null);
    assert.equal(cache.get('C'), '3');
  });
});

class LRUCache implements Cache {
  private readonly cache: Map<string, string> = new Map();
  private readonly keys: string[] = [];

  private constructor(private size: number) {}

  get(key: string): string | null {
    return this.cache.get(key) ?? null;
  }
  set(key: string, value: string): void {
    if (this.cache.size === this.size) {
      const key = this.keys.shift();
      this.cache.delete(key as string);
    }
    this.cache.set(key, value);
    this.keys.push(key);
  }
  del(key: string): void {
    this.cache.delete(key);
  }
  public static ofSize(size: number): Cache {
    return new LRUCache(size);
  }
}
