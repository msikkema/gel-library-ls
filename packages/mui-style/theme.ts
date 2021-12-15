import { createTheme } from "@mui/material/styles";
import { fontFamily } from "./fonts";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0, 115, 207)"
    }
  },
  typography: {
    fontFamily: fontFamily,
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
