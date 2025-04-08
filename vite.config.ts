import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  base: '/',
  plugins: [
    react(), 
    svgr(),
    nodePolyfills({
      // Enable polyfills for `process`
    }),
  ],
  build: {
    outDir: 'build'
  }
})