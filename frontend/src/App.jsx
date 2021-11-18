import React, { useState } from 'react';
import {
  Link as RouteLink,
  Outlet,
} from 'react-router-dom';

import { getToken } from './backend.jsx';

function App () {
  const [auth, setAuth] = useState(''); // For debugging only.

  return (
    <div>
      <RouteLink to='/login'>Login</RouteLink>
      <RouteLink to='/register'>Register</RouteLink>
      <hr />
      <Outlet />
      <hr />
      Bearer {auth}
      <button onClick={() => setAuth(getToken())}>TOKEN</button>
    </div>
  );
}

export default App;
