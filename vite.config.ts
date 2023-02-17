/// <reference types="vitest" />
import {defineConfig} from 'vite';
import analog from '@analogjs/platform';
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [analog({
    ssr: true,
    static: true, // prerender pages without building an SSR server
    entryServer: '/src/main.server.ts',
    prerender: {
      routes: async () => [
        '/blog',
        'about-me',
        '/portfolio',
      ],
    },
    vite: {
      inlineStylesExtension: 'scss',
      tsconfig:
        mode === 'test'
          ? './tsconfig.spec.json'
          : './tsconfig.app.json',
    },
  }), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
