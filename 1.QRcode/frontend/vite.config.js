import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
    server: mode === 'development' ? {
        proxy: {
            '/api': {
                target: 'https://api.qr-code-generator.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    } : {}
}));
