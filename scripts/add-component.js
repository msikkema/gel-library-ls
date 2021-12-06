#!/usr/bin/env node

const inquirer = require("inquirer");
const rimraf = require("rimraf");
const { execSync } = require("child_process");
const { pascalCase, sentenceCase, paramCase } = require("change-case");

inquirer
  .prompt([
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
  ])
  .then(({ camelCase, description }) => {

    const asParamCase = paramCase(camelCase);

    inquirer
      .prompt([{
        type: "confirm",
        name: "confirm",
        message: `A new component will be made in the folder /packages/${asParamCase}, with the package name @reachout/${asParamCase}.
          FYI npm Package names are supposed to be param-case.
          \nAre you sure?`
      }])
      .then(({ confirm }) => {
        console.log(confirm);

        if (confirm) {
          const asPascalCase = pascalCase(camelCase);
          const asSentenceCase = sentenceCase(camelCase);

          console.log({ camelCase, asPascalCase, asSentenceCase });

          // Use Lerna to add the new sub package
          execSync(`yarn lerna create @reachout/${asParamCase} --access "restricted" --description "${description}" --yes`, { stdio: 'inherit' });

          // Nuke the Lerna scaffolding pieces we don't want
          rimraf.sync(`./packages/${asParamCase}/__tests__/*.js`);

          // Use Hygen to fill in the component scaffolding
          execSync(
            `yarn hygen scaffoldComponent new --camelCase ${camelCase} --pascalCase ${asPascalCase} --sentenceCase ${asSentenceCase} --paramCase ${asParamCase}`,
            { stdio: 'inherit' }
          );
        } else {
          console.log("Aborting...");
        }
      });
  });
