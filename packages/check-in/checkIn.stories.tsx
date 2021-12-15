import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CheckIn from "./index";

export default {
  title: "checkIn",
  component: CheckIn,
} as ComponentMeta<typeof CheckIn>;

export const Primary: ComponentStory<typeof CheckIn> = () => <CheckIn />;
