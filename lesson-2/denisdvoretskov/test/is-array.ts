/// <reference path="../node_modules/@types/mocha/index.d.ts"/>
import * as assert from 'assert';
import isArray from '../src/node/is-array';

describe('isArray', () => {
  describe('must return false if', () => {
    it('[], 1', () => {
      assert.strictEqual(isArray([], 1), false);
    });

    it('[1, 2]', () => {
      assert.strictEqual(isArray([1, 2]), false);
    });

    it('[1, 2], 1, 2, 3', () => {
      assert.strictEqual(isArray([1, 2], 1, 2, 3), false);
    });
  });

  describe('must return true if', () => {
    it('for numbers [1, 2], 2, 1', () => {
      assert.strictEqual(isArray([1, 2], 2, 1), true);
    });
    it("for strings ['one', 'two'], 'two', 'one'", () => {
      assert.strictEqual(isArray(['one', 'two'], 'two', 'one'), true);
    });
    it('true, false], false, true', () => {
      assert.strictEqual(isArray([true, false], false, true), true);
    });
  });
});
