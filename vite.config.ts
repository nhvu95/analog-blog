/// <reference types="vitest" />
import {defineConfig} from 'vite';
import {fileURLToPath, URL} from 'url';
import analog from '@analogjs/platform';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';
import * as fs from 'node:fs';
import type {Nitro} from 'nitropack';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  cacheDir: './cache',
  build: {
    target: ['es2020'],
  },
  ssr: {
    noExternal: ['ng-zorro-antd/**', '@ant-design/**', 'prismjs/**'],
  },
  resolve: {
    mainFields: ['module'],
    alias: [
      {
        find: '@shared',
        replacement: fileURLToPath(
          new URL('./src/app/shared/shared-ui/', import.meta.url)
        ),
      },
      {
        find: '@models',
        replacement: fileURLToPath(
          new URL('./src/app/shared/models/', import.meta.url)
        ),
      },
    ],
  },
  plugins: [
    analog({
      ssr: true,
      // static: true,
      entryServer: '/src/main.server.ts',
      prerender: {
        routes: async () => ['/about-me', '/creative', '/career'],
      },
      vite: {
        inlineStylesExtension: 'scss',
        tsconfig:
          mode === 'test' ? './tsconfig.spec.json' : './tsconfig.app.json',
      },
      nitro: {
        hooks: {
          compiled(nitro: Nitro) {
            const packages = [];
            packages.push({
              dest: path.join(
                nitro.options.output.dir,
                'server',
                'node_modules',
                'parse5'
              ),
              src: path.join('.', 'node_modules', 'parse5'),
            });
            packages.push({
              dest: path.join(
                nitro.options.output.dir,
                'server',
                'node_modules',
                'entities'
              ),
              src: path.join('.', 'node_modules', 'entities'),
            });
            try {
              packages.forEach((pack) => {
                console.log('try to cp', pack.src, pack.dest);
                fs.cpSync(pack.src, pack.dest, {
                  force: true,
                  recursive: true,
                });
              });
            } catch (err) {
              console.log(err);
            }
          },
        },
      },
    }),
    tsconfigPaths(),
  ],
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
