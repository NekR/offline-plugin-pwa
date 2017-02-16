const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const OfflinePlugin = require('offline-plugin');

module.exports = {
  context: path.resolve('src'),
  entry: './main.js',
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [
                    require('autoprefixer')({ browsers: ['> 1%', 'IE >= 10'] })
                  ];
                }
              }
            }
          ]
        })
      },
      {
        test: /\.(woff2?|ttf)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ],
      },
      {
        test: /\.svg$/,
        loaders: ['raw-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin([
      { from: 'favicons' }
    ]),
    new OfflinePlugin({
      safeToUseOptionalCaches: true,

      caches: {
        main: [
          'main.js',
          'main.css',
          'index.html'
        ],
        additional: [
          '*.woff',
          '*.woff2'
        ],
        optional: [
          ':rest:'
        ]
      },

      ServiceWorker: {
        events: true
      },
      AppCache: {
        events: true
      }
    })
  ]
};