const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      assets: path.resolve(__dirname, "./src/assets"),
      examples: path.resolve(__dirname, "./src/examples"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      api: path.resolve(__dirname, "./src/api"),
      pages: path.resolve(__dirname, "./src/pages"),
      context: path.resolve(__dirname, "./src/context"),
      translations: path.resolve(__dirname, "./src/translations"),
      components: path.resolve(__dirname, "./src/components"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist",
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CompressionPlugin({
      threshold: 1024,
      minRatio: 0.8,
    }),
    new DotenvWebpackPlugin(),
  ],
};
