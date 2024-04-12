const rspack = require('@rspack/core')
/** @type {import('@rspack/cli').Configuration} */

const config = {
  entry: './src/app/page.tsx',
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: 'ts-loader',
        exclude: [/node_modules/],
        loader: 'builtin:swc-loader',
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: 'typescript'
            }
          }
        },
        type: 'javascript/auto'
      }
    ]
  }
}

module.exports = config
