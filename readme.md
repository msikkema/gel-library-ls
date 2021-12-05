### IN progress! ###

## Notes for writing the final readme ##

Remember package names need to be prefixed:

```
one thing to note when setting the name. You just change into the directory:

cd packages && mkdir my-monorepo-ui-lib && cd my-monorepo-ui-lib

And initialize a package:

yarn init

But with the name @my-org/my-monorepo-ui-lib. This is using a feature called npm organization scope and requires you to set up an organization with npmjs.com if you want to publish as the @my-org organization.
```

```
Yarn does not install peer dependencies, so you need to install them yourself

the peer dependencies are also defined as dev dependencies so we can develop locally
```

```
registry=http://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
@ourscope:registry=https://registry.npmjs.org/
```