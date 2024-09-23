import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Używaj tego samego portu w trakcie lokalnego rozwoju
  },
  build: {
    chunkSizeWarningLimit: 500000, // Domyślny limit chunków
  },
});
