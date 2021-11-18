import React, { useState } from 'react';
import {
  Link as RouteLink,
  Outlet,
} from 'react-router-dom';
import { Button } from '@mui/material';

import { clearToken, getToken } from './backend.jsx';

function App () {
  const [auth, setAuth] = useState(''); // For debugging only.

  return (
    <div>
      <Button onClick={() => clearToken()}>Logout</Button>
      <RouteLink to='/login'>Login</RouteLink>
      <RouteLink to='/register'>Register</RouteLink>
      <RouteLink to='/host'>View hosted listings</RouteLink>
      <RouteLink to='/list'>View all listings</RouteLink>
      <hr />
      <Outlet />
      <hr />
      Bearer {auth}
      <button onClick={() => setAuth(getToken())}>TOKEN</button>
    </div>
  );
}

export default App;
