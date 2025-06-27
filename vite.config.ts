import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
