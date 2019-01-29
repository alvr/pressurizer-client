const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
    performance: {
      hints: false,
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.VUE_APP_BACKEND": JSON.stringify(process.env.BACKEND),
      })
    ]
  },
  pwa: {
    name: "Pressurizer",
    msTileColor: "#beabea",
    themeColor: "#beabea",
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/mstile-150x150.png",
    },
  },
};
