import { swc } from 'rollup-plugin-swc3'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/bundle.mjs',
      format: 'es',
    },
    {
      file: 'lib/bundle.cjs',
      format: 'cjs',
    },
  ],
  plugins: [
    swc({
      tsconfig: false,
      jsc: {
        target: 'es2020',
      },
      minify: true,
    }),
  ],
}
