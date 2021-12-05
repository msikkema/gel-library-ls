import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextInput from "./index";

export default {
    title: "TextInput",
    component: TextInput,
} as ComponentMeta<typeof TextInput>;

export const Primary: ComponentStory<typeof TextInput> = () => <TextInput />;