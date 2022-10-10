const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
module.exports = merge(common, {
  mode: "development",
  devServer: {
    static: path.join(__dirname, "public/"),
    port: 3000,
    historyApiFallback: true,
  },
});
