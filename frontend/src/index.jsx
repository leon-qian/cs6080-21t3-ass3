import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Import Roboto font for use with Material UI.
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Import Material Icons font for use with Material UI through Google Web Fonts.
import './index.css';

// Import custom components.
import App from './App';
import Login from './Login';
import Register from './Register';

import BookingManager from './BookingManager';
import HostingManager from './HostingManager';
import ListingManager from './ListingManager';

import ListingEditor from './ListingCreator';
import ListingPublisher from './ListingPublisher';
import ListingViewer from './ListingViewer';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route path='auth/login' element={<Login />} />
          <Route path='auth/register' element={<Register />} />

          <Route path='book/:listingId' element={<BookingManager />} />
          <Route path='host' element={<HostingManager />} />
          <Route path='list' element={<ListingManager />} />

          <Route path='list/create' element={<ListingEditor createMode />} />
          <Route path='list/edit/:listingId' element={<ListingEditor />} />
          <Route path='list/publish/:listingId' element={<ListingPublisher />} />
          <Route path='list/view/:listingId' element={<ListingViewer />} />

          <Route path='auth' element={<Navigate to='/auth/login' />} />
          <Route path='book' element={<Navigate to='/host' />} />
          <Route path='' element={<Navigate to='/list' />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root'),
);
