const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components/'),
      Contexts: path.resolve(__dirname, 'src/contexts/'),
      Hooks: path.resolve(__dirname, 'src/hooks/'),
      Utils: path.resolve(__dirname, 'src/utils/'),
      Constants: path.resolve(__dirname, 'src/constants/'),
      Assets: path.resolve(__dirname, 'src/assets/'),
      Configs: path.resolve(__dirname, 'src/configs/'),
    },
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.s[ac]ss|css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.png|svg|jpg|gif|otf|ttf|woff|eot$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
}
