const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

// @ts-check

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname,
  target: 'node',
  entry: {
    main: ['./src/main.ts']
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                decorators: true
              },
              transform: {
                legacyDecorator: true,
                decoratorMetadata: true
              }
            }
          }
        }
      },
      {
        test: /\.node$/,
        use: [
          {
            loader: 'node-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: false
  },
  externalsType: 'commonjs',
  plugins: [
    !process.env.BUILD &&
      new RunScriptWebpackPlugin({
        name: 'main.js',
        autoRestart: false
      }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: 'write-references'
      }
    })
  ].filter(Boolean),
  devServer: {
    devMiddleware: {
      writeToDisk: true
    }
  },
  externals: [
    function (obj, callback) {
      const resource = obj.request
      const lazyImports = [
        '@nestjs/core',
        '@nestjs/microservices',
        '@nestjs/platform-express',
        'cache-manager',
        'class-validator',
        'class-transformer',
        '@nestjs/microservices/microservices-module',
        'socket.io-adapter',
        'utf-8-validate',
        'bufferutil',
        '@mongodb-js/zstd',
        'snappy',
        '@aws-sdk/credential-provider',
        'mongodb-client-encryption',
        '@nestjs/websockets/socket-module',
        'bson-ext',
        'snappy/package.json',
        'aws4',
        '@grpc/grpc-js',
        '@grpc/proto-loader',
        'kafkajs',
        'mqtt',
        'nats',
        'ioredis',
        'amqplib',
        'amqp-connection-manager'
      ]
      if (!lazyImports.includes(resource)) {
        return callback()
      }
      try {
        require.resolve(resource)
      } catch (err) {
        callback(null, resource)
      }
      callback()
    }
  ],
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    poll: true
  }
}

module.exports = config
