"use client";

import React from "react";
import dynamic from "next/dynamic";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AppBarMenu = dynamic(() => import("./AppBarMenu"), { ssr: false });

const theme = createTheme({
  palette: {
    primary: {
      main: '#8fad1c',  // Основной цвет
    },
    secondary: {
      main: '#8fad1c',  // Вторичный цвет
    },
  },
});

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AppBarMenu />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default AppWrapper;
