var path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
     path: path.join(__dirname, '/dist'),
     filename: 'bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {}
          },
          {
            loader: path.resolve('loader.js'),
            options: {
              methodNames: ['render', 'loadData'],
            }
          }
        ]
      }
    ]
  },
}
