---
to: packages/<%= paramCase %>/tsconfig.json
force: true
---

{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "exclude": [
    "node_modules",
    "lib",
    "dist",
    "__tests__"
  ]
}