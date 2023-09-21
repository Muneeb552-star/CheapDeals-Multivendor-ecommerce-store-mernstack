import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'



const drawerWidth = 240;

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  const drawer = (
    <div style={{ backgroundColor: '#6466E8', color: 'white', height: '100%'}}>
      <Box sx={{  display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: '1rem'  }}>
        {/* <img style={{ padding: '1rem', width: '200px', margin: '0 auto 0 auto' }} src="../../website_logo.png" alt="website_logo" /> */}
        <h2 style={{ text: 'center' }}>Cheap<span style={{ color: 'orange', fontSize: '2rem' }}>.</span> Deals</h2>
      </Box>
      {/* <Toolbar sx={{ backgroundColor: '#6466E8' }}/> */}
      <Sidebar />
    </div>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ backgroundColor: '#ffffff',  width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: '#6466E8', mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">Cheap Deals - Admin Panel</Typography>
        </Toolbar>
      </AppBar>

      {/* Responsive Sidebar - Only small screens */}

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Component */}

      <Box 
        component="main" 
        sx={{ flexGrow: 1, p: 3,   width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
