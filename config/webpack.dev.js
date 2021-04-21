const webpack = require('webpack')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')
const paths = require('./paths')

module.exports = merge(common, {
  // Set the mode to development or production
  // Установите режим разработки или производства
  mode: 'development',

  // Control how source maps are generated
  // Контролируйте, как генерируются исходные карты
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  // Запускаем сервер для быстрой разработки
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      // Стили: Внедрить CSS в "head" с помощью исходных карт
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: true },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },{
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          {
            use: ['pug-loader']
          }
        ]
      }
    ],
  },

  plugins: [
    // Only update what has changed on hot reload
    // Обновляйте только то, что изменилось при горячей перезагрузке
    new webpack.HotModuleReplacementPlugin(),
  ],
})
