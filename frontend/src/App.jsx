import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Snackbar, Toolbar } from '@mui/material';

import URL, { hasUser, getToken, clearUser } from './backend';

function App () {
  const navigate = useNavigate();

  const [snackMessage, setSnackMessage] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  const logout = async () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = await fetch(`${URL}/user/auth/logout`, init);

    if (response.status === 200) {
      clearUser();

      setSnackMessage('You have logged out');
      setSnackOpen(true);
    }

    if (response.status === 403) {
      setSnackMessage('You were not logged in');
      setSnackOpen(true);
    }

    navigate('/');
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Box flexGrow={1}>
            <Button color='inherit' onClick={() => navigate('/')}>AirBrB</Button>

            <Button color='inherit' onClick={() => navigate('/list')}>Listings</Button>
            <Button color='inherit' onClick={() => navigate('/host')}>Host</Button>
          </Box>

          {
            hasUser()
              ? <Button color='inherit' onClick={logout}>Logout</Button>
              : <Button color='inherit' onClick={() => navigate('/auth')}>Login</Button>
          }
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Outlet />

      <Snackbar
        autoHideDuration={3000}
        message={snackMessage}
        onClose={() => setSnackOpen(false)}
        open={snackOpen}
      />
    </>
  );
}

export default App;
