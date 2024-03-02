import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { Cache } from './cache.interface';

describe('LFU Cache', () => {
  test('returns null for unknown keys', () => {
    const lfuCache: Cache = LFUCache.ofSize(1);
    const unknownKey = lfuCache.get('unknown');
    assert.equal(unknownKey, null);
  });
  test.todo('returns the value for known keys');
  test.todo('evicts the least frequently used key when at capacity');
});

class LFUCache implements Cache {
  constructor(private readonly size: number) {}

  get(key: string): string | null {
    return null;
  }
  set(key: string, value: string): void {
    throw new Error('Method not implemented.');
  }
  del(key: string): void {
    throw new Error('Method not implemented.');
  }

  public static ofSize(size: number) {
    return new LFUCache(size);
  }
}