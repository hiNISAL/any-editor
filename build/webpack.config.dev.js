const merge = require('webpack-merge');
const base = require('./webpack.config.base');

const cssLoaders = [
  'style-loader',
  'css-loader',
];

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    open: true,
  },
});
