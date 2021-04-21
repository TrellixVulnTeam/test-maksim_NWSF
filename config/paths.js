const path = require('path')

module.exports = {
  // Source files
  // Исходные файлы
  src: path.resolve(__dirname, '../src'),

  // Production build files
  // Файлы производственной сборки
  build: path.resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  // Статические файлы, которые копируются в папку сборки
  public: path.resolve(__dirname, '../public'),
}
