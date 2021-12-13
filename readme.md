# ReachOut's Gel Library LS

This is a Lerna and Storybook version (hence the LS) of the Bit.dev component library used by ReachOut.

## Requirements
- Yarn
- Node 16.13.0
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

## Running

```
yarn story
```
The terminal prompt will then describe where you can view the Storybook server with the Gel Library components running inside.

## Adding a new component and developing

```
yarn add-component
```

Then follow the onscreen prompts.

To publish a canary version of your component, you need to commit your code (or Lerna will get angry, and trust me - you won't like that), and then run

```
yarn canary
```

This will then publish a canary version of your component (ie not a mainline version), you may then ingest this canary version where you wish.

*Although* A better option for fast local development is to use [Yarn Link](https://classic.yarnpkg.com/en/docs/cli/link/). Don't forget to run `yarn build` before you link your new package.

You can run tests with:

```
yarn test
```

## Publishing

```
yarn publish-components
```

Will bump all altered components by a major version (So they aren't accidentally ingested by projects elsewhere), and will then use Lerna to push the components to npm.

## Troubleshooting

Lerna disliked my `.npmrc` file, I was forced to add ReachOut's scope manually despite being logged in:

```
//registry.npmjs.org/:_authToken=<your npm token should be here after logging in>
@reachout:registry=https://registry.npmjs.org/
```

## Geekery

### Matt's to do before he absconds to the world of private health insurance:
- Enforce linting
- Enforce testing
- Set up build pipeline and s3 bucket to host storybook

### Lerna
### Storybook
### Typescript and Compilation