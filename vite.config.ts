
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포 시 서브패스 경로를 지정합니다.
  base: '/Legal-working-simulation/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
