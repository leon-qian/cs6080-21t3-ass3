import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';

function Listing ({ id, title, type, beds, bathrooms, thumbnail, rating, reviews, price }) {
  const navigate = useNavigate();

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
      </CardActions>
    </Card>
  );
}

Listing.propTypes = {
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

export default Listing;
