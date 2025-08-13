// frontend/vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Required for DOM APIs
    setupFiles: ['./setupTests.ts'],
    globals: true,
  },
});