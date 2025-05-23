import { capitalizing } from "./capitalizer";
import { describe, it, expect } from 'vitest';

describe('capitalizing function', () => {
  it('capitalize first letter of a string', () => {
    expect(capitalizing('jim')).toBe('Jim')
  });
  it('works with empty string', () => {
    expect(capitalizing('')).toBe('');
  });
  it('does nothing if the string already capitalized', () => {
    expect(capitalizing('jim')).toBe('Jim');
  });
  it('handles strings with spaces', () => {
    expect(capitalizing(' jim')).toBe(' jim');
  });
   it('works with special characters', () => {
    expect(capitalizing('1hello')).toBe('1hello');
    expect(capitalizing('@test')).toBe('@test');
  });
})