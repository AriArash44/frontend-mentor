import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        https: {
            key: '../localhost-key.pem',
            cert: '../localhost-cert.pem',
        },
        host: 'localhost',
        port: 5173,
    },
});
