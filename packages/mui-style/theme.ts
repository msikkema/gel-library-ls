import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0, 115, 207)"
    }
  },
  typography: {
    fontSize: 16,
    button: {
      textTransform: "none",
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
        }
      }
    }
  }
});

export default theme;