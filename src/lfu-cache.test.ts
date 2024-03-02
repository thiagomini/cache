import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { Cache } from './cache.interface';

describe('LFU Cache', () => {
  test('returns null for unknown keys', () => {
    const lfuCache: Cache = LFUCache.ofSize(1);
    const unknownKey = lfuCache.get('unknown');
    assert.equal(unknownKey, null);
  });
  test('returns the value for known keys', () => {
    // Arrange
    const lfuCache = LFUCache.ofSize(1);
    lfuCache.set('A', '1');

    // Act
    const value = lfuCache.get('A');

    // Assert
    assert.equal(value, '1');
  });
  test('evicts the least frequently used key when at capacity', () => {
    // Arrange
    const lfuCache = LFUCache.ofSize(3);
    lfuCache.set('A', '1');
    lfuCache.set('B', '2');
    lfuCache.set('C', '3');

    lfuCache.get('A');
    lfuCache.get('B');

    // Act
    lfuCache.set('D', '4');

    // Assert
    const evictedValue = lfuCache.get('C');
    assert.equal(lfuCache.get('C'), null);
    assert.equal(lfuCache.get('D'), '4');
  });

  test.todo('evicts the least recently used key when there is a tie');
});

class LFUCache implements Cache {
  private readonly cache = new Map<string, string>();
  private readonly accessedKeysCount = new Map<string, number>();

  constructor(private readonly size: number) {}

  get(key: string): string | null {
    if (this.accessedKeysCount.has(key)) {
      const countForKey = this.accessedKeysCount.get(key) as number;
      this.accessedKeysCount.set(key, countForKey + 1);
    }
    return this.cache.get(key) ?? null;
  }
  set(key: string, value: string): void {
    if (this.accessedKeysCount.size >= this.size) {
      console.log('Size surpassed limit');
      let leastAccessedKeyAndValue: { key: string; count: number } = {
        key: '',
        count: Infinity,
      };

      for (const [key, count] of this.accessedKeysCount.entries()) {
        if (count < leastAccessedKeyAndValue.count) {
          leastAccessedKeyAndValue.key = key;
          leastAccessedKeyAndValue.count = count;
        }
      }

      console.log(
        'Least used key and count:',
        JSON.stringify(leastAccessedKeyAndValue, null, 2),
      );
      const deleted = this.cache.delete(leastAccessedKeyAndValue.key);
      console.log('Element deleted: ', deleted);
    }

    this.accessedKeysCount.set(key, 0);
    this.cache.set(key, value);
  }
  del(key: string): void {
    throw new Error('Method not implemented.');
  }

  public static ofSize(size: number) {
    return new LFUCache(size);
  }
}