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
      light: "#819ca9",
      main: "#546e7a",
      dark: "#29434e",
      contrastText: "#fafafa",
    },
    openTitle: "#3e2723",
    type: "light",
  },
});

export default theme;
