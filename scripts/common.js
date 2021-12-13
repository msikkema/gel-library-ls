/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { pascalCase, sentenceCase, paramCase } = require("change-case");

const componentNameSteps = [
  {
    type: "input",
    name: "camelCase",
    message: "Please enter the name for the new component (wihout @reachout), inCamelCasePlease and press ENTER"
  },
  {
    type: "input",
    name: "description",
    message: "Please enter a one line description for this component and press ENTER"
  }
];

const componentNameConfirmation = camelCase => [
  {
    type: "confirm",
    name: "confirm",
    message: `A new component will be made in the folder /packages/${paramCase(camelCase)}, with the package name @reachout/${paramCase(camelCase)}.
      FYI npm package names are supposed to be param-case, and the source files will be camelCase
      \nAre you sure?`
  }
];

const caseGenerator = camelCase => ({
  camelCase,
  asParamCase: paramCase(camelCase),
  asPascalCase: pascalCase(camelCase),
  asSentenceCase: sentenceCase(camelCase)
});

module.exports = { componentNameSteps, caseGenerator, componentNameConfirmation };
