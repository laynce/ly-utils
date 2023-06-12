/*eslint-disable*/
const fs = require('fs')
const replace = require('@rollup/plugin-replace')

const defaultReg = /\/moment-util\.js$/

// 针对vite+ andv1版本日期选择框加上默认值时会报momentjs的错误，
const exportFn = (reg = defaultReg) => {
  return {
    name: 'vite-plugin-antdv1-momentjs-resolver',
    configResolved (config) {
      //  以来预构建时候替换 esbuild
      const { esbuildOptions } = config.optimizeDeps
      esbuildOptions.plugins ||= []
      esbuildOptions.plugins.push({
        name: 'replace-code',
        setup (build) {
          build.onLoad(
            {
              filter: reg
            },
            (args) => {
              // 首先获取源代码内容
              let source = fs.readFileSync(args.path, 'utf8')
              if (source.indexOf('import * as moment from')) {
                source = source.replace(
                  /import\s\*\sas\smoment\sfrom/g,
                  'import moment from'
                )
              }
              return {
                contents: source
              }
            }
          )
        }
      })

      //  添加打包时的替换 rollup
      config.plugins.push(
        replace({
          values: {
            'import * as moment from': (id) => {
              return 'import moment from'
            }
          },
          include: [reg],
          preventAssignment: true
        })
      )
    }
  }
}

export default exportFn

// vite.config.js中使用如:

  // ```

  // import AntdMomentResolver from './vite-plugin-antdv1-momentjs-resolver'

  // plugins[
  //   AntdMomentResolver(/\.js$/),
  // ]
  // ```
