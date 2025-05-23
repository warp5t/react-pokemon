import { capitalizing } from "./capitalizer";
import { describe, it, expect } from 'vitest';

describe('capitalizing function', () => {
  it('capitalize first letter of a string', () => {
    expect(capitalizing('jim')).toBe('Jim')
  })
  it('works with empty string', () => {
    expect(capitalizing('')).toBe('');
  })
})