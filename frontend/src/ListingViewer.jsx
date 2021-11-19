import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Snackbar, TextField, Typography } from '@mui/material';

import URL, { getToken } from './backend';

function ListingViewer () {
  const params = useParams();

  const [listing, setListing] = useState({
    title: '',
    thumbnail: '',
    reviews: [],
  });

  const id = parseInt(params.listingId, 10);

  useEffect(async () => {
    const init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${URL}/listings/${id}`, init);
    if (!response.ok) {
      console.log(`TEMP ERROR HANDLER - ${response.status}`);
      return;
    }

    const data = await response.json();
    setListing(data.listing);
  }, []);

  const [booked, setBooked] = useState(false);

  const submit = async () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ dateRange: range, totalPrice: 0 }),
    }

    const response = await fetch(`${URL}/bookings/new/${id}`, init);
    if (!response.ok) {
      const error = await response.json();
      console.log('ERROR: ' + error.error);
    } else {
      setBooked(true);
    }
  };

  const [range, setRange] = useState({ start: '', end: '' });

  return (
    <Container>
      <Typography variant='body1'>
        STUB
        Title {listing.title} |
        Address(displayed as a string, e.g. 1 / 101 Kensington Street, Kensington, NSW) |
        Amenities |
        Price:
        If the user used a date range for search in 2.3.2 - display price per stay
        If the user did not use a date range for search in 2.3.2 - display price per night |
        All images of the property including the listing thumbnail {listing.thumbnail} |
        Type |
        Reviews {listing.reviews.length} |
        Review rating |
        Number of bedrooms |
        Number of beds |
        Number of bathrooms |
      </Typography>

      <TextField label='Date range start' type='date' value={range.start} onInput={(e) => {
        setRange({ ...range, start: e.target.value });
      }} InputLabelProps={{ shrink: true }} />
      <TextField label='...end' type='date' value={range.end} onInput={(e) => {
        setRange({ ...range, end: e.target.value });
      }} InputLabelProps={{ shrink: true }} />

      <Snackbar
        open={booked}
        autoHideDuration={5000}
        message="Booking complete"
        onClose={() => setBooked(false)}
      />

      <Button onClick={submit}>Book this listing</Button>
    </Container>
  );
}

export default ListingViewer;
