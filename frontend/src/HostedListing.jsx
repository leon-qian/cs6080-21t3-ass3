import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';

import URL, { getToken } from './backend';

function HostedListing ({ id, title, type, beds, bathrooms, thumbnail, rating, reviews, price }) {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(0);
  const [published, setPublished] = useState(false);

  useEffect(async () => {
    const init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${URL}/listings/${id}`, init);
    const data = await response.json();
    setPublished(data.listing.published);
  }, [refresh]);

  const unpublish = async () => {
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = await fetch(`${URL}/listings/unpublish/${id}`, init);
    if (!response.ok) {
      const error = await response.json();
      console.log(error.error);
    }

    setRefresh(refresh + 1);
  };

  return (
    <Card>
      <CardMedia
        alt={`Thumbnail for ${title}`}
        component='img'
        height='100'
        src={thumbnail}
      />
      <CardContent>
        <Typography color='text.secondary' variant='overline' component='div'>
          {type}
        </Typography>
        <Typography variant='h5' component='div'>
          {title}
        </Typography>
        <Typography color='text.secondary'>
          {beds} beds, {bathrooms} bathrooms.
        </Typography>
        <Rating value={rating} precision={0.5} readOnly />
        <Typography variant='body2'>
          Average rating from {reviews} reviews.
        </Typography>
        <Typography>
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => {
          console.log(id);
        }}>Test ID</Button>

        <Button onClick={() => {
          navigate(`/host/edit/${id}`);
        }}>
          Edit
        </Button>

        <Button>
          Delete
        </Button>

        <Button onClick={() => navigate(`/host/bookings/${id}`)}>
          Bookings
        </Button>

        {
          published
            ? <Button onClick={unpublish}>Unpublish</Button>
            : <Button onClick={() => navigate(`/host/publish/${id}`)}>Publish</Button>
        }
      </CardActions>
    </Card>
  );
}

HostedListing.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string,
  beds: PropTypes.number,
  bathrooms: PropTypes.number,
  thumbnail: PropTypes.string,
  rating: PropTypes.number,
  reviews: PropTypes.number,
  price: PropTypes.number,
};

export default HostedListing;
