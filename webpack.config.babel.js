import { resolve } from 'path'

const PATHS = {
  build: resolve(__dirname, 'dist'),
  nodeModules: resolve(__dirname, 'node_modules'),
  src: resolve(__dirname, 'src'),
}

export default {
  entry: './index.js',
  output: {
    path: PATHS.build,
    filename: 'index.js',
    library: 'blueq-redux-form',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          PATHS.src,
        ],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      PATHS.nodeModules,
      PATHS.src,
    ],
    extensions: ['.js', '.jsx'],
    enforeExtension: false,
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
    maxEntryPointSize: 400000,
  },
  devtool: 'source-map',
  context: PATHS.src,
  externals: [
    'immutable',
    'react',
    'react-redux',
    'redux',
  ],
}
