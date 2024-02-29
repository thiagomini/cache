# Cache Exercise
This exercise is designed to help you understand how to create a cache from scratch. We'll cover the following types of cache invalidation strategies:

* LRU (Least Recently Used) invalidation
* MRU (Most Recently Used) invalidation
* LFU (Least Frequently Used) invalidation
* TTL (Time To Live) invalidation

## Instructions

Each type of cache invalidation strategy has its own test file. All tests there are pending implementations. Your job is to implement the cache class in each file to make the tests pass.

Hint: Implement the cache class using the `Cache` interface.

## Running the tests

Simply execute `npm run test` to run all tests. Notice that we're using Node's native test runner, so you don't need to install any additional dependencies. Moreover, I recommend you to use node's `assert` module to perform verifications in your tests (as we don't have the `expect` api from jest).
