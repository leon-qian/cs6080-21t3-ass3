import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography
} from '@mui/material';

import URL, { getToken } from './backend';

function Hosting ({ id, onUpdate }) {
  const navigate = useNavigate();

  const [updateFlag, setUpdateFlag] = useState({});

  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [price, setPrice] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [rating, setRating] = useState(0);
  const [type, setType] = useState('');
  const [beds, setBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
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

    const hosting = data.listing;
    setTitle(hosting.title);
    setThumbnail(hosting.thumbnail);
    setPrice(hosting.price);

    const reviews = hosting.reviews.length;
    setReviews(reviews);

    if (reviews === 0) {
      setRating(0);
    } else {
      let rating = 0;
      hosting.reviews.forEach(review => {
        rating += review.rating;
      });
      setRating(rating / reviews);
    }

    setType(hosting.metadata.type);
    setBeds(hosting.metadata.beds);
    setBathrooms(hosting.metadata.bathrooms);
    setPublished(hosting.published);
  }, [updateFlag]);

  const uncreate = async () => {
    const init = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    };

    await fetch(`${URL}/listings/${id}`, init);

    onUpdate({});
  };

  const unpublish = async () => {
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    };

    await fetch(`${URL}/listings/unpublish/${id}`, init);

    setUpdateFlag({});
  };

  return (
    <Card>
      <CardMedia alt={`Thumbnail for ${title}`} component='img' height='180' src={thumbnail} />

      <CardContent>
        <Typography component='div' variant='overline'>{type}</Typography>

        <Typography component='div' variant='h3'>{title}</Typography>

        <Typography component='div' gutterBottom variant='subtitle1'>
          ${price} per night | {beds} beds | {bathrooms} bathrooms
        </Typography>

        <Rating value={rating} precision={0.5} readOnly />

        <Typography component='div' variant='subtitle2'>
          Average rating from {reviews} reviews
        </Typography>
      </CardContent>

      <CardActions>
        <Button onClick={() => navigate(`/list/edit/${id}`)}>Edit</Button>

        <Button onClick={uncreate}>Delete</Button>

        <Button onClick={() => navigate(`/book/${id}`)}>Bookings</Button>

        {
          published
            ? <Button onClick={unpublish}>Unpublish</Button>
            : <Button onClick={() => navigate(`/list/publish/${id}`)}>Publish</Button>
        }
      </CardActions>
    </Card>
  );
}

Hosting.propTypes = {
  id: PropTypes.number,
  onUpdate: PropTypes.func,
};

export default Hosting;
