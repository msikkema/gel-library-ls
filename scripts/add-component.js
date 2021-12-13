#!/usr/bin/env node
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * This file adds a lerna-managed component for ReachOut's Gel library.
 * For utilities, see the add-utility script
 */
const inquirer = require("inquirer");
const rimraf = require("rimraf");
const { execSync } = require("child_process");
const { pascalCase, sentenceCase, paramCase } = require("change-case");
const editJsonFile = require("edit-json-file");

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
        if (!camelCase) {
          console.error("\nMaaaaate.\n\nThe name for the component cannot be empty.\n\nsrsly.\n");
        }
        else if (confirm) {
          const asPascalCase = pascalCase(camelCase);
          const asSentenceCase = sentenceCase(camelCase);

          // Use Lerna to add the new sub package
          execSync(`yarn lerna create @reachout/${asParamCase} --access "restricted" --description "${description}" --yes`, { stdio: 'inherit' });

          const componentPackageJson = editJsonFile(`./packages/${asParamCase}/package.json`);
          // Change the main param of the new component's package.json
          componentPackageJson.set("main", "dist/index.js");
          // Set the entire dist folder to be included for distribution
          componentPackageJson.set("files", [ "dist/*" ]);
          componentPackageJson.save();

          // Nuke the Lerna scaffolding pieces we don't want
          rimraf.sync(`./packages/${asParamCase}/__tests__/*.js`);
          rimraf.sync(`./packages/${asParamCase}/lib`);

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
