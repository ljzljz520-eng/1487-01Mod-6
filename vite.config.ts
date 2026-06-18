import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';
import tokensPlugin from './vite-plugin-tokens';
import { defaultTokens } from './tokens.config';

export default defineConfig({
  plugins: [
    solidPlugin(),
    dts({
      insertTypesEntry: true,
    }),
    tokensPlugin({
      tokens: defaultTokens,
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    target: 'esnext',
    lib: {
      entry: './src/index.ts',
      name: 'SolidWebComponentsUI',
      fileName: (format) => `solid-web-components-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['solid-js'],
      output: {
        globals: {
          'solid-js': 'Solid',
        },
      },
    },
  },
});