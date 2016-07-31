jest.unmock('../app/js/actions.js');

import {
  incrementCounter,
  decrementCounter
} from '../app/js/actions.js';

describe('Redux Actions', () => {

  describe('incrementCounter', () => {

    it('create increment action', () => {
      const result = incrementCounter(1);
      expect(result).toEqual({type: 'INCREMENT', payload: 1});
    });
  });

  describe('DECREMENT', () => {

    it('create decrement action', () => {
      const result = decrementCounter(1);
      expect(result).toEqual({type: 'DECREMENT', payload: 1});
    });
  });
});
