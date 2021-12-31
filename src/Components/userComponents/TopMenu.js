import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link}  from 'react-router-dom';

export default function TopMenu() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Tenor.
          </Typography>
          
        <Button color="inherit">Home</Button>
        <Button color="inherit">Products</Button>
        <Button color="inherit">AboutUs</Button>
         <Button color="inherit">Signup</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
