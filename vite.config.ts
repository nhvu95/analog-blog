/// <reference types="vitest" />
import {defineConfig} from 'vite';
import {fileURLToPath, URL} from "url";
import analog from '@analogjs/platform';
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
  publicDir: 'src/assets',
  cacheDir: "./cache",
  build: {
    target: ['es2020']
  },
  ssr: {
    noExternal: ['ng-zorro-antd/**', '@ant-design/**', 'prismjs/**']
  },
  resolve: {
    mainFields: ['module'],
    alias: [
      {find: '@shared', replacement: fileURLToPath(new URL('./src/app/shared/shared-ui/', import.meta.url))},
      {find: '@models', replacement: fileURLToPath(new URL('./src/app/shared/models/', import.meta.url))},
    ],
  },
  plugins: [analog({
    ssr: true,
    // static: true,
    entryServer: '/src/main.server.ts',
    prerender: {
      routes: async () => [
        '/about-me',
        '/creative',
        '/career'
      ],
    },
    vite: {
      inlineStylesExtension: 'scss',
      tsconfig:
        mode === 'test'
          ? './tsconfig.spec.json'
          : './tsconfig.app.json',
    },
    // nitro: {
    //   esbuild: {
    //     options: {target:['es2020']}
    //   },
    //   prerender: {
    //     routes: [
    //       '/about-me',
    //       '/creative',
    //       '/career'
    //     ]
    //   },
    // },
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
