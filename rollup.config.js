import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import babili from 'rollup-plugin-babili';
import { dts } from 'rollup-plugin-dts';

const plugins = [
  nodeResolve({
    include: 'node_modules/**',
  }),
  commonjs({ jsnext: false }),
  typescript({
    tsconfig: 'tsconfig.json',
  }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(babili({ comments: false }));
}

export default [
  {
    input: './src/extend-err.ts',
    output: [
      {
        sourcemap: true,
        name: 'ExtendErr',
        file: './dist/extend-err.js',
        format: 'cjs',
      },
    ],
    plugins,
  },
  {
    input: './src/extend-err.ts',
    output: [{ file: 'dist/extend-err.d.ts', format: 'cjs' }],
    plugins: [dts()],
  },
];
