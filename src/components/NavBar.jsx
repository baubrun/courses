import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from '@material-ui/core/CssBaseline';
import HomeIcon from "@material-ui/icons/Home";
import { Link,  } from "react-router-dom";


import NavbarOptions from "./NavbarOptions";


const NavBar = () => {

  return (
    <AppBar position="static">
       <CssBaseline />
      <Toolbar>
        <Typography variant="h6" color="inherit">
        LA CLASSE
        </Typography>
        <Link to="/">
          <IconButton style={{ color: "white" }}>
            <HomeIcon />
          </IconButton>
        </Link>
        <NavbarOptions />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
