const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const resolvePath = (p) => path.resolve(__dirname, p);
module.exports = {
  entry: resolvePath("src/main.js"),
  output: {
    path: undefined,
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hash:10][ext][query]",
    filename: "static/js/[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s(c|a)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath("public/index.html"),
    }),
    new ESLintPlugin({
      context: resolvePath("src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: resolvePath("../node_modules/.cache/eslint-cache"),
    }),
  ],
  devServer: {
    host: "localhost",
    static: {
      directory: resolvePath("public"),
    },
    compress: true,
    port: 7777,
    historyApiFallback: true,
  },
  mode: "development",
};
