import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'tvUtils',
    sourcemap: true,
  },
  plugins: [
    resolve({ browser: true, preferBuiltins: true }),
    commonjs(),
    globals(),
    builtins(),
  ],
};
