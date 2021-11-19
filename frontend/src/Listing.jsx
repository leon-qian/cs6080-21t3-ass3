import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

function Listing ({ id, title, thumbnail, reviews }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia component='img' image={thumbnail} alt={`Thumbnail of ${title}`} sx={{ height: '40%' }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant='h5' component='h2'>
          {title}
        </Typography>
        <Typography>
          {reviews} reviews
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={() => navigate(`/list/view/${id}`)}>View</Button>
      </CardActions>
    </Card>
  );
}

Listing.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  reviews: PropTypes.number,
};

export default Listing;
