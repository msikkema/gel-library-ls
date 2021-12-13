---
to: packages/<%= paramCase %>/__tests__/<%= camelCase %>.test.ts
force: true
---
import <%= pascalCase %> from "../index";

describe("<%= paramCase %>", () => {
  it("should a fun message", () => {
    const message = "say a fun message";
    const result = <%= pascalCase %>(message);

    expect(result).toEqual(`You said: "${message}"`)
  });
});