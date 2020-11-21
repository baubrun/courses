import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import Routers from "./components/Routers";
import theme from "./config/theme";

const App = () => {


  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routers />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
