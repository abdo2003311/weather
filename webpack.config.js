const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
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
  devServer: {
    static: path.join(__dirname, "public/"),
    port: 3000,
    historyApiFallback: true,
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CompressionPlugin(),
    new Dotenv(),
  ],
};
