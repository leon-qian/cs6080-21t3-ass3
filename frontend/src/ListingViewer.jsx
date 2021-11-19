import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

import URL from './backend';

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
    </Container>
  );
}

export default ListingViewer;
