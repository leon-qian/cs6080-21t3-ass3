import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

import URL from './backend';
import Listing from './Listing';

function ListingManager () {
  const [items] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(async () => {
    const init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(`${URL}/listings`, init);

    const data = await response.json();

    data.listings.forEach(item => {
      items.push({
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        reviews: item.reviews.length,
      });
    });

    items.sort((a, b) => a.title.localeCompare(b.title));
    // TODO: Put bookings in front.
    // NOTE: for each item, put them in separate lists depending on where they belong
    setListings(items);
  }, []);

  const [terms, setTerms] = useState('');

  const search = () => {
    if (terms.length === 0) {
      setListings(items);
      return;
    }

    const filters = terms.split(' ').filter(term => term.trim().length > 0);
    const filtered = [];

    // Preserves ordering.
    items.forEach(listing => {
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
      <Typography component='h1' variant='h5' gutterBottom>Explore listings</Typography>

      <TextField label='Search Terms' value={terms} onInput={(e) => setTerms(e.target.value)} />
      <Button onClick={search}>Search</Button>

      <Typography component='h2' variant='overline' gutterBottom>Listings from your bookings</Typography>
      {/* TODO: List the login user's bookings first. */}

      <Typography component='h2' variant='overline' gutterBottom>All listings</Typography>
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
    </Container>
  );
}

export default ListingManager;
