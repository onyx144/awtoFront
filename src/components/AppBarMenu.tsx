"use client";
import React, { useEffect, useState } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton, Button } from '@mui/material';
import AccountCircle from "@mui/icons-material/AccountCircle";
import { CssBaseline } from '@mui/material';
import { getToken } from '@request/request'
import { getRole , clearAllUserData} from '@request/request'
import Link from 'next/link';

export default function AppBarMenu() {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

   /* const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };*/
    
    /*  const handleClose = () => {
        setAnchorEl(null);
      };*/
    
      const handleLogout = () => {
        clearAllUserData()
        window.location.reload(); 
      };
      //const open = Boolean(anchorEl);
 // const id = open ? 'profile-popover' : undefined;
    useEffect(() => {
      if (typeof window !== 'undefined') {
      setToken(getToken());
      setRole(getRole())
      }
      
    }, []);
  return (
    <Box sx={{ flexGrow: 1 , maxWidth: '1440px' , margin: 'auto'}}>
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
          

          {/* Кнопки Вхід и Register */}
          <Link color="inherit" href="/spares">
  <Typography className='header-text'>
    Архів заявок
  </Typography>
</Link>
          {!token ? (
            <>
              <Link color="inherit" href="/spares">Найти запчасти</Link>        
              <Button color="inherit" href="/sign-in" sx={{ ml: 2 }}>
                Вхід
              </Button>
              <Button color="inherit" href="/register">
                Регестрація
              </Button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Link color="inherit" href="/spares">
  <Typography className='header-text'>
    Знайти запчастини
  </Typography>
</Link>
{role=="salesman" &&
<Link color="inherit" href="/filters">
  <Typography className='header-text'>
    Мої фільтри
  </Typography>
</Link>
}
{role=="buyer" && <Link color="inherit" href="/story">
  <Typography className='header-text'>
    Історія заявок
  </Typography>
</Link>}

              <Button onClick={handleLogout} className='header-text'sx={{ color: 'red' }}>
                  Вихід
                </Button>
              <IconButton color="inherit" component={Link} href="/profile" >
                <AccountCircle />
              </IconButton>
              
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
  );
}
