import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        https: {
            key: fs.readFileSync('./certs/localhost+2-key.pem'),
            cert: fs.readFileSync('./certs/localhost+2.pem'),
        },
        // Add the proxy configuration here
        proxy: {
            // Proxy requests starting with '/api'
            '/api': {
                // The target is your Go backend server
                target: 'https://localhost:8080',
                // Important for virtual hosted sites
                changeOrigin: true,
                // This is necessary because you're using a self-signed certificate
                secure: false,
            },
        },
    },
});
