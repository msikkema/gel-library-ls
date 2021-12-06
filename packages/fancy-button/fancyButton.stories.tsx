import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import FancyButton from "./index";

export default {
    title: "fancyButton",
    component: FancyButton,
} as ComponentMeta<typeof FancyButton>;

export const Primary: ComponentStory<typeof FancyButton> = () => <FancyButton />;
