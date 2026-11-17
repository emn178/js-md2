import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/md2.mjs',
    output: {
      file: 'build/md2.mjs',
      format: 'es'
    },
    plugins: [commonjs({
      strictRequires: false
    })]
  },
  {
    input: 'build/md2.mjs',
    output: {
      file: 'build/md2.min.mjs',
      format: 'es'
    },
    plugins: [terser()]
  }
];
