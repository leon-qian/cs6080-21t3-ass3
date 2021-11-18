import React, { useEffect, useState } from 'react';
import { Container, Divider, Stack, Typography } from '@mui/material';

import URL from './backend';
import Listing from './Listing';

function HostedListings () {
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
        type: '',
        beds: 0,
        bathrooms: 0,
        thumbnail: item.thumbnail,
        rating: 0,
        reviews: item.reviews.length,
        price: item.price,
      });
    });

    setListings(items);
  }, []);

  return (
    <Container>
      <Typography variant='h3' gutterBottom>Your Hosted Listings</Typography>

      <Stack divider={<Divider flexItem orientation='horizontal' />} spacing={3}>
        {listings.map(listing =>
          <Listing
            key={listing.id}
            id={listing.id}
            title={listing.title}
            type={listing.type}
            beds={listing.beds}
            bathrooms={listing.bathrooms}
            thumbnail={listing.thumbnail}
            rating={listing.rating}
            reviews={listing.reviews}
            price={listing.price}
          />
        )}
      </Stack>
    </Container>
  );
}

export default HostedListings;
