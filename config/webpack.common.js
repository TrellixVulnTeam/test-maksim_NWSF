const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const paths = require('./paths')

module.exports = {
  // Where webpack looks to start building the bundle
  // Где webpack смотрит, чтобы начать строить пакет (точка входа)
  entry: [paths.src + '/index.js'],

  // Where webpack outputs the assets and bundles
  // Где webpack выводит активы и пакеты
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  // Настройка процесса сборки webpack
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    // Удаляет/очищает папки сборки и неиспользуемые ресурсы при перестройке
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    // Копирует файлы из целевой папки в целевую
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // Generates an HTML file from a template
    // Генерирует HTML - файл из шаблона
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    // Генерирует предупреждение об устаревании: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      //title: 'webpack Boilerplate',
      favicon: paths.src + '/images/favicon.png', //Favicon — значок веб-сайта или веб-страницы. Отображается браузером во вкладке перед названием страницы, а также в качестве картинки рядом с закладкой, во вкладках и в других элементах интерфейса.
      // template: paths.src + '/template.html', // template file (файл шаблона)
      template: paths.src + '/index.pug',
      //template: "src/index.pug",
      filename: 'index.html', // output file (выходной файл)
    }),

    // ESLint configuration
    // Конфигурация ESLint
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      formatter: 'table',
    }),

    // Prettier configuration
    // Более красивая конфигурация
    new PrettierPlugin(),
  ],

  // Determine how modules within the project are treated
  // Определите, как обрабатываются модули в рамках проекта
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      // JavaScript: Используйте Babel для компиляторования файлов JavaScript
      { test: /\.js$/, use: ['babel-loader'] },

      // Images: Copy image files to build folder
      // Images: Копирование файлов изображений в папку сборки
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      // Fonts and SVGs: Встроенные файлы
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
    },
  },
}
