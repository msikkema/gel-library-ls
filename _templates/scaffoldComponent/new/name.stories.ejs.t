---
to: packages/<%= paramCase %>/<%= camelCase %>.stories.tsx
force: true
---
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import <%= pascalCase %> from "./index";

export default {
  title: "<%= camelCase %>",
  component: <%= pascalCase %>,
} as ComponentMeta<typeof <%= pascalCase %>>;

export const Primary: ComponentStory<typeof <%= pascalCase %>> = () => <<%= pascalCase %> />;
