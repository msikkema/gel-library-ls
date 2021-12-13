import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RoButton from "./index";
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming"
import roTheme from "@reachout/mui-style"


export default {
  title: "roButton",
  component: RoButton,
  decorators: [Story => (
    <EmotionThemeProvider theme={roTheme}>
      <ThemeProvider theme={roTheme}>
        <Story />
      </ThemeProvider>
    </EmotionThemeProvider>
  )]
} as ComponentMeta<typeof RoButton>;

export const Primary: ComponentStory<typeof RoButton> = () => (
  <RoButton variant="contained">Here is some text</RoButton>
);
