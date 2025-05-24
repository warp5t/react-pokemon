import { modalSwitch } from './showModal';
import { vi, describe, it, expect, afterEach } from 'vitest';

// Мокаем классList
const mockClassList = {
  toggle: vi.fn(),
};

// Мокаем document.getElementById
const mockGetElementById = vi.fn(() => ({
  classList: mockClassList,
}));

// Подменяем глобальный document
beforeAll(() => {
  global.document.getElementById = mockGetElementById;
});

// Очищаем моки после каждого теста
afterEach(() => {
  vi.clearAllMocks();
});

describe('modalSwitch', () => {
  it('вызывает переданную функцию с инвертированным значением', () => {
    const mockSetState = vi.fn();
    const initialStatus = true;

    modalSwitch(mockSetState, initialStatus);

    expect(mockSetState).toHaveBeenCalledTimes(1);
    expect(mockSetState).toHaveBeenCalledWith(expect.any(Function));

    // Проверяем, что функция действительно инвертирует значение
    const updater = mockSetState.mock.calls[0][0];
    expect(updater(initialStatus)).toBe(false);
  });

  it('переключает CSS-класс у элемента body', () => {
    const mockSetState = vi.fn();
    modalSwitch(mockSetState, true);

    expect(mockGetElementById).toHaveBeenCalledWith('body');
    expect(mockClassList.toggle).toHaveBeenCalledTimes(1);
  });

  it('не вызывает toggle, если элемент body не найден', () => {
    // Переопределяем мок, чтобы вернул null
    mockGetElementById.mockReturnValueOnce(null);
    const mockSetState = vi.fn();

    modalSwitch(mockSetState, true);

    expect(mockGetElementById).toHaveBeenCalledWith('body');
    expect(mockClassList.toggle).not.toHaveBeenCalled();
  });

  it('не вызывает setState, если функция не передана', () => {
    const mockSetState = undefined as unknown as React.Dispatch<React.SetStateAction<boolean>>;
    modalSwitch(mockSetState, true);

    expect(mockGetElementById).toHaveBeenCalledWith('body');
    expect(mockClassList.toggle).toHaveBeenCalledTimes(1);
  });
});