"use client";

import React from "react";
import AppBarMenu from "./AppBarMenu";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#8fad1c',  // Заменяем основной цвет
    },
    secondary: {
      main: '#ff4081',  // Вы можете настроить вторичный цвет, если нужно
    },
  },
  
});

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
    <ThemeProvider theme={theme}>
      <AppBarMenu />
      <main>{children}</main>
    </ThemeProvider>
    </>
  );
};

export default AppWrapper;
