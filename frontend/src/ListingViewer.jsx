import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Rating, Snackbar, TextareaAutosize, TextField, Typography } from '@mui/material';

import URL, { hasUser, getToken, getEmail } from './backend';

function ListingViewer () {
  const params = useParams();

  const [listing, setListing] = useState({
    title: '',
    thumbnail: '',
    reviews: [],
  });

  const [booking, setBooking] = useState(null);

  // Hack used to hot reload the page contents without actually reloading.
  // This works by forcing the useEffect to run again.
  const [refresh, setRefresh] = useState(0);

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

    if (hasUser()) {
      const init = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const response = await fetch(`${URL}/bookings`, init);
      if (!response.ok) return;

      const data = await response.json();
      data.bookings.forEach(booking => {
        if (/* booking.status === 'accepted' && */ booking.owner === getEmail() && parseInt(booking.listingId, 10) === id) {
          setBooking(booking);
        }
      });
    }
  }, [refresh]);

  const [booked, setBooked] = useState(false);
  const [range, setRange] = useState({ start: '', end: '' });
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

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

  const review = async () => {
    if (hasUser() && booking) {
      const init = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ review: { comment, rating } }),
      }

      const response = await fetch(`${URL}/listings/${id}/review/${booking.id}`, init);
      if (!response.ok) {
        const error = await response.json();
        console.log('ERROR: ' + error.error);
      } else {
        setRefresh(refresh + 1);
      }
    }
  };

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

      <TextareaAutosize minRows={5} value={comment} onInput={e => { setComment(e.target.value) }} />
      <Rating value={rating} precision={0.5} onChange={(e, v) => setRating(v)} />
      <Button onClick={review}>Submit review</Button>

      {
        booking
          ? <Typography>{booking.id}</Typography>
          : <></>
      }
    </Container>
  );
}

export default ListingViewer;
