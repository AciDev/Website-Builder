const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const extractCSS = new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css",
  ignoreOrder: false
});

module.exports = {
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
              reloadAll: true
            }
          },
          "css-loader",
          "postcss-loader"
        ]
      }
      /*{
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader"
        ]
      }*/
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".js"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/"
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), extractCSS]
};
