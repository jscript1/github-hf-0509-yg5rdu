const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
       {
                // Uses regex to test for a file type - in this case, ends with `.css`
                test: /\.css$/,
                // Apply these loaders if test returns true
                use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: false,
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: 'extracted-comments.js',
          banner(licenseFile) {
            return `License information can be found in ${licenseFile}`;
          },
        },
      }),
    ],
  },
};