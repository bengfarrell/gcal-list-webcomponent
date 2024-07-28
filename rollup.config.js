import { nodeResolve } from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import clean from 'rollup-plugin-clean';

export default {
  input: 'index.js',
  output: {
    file: 'bundle.min.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    clean(),
    nodeResolve(),
    sourcemaps(),
  ],
};
