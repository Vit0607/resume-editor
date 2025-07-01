import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['uuid']
    }
  },
  resolve: {
    alias: {
      '@app': '/src/app',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@features': '/src/features',
      '@shared': '/src/shared',
      '@styles': 'src/styles',
      '@types': '/src/types',
      '@': '/src'
    }
  }
});
