import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { Link,  } from "react-router-dom";


import AuthOptions from "./AuthOptions";


const Menu = () => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
        LA CLASSE
        </Typography>
        <Link to="/">
          <IconButton style={{ color: "white" }}>
            <HomeIcon />
          </IconButton>
        </Link>
        <AuthOptions />
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
