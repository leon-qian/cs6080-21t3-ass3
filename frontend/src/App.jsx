import React from 'react';
import {
  Link,
  Outlet,
} from 'react-router-dom';

function App () {
  return (
    <div>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <hr />
      <Outlet />
    </div>
  );
}

export default App;
