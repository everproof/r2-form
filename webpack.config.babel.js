const resolve = require('path').resolve

const PATHS = {
  build: resolve(__dirname, 'dist'),
  nodeModules: resolve(__dirname, 'node_modules'),
  src: resolve(__dirname, 'src'),
}

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react',
}

const reduxExternal = {
  root: 'Redux',
  commonjs2: 'redux',
  commonjs: 'redux',
  amd: 'redux',
}

const reactReduxExternal = {
  root: 'ReactRedux',
  commonjs2: 'react-redux',
  commonjs: 'react-redux',
  amd: 'react-redux',
}

module.exports = {
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
    enforceExtension: false,
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
  },
  devtool: 'source-map',
  context: PATHS.src,
  externals: {
    react: reactExternal,
    redux: reduxExternal,
    'react-redux': reactReduxExternal,
  },
}
