import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) return 'react-dom';
            if (id.includes('react')) return 'react-core';
            if (id.includes('redux') || id.includes('@reduxjs/toolkit'))
              return 'redux';
            if (id.includes('chart.js') || id.includes('react-chartjs-2'))
              return 'charts';
            return 'vendor';
          }

          if (id.includes('/pages/blog/')) return 'blog';
          if (id.includes('/pages/user/')) return 'user';
          if (id.includes('/pages/file/')) return 'file';
          if (id.includes('/pages/todo/')) return 'todo';
          if (id.includes('/pages/auth/')) return 'auth';
          if (id.includes('/pages/about/')) return 'about';

          return null;
        },
      },
    },
  },
});
