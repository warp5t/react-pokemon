import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Для тестирования React-компонентов
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'], // Анализировать только исходники
    },
    setupFiles: './src/setupTests.ts', // Файл с глобальными настройками
  },
});