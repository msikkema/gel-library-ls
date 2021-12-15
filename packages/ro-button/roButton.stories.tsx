import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RoButton from "./index";

export default {
  title: "roButton",
  component: RoButton
} as ComponentMeta<typeof RoButton>;

export const Primary: ComponentStory<typeof RoButton> = () => (
  <RoButton variant="contained">Here is some text</RoButton>
);
