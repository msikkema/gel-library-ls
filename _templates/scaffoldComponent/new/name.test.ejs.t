---
to: packages/<%= paramCase %>/__tests__/<%= camelCase %>.test.tsx
force: true
---

import React from "react";
import { render, screen } from '@testing-library/react';
import <%= pascalCase %> from "../index";

describe("<%= paramCase %>", () => {
  it("should render", () => {
    render(<<%= pascalCase %> />);
    
    expect(screen).toBeDefined();
  });
});