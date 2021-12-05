import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import MadeByHygen from "./index";

export default {
    title: "madeByHygen",
    component: MadeByHygen,
} as ComponentMeta<typeof MadeByHygen>;

export const Primary: ComponentStory<typeof MadeByHygen> = () => <MadeByHygen />;
