#!/usr/bin/env node

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * This file adds a lerna-managed utility for ReachOut's Gel library.
 * For components, see the add-component script.
 * 
 * Utilities here should be gel-related. For standalone utilities,
 * please create a separate npm package for ReachOut's repository.
 */
const inquirer = require("inquirer");
const rimraf = require("rimraf");
const { execSync } = require("child_process");
const editJsonFile = require("edit-json-file");
const { componentNameConfirmation, componentNameSteps, caseGenerator } = require("./common");

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

          // Use Hygen to build non-component, utility scaffolding
          execSync(
            `yarn hygen addUtility new --camelCase ${camelCase} --pascalCase ${asPascalCase} --sentenceCase ${asSentenceCase} --paramCase ${asParamCase}`,
            { stdio: 'inherit' }
          );

        } else {
          console.log("Aborting...");
        }
      });
  });
