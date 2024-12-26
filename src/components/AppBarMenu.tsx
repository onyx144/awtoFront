"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function AppBarMenu() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Логотип */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Logo
          </Typography>

          {/* Меню */}
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">Contact</Button>

          {/* Кнопки Sign In и Register */}
          <Button color="inherit" href="/signin" sx={{ ml: 2 }}>
            Sign In
          </Button>
          <Button color="inherit" href="/register">
            Register
          </Button>

          {/* Иконка профиля */}
          <IconButton color="inherit" sx={{ ml: 2 }}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
