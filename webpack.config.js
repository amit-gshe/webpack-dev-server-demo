const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.js",
  mode: "development",
  devtool: "source-map",
  optimization: {
    chunkIds: "named",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: (module) => {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `vendor-${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
  output: {
    filename: "[name]-[contenthash:6].js",
    chunkFilename: (pathData) => {
      const name = pathData.chunk.id
        .replace(/^src_/, "")
        .replace(/_ts$/, "")
        .replace(/_/g, "/");
      return `${name}-[contenthash:6].js`;
    },
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 3000,
    writeToDisk: true,
    staticOptions: {
      etag: false,
      immutable: true,
      maxAge: "7 days",
    },
  },
  plugins: [new HtmlWebpackPlugin()],
};
