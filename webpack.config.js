const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  output: { path: path.resolve(__dirname, "dist"), filename: "bundle.js" },
  target: "web",
  devServer: {
    port: 3000,
    static: ["./dist"],
    open: true,
    hot: true,
    liveReload: true,
  },
  resolve: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
        },
        exclude: /node_modules/,
      },
      { test: /\.tsx?$/, exclude: /node_modules/, use: "ts-loader" },
      {
        test: /.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HTMLWebpackPlugin({ template: "./public/index.html" })],
};
