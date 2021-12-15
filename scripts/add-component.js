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
const editJsonFile = require("edit-json-file");
const {
  componentNameSteps,
  caseGenerator,
  componentNameConfirmation,
  peersAndDevsForComponents
} = require("./common");


inquirer
  .prompt(componentNameSteps)
  .then(({ camelCase, description }) => {
    const { asParamCase, asPascalCase, asSentenceCase } = caseGenerator(camelCase);

    inquirer
      .prompt(componentNameConfirmation(camelCase))
      .then(({ confirm }) => {
        if (!camelCase) {
          console.error("\nMaaaaate.\n\nThe name for the component cannot be empty.\n\nsrsly.\n");
        }
        else if (confirm) {
          // Use Lerna to add the new sub package
          execSync(`yarn lerna create @reachout/${asParamCase} --access "restricted" --description "${description}" --yes`, { stdio: 'inherit' });

          // Change the main param of the new component's package.json
          const componentPackageJson = editJsonFile(`./packages/${asParamCase}/package.json`);
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

          console.log("Component has been added.");

          inquirer
            .prompt([
              {
                type: "confirm",
                name: "addPeersAndDevs",
                message: "You probably need react, react-dom, @mui/material, @emotion/react and @emotion/styled as peer and dev dependencies for this project. Add them now?"
              }
            ]).then(({ addPeersAndDevs }) => {
              if (addPeersAndDevs) {
                execSync(`yarn --cwd ./packages/${asParamCase} add -D ${peersAndDevsForComponents.join(" ")} && yarn --cwd ./packages/${asParamCase} add -P ${peersAndDevsForComponents.join(" ")}`, { stdio: 'inherit' });
                console.log("\npackages for developing components have been added.");
              }

              // Install and cross link dependencies
              execSync("yarn bootstrap", { stdio: 'inherit' });
            });
        } else {
          console.log("Aborting...");
        }
      });
  });
