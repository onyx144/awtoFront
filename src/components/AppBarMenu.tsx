"use client";
import React, { useEffect, useState } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton, Popover, Button } from '@mui/material';
import AccountCircle from "@mui/icons-material/AccountCircle";
import { CssBaseline } from '@mui/material';
import { getToken } from '@request/request'
import { removeToken } from '@request/request'
import Link from 'next/link';

export default function AppBarMenu() {
    const [token, setToken] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const handleLogout = () => {
        removeToken();
        handleClose();
        window.location.reload(); 
      };
      const open = Boolean(anchorEl);
  const id = open ? 'profile-popover' : undefined;
    useEffect(() => {
      setToken(getToken()); // Устанавливаем токен при загрузке компонента
    }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
    <CssBaseline />
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {/* Логотип - слева */}
        <Link href="/" passHref>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Logo
          </Typography>
        </Link>

        {/* Меню и кнопки справа */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          

          {/* Кнопки Sign In и Register */}
          {!token ? (
            <>
              <Button color="inherit" href="/spares">Найти запчасти</Button>        
              <Button color="inherit" href="/sign-in" sx={{ ml: 2 }}>
                Вхід
              </Button>
              <Button color="inherit" href="/register">
                Регестрація
              </Button>
            </>
          ) : (
            <div>
              <Button color="inherit" href="/spares">Найти запчасти</Button>        
              <Button color="inherit" href="/filters">Моі фільтри</Button>
              <Button color="inherit" href="/story">Історія заявок</Button>
              <Button onClick={handleLogout} sx={{ color: 'red' }}>
                  Вихід
                </Button>
              <IconButton color="inherit" component={Link} href="/profile" sx={{ ml: 2 }}>
                <AccountCircle />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <Button onClick={handleLogout} sx={{ padding: '8px 16px' }}>
                  Вихід
                </Button>
              </Popover>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
  );
}
