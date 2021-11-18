import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

// Import Roboto font for use with Material UI.
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Import Material Icons font for use with Material UI through Google Web Fonts.
import './index.css';

import App from './App';
import Login from './Login';
import Register from './Register';
import HostedListings from './HostedListings';
import NewListing from './NewListing';
import ListingEditor from './ListingEditor';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path='/'>
          <Route element={<Login />} path='login' />
          <Route element={<Register />} path='register' />
          <Route element={<HostedListings />} path='host' />
          <Route element={<NewListing />} path='host/new' />
          <Route element={<ListingEditor />} path='host/edit/:listingId' />
          <Route element={<>Coming soon...</>} path='list' />
          <Route element={<>{'Ain\'t nuthin here!'}</>} path='*' />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
