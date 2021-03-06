# ReachOut's Gel Library LS

This is a Lerna and Storybook version (hence the LS) of the Bit.dev component library used by ReachOut. It's a monorepo, which is a single project that consists of multiple packages brought together for simplified management, the monorepo tool Lerna allows this to happen.

Storybook is a tool that allows devs and other stakeholders to view and interact with isolated UI elements, in our case those isolated UI elements are the components of our Gel library.

This project includes a number of scripts you can invoke to add components, add utilities, and publish your new component/script to ReachOut's npm account.

## Requirements
- Yarn
- Node 16.13.0 (note v17 seems to have issues)
- EsLint plugin for your text editor recommended

## Installation

You need to log in to ReachOut's npm to use this, get the credentials from 1Pass and login using:

```
npm login
```

Then you can run the setup command for this project:

```
yarn setup
```

If you run into an error, make sure you're using a terminal in admin mode (for Windows). If you've been developing with bit.dev, it has a habit of messing up your `.npmrc` config, see the `troubleshooting` section towards the bottom of this readme.

## Running Storybook

```
yarn story
```
The terminal prompt will then describe where you can view the Storybook server with the Gel Library components running inside.

## Adding a new component and developing

```
yarn add-component
```

Then follow the onscreen prompts.

Note you will be asked if you wish to add `react`, `react-dom`, `@mui/material`, `@emotion/react` and `@emotion/styled`, and the script will do this for you automatically. If you're unsure if you need this, then the answer is probably "yes".

You can run tests with:

```
yarn test
```

## Adding a new utility
This project can host utility functions - but it's not a substitute for creating separate monorepos, and as such only gel-related utilities should be added here. Please consider your needs carefully before adding a new utility package to this project.

To add a new utility:

```
yarn add-utility
```

And then follow the instructions.

## Publishing
This project caters to three use cases for publishing:
1) You don't need to publish, you actually want to use [Yarn Link](https://classic.yarnpkg.com/en/docs/cli/link/) instead. This is your situation if the consuming project and the modified component both live on your local machine.
2) You need to publish a preview version for someone else to ingest
3) You are ready to publish a new component version

Note that for Lerna to function correctly, you need to commit your code before it will allow you to push anything to npm.

### Publishing situation 1:
Make sure you build using `yarn build` and then you can use `yarn link` in the individual package you're developing. [I promise you, it's really easy. Please stop publishing superfluous preview versions. Don't make me come over there.](https://piyushswain.github.io/usage-of-yarn-link/)

*Note* that you _dont_ need to use yarn link if you only need to alter a pair sibling packages within this project, linking is only applicable here for separate projects. [For sibling packages in the same workspace, they are automatically linked as they live in the same workspace.](https://classic.yarnpkg.com/en/docs/workspaces#toc-why-would-you-want-to-do-this). Remember that the linked content is whatever is transpiled to the `./dist` folder in each package, so if you don't see your expected changes in your consuming sibling package, try running `yarn build`.

### Publishing situation 2:
```
yarn canary
```

You will then see an output message describing the name of the package (note it will have a hash on the end). This is a bona-fide hosted on npm published package at this point.

### Publishing situation 3:
If you're _really_ ready to publish your new package(s)

```
yarn publish-components
```

This command will bump all altered components by a major version (So they aren't accidentally ingested by projects elsewhere), and will then use Lerna to push the components to npm.

## How do I ingest a component into a consumer and use it?
This project uses peer dependencies for the components it hosts - this is a dependency that the component requires to work, but the consumer must provide. This means we don't force a consumer to use a particular version of a library, which can cause unintended headaches later down the road.

Individual components may have different peer dependencies, but generally for each React component they will be:

`react` and `react-dom` as the components are React components, and

`@mui/material`, `@emotion/react` and `@emotion/styled` as our components are based on Mui, a React implementation of Material design. Note that we are using Material UI 5+, not the legacy versions prior to 5.

tl;dr: add `react`, `react-dom`, `@mui/material`, `@emotion/react` and `@emotion/styled` to your project.

Our components use Mui's theme provider, which the consumer needs to implement. [You can read about how to implement the ThemeProvider HOC here](https://mui.com/customization/theming/#themeprovider).

Once you've implemented the ThemeProvider HOC, you can use our ReachOut theme from `@reachout/mui-style`.

Example:

Add the HOC, and then add the ReachOut theme as a prop to it:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import roTheme from '@reachout/mui-style';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={roTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Now you can use our gel components like so:

```jsx
import React from 'react';
import RoButton from "@reachout/ro-button";
import './App.css';

function App() {
  return (
    <div className="App">
        <RoButton>Something</RoButton>
    </div>
  );
}

export default App;
```

## Troubleshooting

### Issues runing Setup or Publish
Lerna disliked my `.npmrc` file, I was forced to add ReachOut's scope manually despite being logged in:

```
//registry.npmjs.org/:_authToken=<your npm token should be here after logging in>
@reachout:registry=https://registry.npmjs.org/
```

### The npm packages don't work, are missing imports, or the types are making TS barf in my lap

Make sure the `package.json` for the module is correct - the `main` property needs to point at the transpiled entry point for the module, make sure everything in the dist folder is listed under `files` (although that should be `dist/*` unless you've got a very good reason to change it), and make sure sure TypeScript is actually building your module and including a `*.d.ts` file before you publish it.

### The component doesn't have any styling in Storybook!
I know, [there's a bug](https://github.com/mui-org/material-ui/issues/24282#issuecomment-859393395). The workaround right now is to wrap it in _two_ ThemeProviders, one from Mui and one from Emotion (which Mui uses internall anyway). The `ro-button` story illustrates how to implement this workaround:

```jsx
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RoButton from "./index";
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming"
import roTheme from "@reachout/mui-style"


export default {
  title: "roButton",
  component: RoButton,
  decorators: [Story => (
    <EmotionThemeProvider theme={roTheme}>
      <ThemeProvider theme={roTheme}>
        <Story />
      </ThemeProvider>
    </EmotionThemeProvider>
  )]
} as ComponentMeta<typeof RoButton>;

export const Primary: ComponentStory<typeof RoButton> = () => (
  <RoButton variant="contained">Here is some text</RoButton>
);
```

## Questions:

### Why are stories for components wrapped in two theme providers? Do I need to do this too?
Broadly - No. At the time of building, there is an issue with Storybook's and our Component library's versions of Emotion, [the fix is described here](https://github.com/mui-org/material-ui/issues/24282#issuecomment-859393395).

You may need the double theme provider to get your story to work correctly in Storybook, but you should stick to using the single MUI sanctioned `ThemeProvider` outside of this project.

### I altered the tsconfig.json in the project root and now there is chaos
There are two types of `tsconfig.json` files - one that lives in the root of this project, and multiple versions that live in each individual package. All package level `tsconfig.json`s will inherit their base configuration from the root one, so if you alter that without being careful, you may break multiple packages in the repo.

Try to alter the package level `tsconfig.json` only.

### What's the all the stuff in the _templates folder?

This project uses a library called [Hygen](https://www.hygen.io/) to generate templates for adding components and utilities. When you add a component or utility, the script will invoke Hygen, which will look in the `_templates` folder to instruct it on how to build out the scaffolding.

### I need to publish a non major version

Sure, but you will need to use Lerna directly, use:

```
yarn lerna version
```

which will allow you fine grained control over versioning, and then build the packages:

```
yarn build
```

Which will transpile each npm module into it's associated `./dist` folder, and then you can push to npm using

```
yarn lerna publish
```

## Geekery

### Matt's to do before he absconds to the world of private health insurance:
- Setup works, but `yarn story` is flakey in windows still
- Set up build circleCI pipeline and s3 bucket to host storybook
- Fill out some of the storybook add ons
- Add more information about how cross-linked packages work in a yarn workspace, and how this affects @reachout/mui-style's usage here
- Add some convenience methods around git tagging for lerna
- Add Husky
