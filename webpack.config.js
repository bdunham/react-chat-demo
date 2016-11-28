const path = require('path');
const webpack = require('webpack');

const plugins = [
  new webpack.ProvidePlugin({
    React: 'react',
    ReactDOM: 'react-dom'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.HotModuleReplacementPlugin()
];

module.exports = {
  context: __dirname,
  entry: {
    js: './app/main.js'
  },
  output: {
    path: path.join(__dirname, 'static', 'javascripts'),
    filename: 'chat.dist.js',
    publicPath: '/docs'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', ['es2015', { "loose": true, "modules": false }]],
          plugins: ["transform-decorators-legacy", "transform-class-properties"]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  plugins,
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    port: 8080,
    compress: false,
    inline: true,
    hot: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      }
    }
  }
};