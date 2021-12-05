// import { configure } from "@storybook/react";

// const req = require.context("../src", true, /\.story\.(ts|tsx)$/);

// configure(() => {
//   req.keys().forEach(fn => req(fn))
// }, module);

module.exports = {
  stories: [
    "../**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ]
};