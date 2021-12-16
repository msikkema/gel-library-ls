import React, { FC, ReactElement } from "react"
import { render, RenderOptions } from "@testing-library/react"
import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming"
import roTheme from "@reachout/mui-style"

const WithTheme: FC = ({ children }) => {
  return (
    <EmotionThemeProvider theme={roTheme}>
      <ThemeProvider theme={roTheme}>
        {children}
      </ThemeProvider>
    </EmotionThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: WithTheme, ...options })

export * from "@testing-library/react"
export { customRender as render }