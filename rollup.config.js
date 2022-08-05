import del from 'rollup-plugin-delete'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/main.min.js',
    format: 'esm' // 浏览器端
  },
  plugins: [
    del({ targets: 'dist/*' }),
    terser()
  ]
};
