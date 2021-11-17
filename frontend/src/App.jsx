import React from 'react';
import {
  Link as RouteLink,
  Outlet,
} from 'react-router-dom';

function App () {
  return (
    <div>
      <RouteLink to='/login'>Login</RouteLink>
      <RouteLink to='/register'>Register</RouteLink>
      <hr />
      <Outlet />
    </div>
  );
}

export default App;
