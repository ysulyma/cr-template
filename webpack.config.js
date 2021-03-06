const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: "bundle.js",
    path: __dirname
  },

  externals: {
    "ractive-player": "RactivePlayer",
    "react": "React",
    "react-dom": "ReactDOM",
  },

  mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "ts-loader"
      }
    ],
  },

  // necessary due to bug in old versions of mobile Safari
  devtool: false,

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          safari10: true
        }
      })
    ],
    emitOnErrors: true
  },
  
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@env": path.join(__dirname, "src", process.env.NODE_ENV)
    }
  }
};
