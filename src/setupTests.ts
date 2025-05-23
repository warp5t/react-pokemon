import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Очистка после каждого теста
afterEach(() => {
  cleanup();
});