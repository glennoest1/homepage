import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const backendUrl = process.env.VITE_BACKEND_URL || 'http://localhost:8080';
const frontendPort = Number(process.env.FRONTEND_PORT || 5173);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: frontendPort,
    proxy: {
      '/api': backendUrl
    }
  }
});
