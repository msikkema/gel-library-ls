# ReachOut's Gel Library LS

This is a Lerna and Storybook version (hence the LS) of the Bit.dev component library used by ReachOut.

## Requirements
- Yarn
- Node 16.13.0

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

## Adding a new component

```
yarn add-component
```

Then follow the onscreen prompts.

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

### Lerna
### Storybook
### Typescript and Compilation