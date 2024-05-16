import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { LocalDining, Lock } from '@mui/icons-material';
import { useValue } from '../context/ContextProvider';
import UserIcons from './user/UserIcons';

// test user: const user = {name: 'test', photoURL}

const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const handleButtonClick = (action) => {
    // Implement your button click logic here
    console.log(`Button clicked for: ${action}`);
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: '#FD8700' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ mr: 1 }}>
              <IconButton size="large" color="inherit">
              </IconButton>
            </Box>
            <Typography
              variant="h5"
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            >
              Kern County Catering
            </Typography>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              K.C.C
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: 0.25 }}>
              <Button
                color="inherit"
                startIcon={<LocalDining />}
                onClick={() => handleButtonClick('Find Street Food')}
              >
                <Typography sx={{ display: { xs: 'none', md: 'inline' } }}>
                  Find Your Local Street Food Now!
                </Typography>
              </Button>
              <Box sx={{ flexGrow: 1 }} /> {/* Spacer Box */}
            </Box>
            <Box sx={{ flexGrow: 1 }} /> {/* Spacer Box */}
            <Box sx={{ display: 'flex' }}>
              {!currentUser ? ( // if no current user show login button
                <Button
                  color="inherit"
                  startIcon={<Lock />}
                  onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
                >
                  Login
                </Button>
              ) : ( // else show user icons
                <UserIcons />
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
