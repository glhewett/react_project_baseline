jest.unmock('../app/reducers.js');

import { counter } from '../app/reducers.js';

describe('Redux Reducers', () => {

  describe('INCREMENT', () => {

    it('increments state', () => {
      const result = counter(0,  {type: 'INCREMENT', payload: 1})
      expect(result).toBe(1);
    });
  })

  describe('DECREMENT', () => {

    it('decrements state', () => {
      const result = counter(2,  {type: 'DECREMENT', payload: 1})
      expect(result).toBe(1);
    });
  });
});
