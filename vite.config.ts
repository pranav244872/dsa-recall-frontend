import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// Read environment variables (injected via docker-compose)
const certPath = process.env.CERT_FILE_PATH;
const keyPath = process.env.KEY_FILE_PATH;
const backendHost = process.env.SERVER_HOST || 'localhost';
const backendPort = process.env.SERVER_PORT || '3000';
const clientPort = process.env.CLIENT_PORT || '5173';

// Build backend target URL
const backendTarget = `https://${backendHost}:${backendPort}`;

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(clientPort),
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    proxy: {
      '/api': {
        target: backendTarget,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
