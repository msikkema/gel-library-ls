import { createTheme } from "@mui/material/styles";
import { orange, green } from '@mui/material/colors';

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