import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

import Listing from './Listing';
import URL, { hasUser, getToken, getEmail } from './backend';

async function getBookedListings () {
  const init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await fetch(`${URL}/bookings`, init);

  const data = await response.json();

  const bookedListings = [];

  data.bookings.forEach(booking => {
    if (
      booking.owner === getEmail() &&
      (booking.status === 'accepted' || booking.status === 'pending')
    ) {
      bookedListings.push(Number(booking.listingId));
    }
  });

  return bookedListings.filter((id, index) => bookedListings.indexOf(id) === index);
}

function ListingManager () {
  const [cache] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(async () => {
    const init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${URL}/listings`, init);

    const data = await response.json();

    data.listings.forEach(listing => {
      cache.push({
        id: listing.id,
        title: listing.title,
        thumbnail: listing.thumbnail,
        reviews: listing.reviews.length,
      });
    });

    cache.sort((a, b) => a.title.localeCompare(b.title));

    let all = cache;
    if (hasUser()) {
      const bookedListings = await getBookedListings();
      const booked = cache.filter(listing => bookedListings.indexOf(listing.id) !== -1);
      const others = cache.filter(listing => bookedListings.indexOf(listing.id) === -1);
      all = booked.concat(others);
    }

    setListings(all);
  }, []);

  const [terms, setTerms] = useState('');

  const search = () => {
    if (terms.length === 0) {
      setListings(cache);
      return;
    }

    const filters = terms.split(' ').filter(term => term.trim().length > 0);
    const filtered = [];

    // Preserves ordering.
    cache.forEach(listing => {
      let matched = false;
      filters.forEach(filter => {
        // TODO: Add address searching as well.
        if (!matched) {
          if (listing.title.toLowerCase().includes(filter.toLowerCase())) {
            filtered.push(listing);
            matched = true; // Avoid duplicates.
          }
        }
      });
    });

    setListings(filtered);
  };

  return (
    <Container align='center'>
      <Typography component='h1' variant='h3' gutterBottom>Listings</Typography>

      <TextField
        fullWidth
        label='Search Terms'
        margin='normal'
        onInput={(e) => setTerms(e.target.value)}
        value={terms}
      />

      <Button fullWidth onClick={search} sx={{ mt: 0, mb: 5 }} variant='contained'>Search</Button>

      <Grid container spacing={4}>
        {listings.map(listing =>
          <Grid item key={listing.id} xs={12} sm={6} md={4}>
            <Listing
              id={listing.id}
              title={listing.title}
              thumbnail={listing.thumbnail}
              reviews={listing.reviews}
            />
          </Grid>
        )}
      </Grid>
    </Container >
  );
}

export default ListingManager;
