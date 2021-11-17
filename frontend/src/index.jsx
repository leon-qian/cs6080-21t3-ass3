import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import App from './App';
import Login from './Login';
import Register from './Register';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path='/'>
          <Route element={<Login />} path='login' />
          <Route element={<Register />} path='register' />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
