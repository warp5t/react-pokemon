// modalSwitch.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { modalSwitch } from './showModal';
import style from '../components/Pokemons/Pokemons.module.css';

describe('modalSwitch', () => {
  let mockFn: ReturnType<typeof vi.fn>;
  let bodyElement: HTMLElement;

  beforeEach(() => {
    mockFn = vi.fn();
    bodyElement = document.createElement('div');
    bodyElement.id = 'body';
    bodyElement.classList.toggle = vi.fn();
    document.body.appendChild(bodyElement);
  });

  it('should toggle state using fn', () => {
    modalSwitch(mockFn, true);
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should toggle class on body element', () => {
    modalSwitch(mockFn, true);
    expect(bodyElement.classList.toggle).toHaveBeenCalledWith(style.scrollStop);
  });

  it('should not throw if body element is not found', () => {
    document.body.removeChild(bodyElement);
    expect(() => modalSwitch(mockFn, true)).not.toThrow();
  });
});
