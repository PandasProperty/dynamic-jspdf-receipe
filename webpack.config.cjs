const path = require('path')

module.exports = () => {
  const config = {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    mode: 'production',
    resolve: {
      extensions: ['.ts', '.ts', '.js'],
    },
    entry: './src/index.ts',
    output: {
      publicPath: '',
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        name: 'dynamic-jspdf-receipt',
        type: 'umd'
      },
      globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    performance: {
      maxEntrypointSize: 2440000,
      maxAssetSize: 2440000
    }
  }

  return config
}