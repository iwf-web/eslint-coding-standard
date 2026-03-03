import {defineConfig} from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/standard-js.ts', 'src/standard-ts.ts'],
  shims: true,
  format: ['esm'],
  exports: true,
});
