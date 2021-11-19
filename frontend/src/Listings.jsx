import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';

import URL from './backend';
import Listing from './Listing';

function Listings () {
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

    const items = [];

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

  return (
    <Container align='center'>
      <Typography component='h1' variant='h5' gutterBottom>Explore listings</Typography>

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

export default Listings;
