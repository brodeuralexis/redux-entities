// rollup.config.js
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',

  output: {
    file: './lib/index.js',
    format: 'umd',
    name: 'ReduxOdyssey',
    sourcemap: true
  },

  plugins: [
    typescript({
      typescript: require('typescript'),
      exclude: 'src/**.test.ts'
    })
  ]
}
