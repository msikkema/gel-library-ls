import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming"
import roTheme from "@reachout/mui-style"

/**
 * These are global decorators,
 * in this case it allows ReachOut's theme provider to work
 * correct with Storybook.
 */
export const decorators = [
  (Story) => (
    <EmotionThemeProvider theme={roTheme}>
      <ThemeProvider theme={roTheme}>
        <Story />
      </ThemeProvider>
    </EmotionThemeProvider>
  ),
];
