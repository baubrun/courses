import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({

  palette: {
    primary: {
      light: "#6a4f4b",
      main: "#3e2723",
      dark: "#1b0000",
      contrastText: "#fff",
    },
    secondary: {
      light: "#64d8cb",
      main: "#26a69a",
      dark: "#00766c",
      contrastText: "#fafafa",
    },
    openTitle: "#3e2723",
    type: "light",
  },
});

export default theme;
