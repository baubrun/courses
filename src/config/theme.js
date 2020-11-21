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
      light: "#6effff",
      main: "#00e5ff",
      dark: "#00b2cc",
      contrastText: "#000",
    },
    openTitle: "#3e2723",
    type: "light",
  },
});

export default theme;
