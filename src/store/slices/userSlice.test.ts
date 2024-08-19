import { describe, it, expect } from 'vitest';
import { setUserName, setUserAge } from './userSlice';
import { store } from '../store';

describe('Redux Store', () => {
    it('should have initial state', () => {
      const state = store.getState();
      expect(state.user.name).toBe(''); // Default name is empty
      expect(state.user.age).toBe(0);    // Default age is 0
    });
  
    it('should update state when actions are dispatched', () => {
      store.dispatch(setUserName('Alice'));
      store.dispatch(setUserAge(25));
  
      const state = store.getState();
      expect(state.user.name).toBe('Alice'); // Name should now be Alice
      expect(state.user.age).toBe(25);       // Age should now be 25
    });
  });