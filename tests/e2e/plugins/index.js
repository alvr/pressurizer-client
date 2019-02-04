const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
  config.env = process.env;

  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.js'],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: [/node_modules/],
            use: [{
              loader: 'ts-loader',
            }],
          },
        ],
      },
    }
  };
  on('file:preprocessor', webpack(options));

  return Object.assign({}, config, {
    fixturesFolder: "tests/e2e/fixtures",
    integrationFolder: "tests/e2e/specs",
    screenshotsFolder: "tests/e2e/screenshots",
    videosFolder: "tests/e2e/videos",
    supportFile: "tests/e2e/support/index.js"
  });
};
