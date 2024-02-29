import { describe, test } from 'node:test';
import { Cache } from './cache.interface';
import assert from 'node:assert/strict';

describe('LRU Cache', () => {
  test('returns null for unknown keys', () => {
    const cache: Cache = LRUCache.ofSize(3);

    assert.equal(cache.get('foo'), null);
  });
  test.todo('returns the value for known keys');
  test.todo('evicts the least recently used key when at capacity');
});

class LRUCache implements Cache {
  private constructor(private size: number) {}

  get(key: string): string | null {
    return null;
  }
  set(key: string, value: string): void {
    throw new Error('Method not implemented.');
  }
  del(key: string): void {
    throw new Error('Method not implemented.');
  }
  public static ofSize(size: number): Cache {
    return new LRUCache(size);
  }
}
