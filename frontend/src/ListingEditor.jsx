import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import URL, { getToken } from './backend';

function ListingEditor ({ createMode }) {
  const navigate = useNavigate();
  const params = useParams();

  let listingId = -1;
  if (!createMode) {
    listingId = parseInt(params.listingId, 10);
  }

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState({ line1: '', line2: '' });
  const [thumbnail, setThumbnail] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [beds, setBeds] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [amenities, setAmenities] = useState({
    wifi: false,
    parking: false,
    pool: false,
    kitchen: false,
    heating: false,
  });
  const [images, setImages] = useState([]);

  useEffect(async () => {
    if (createMode) {
      return;
    }

    const init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${URL}/listings/${listingId}`, init);

    const data = await response.json();

    const listing = data.listing;
    setTitle(listing.title);
    setAddress(listing.address);
    setThumbnail(listing.thumbnail);
    setPrice(listing.price);
    setType(listing.metadata.type);
    setBeds(listing.metadata.beds);
    setBedrooms(listing.metadata.bedrooms);
    setBathrooms(listing.metadata.bathrooms);
    setAmenities(listing.metadata.amenities);
    setImages(listing.metadata.images);
  }, []);

  const create = async () => {
    const metadata = {
      type,
      beds: Number(beds),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      amenities,
      images: [],
    };

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ title, address, thumbnail, price: Number(price), metadata }),
    };

    await fetch(`${URL}/listings/new`, init);

    navigate('/host');
  };

  const edit = async () => {
    const metadata = {
      type,
      beds: Number(beds),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      amenities,
      images,
    };

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ title, address, thumbnail, price: Number(price), metadata }),
    };

    await fetch(`${URL}/listings/${listingId}`, init);

    navigate('/host');
  };

  return (
    <Container component='main'>
      {
        createMode
          ? <Typography component='h1' variant='h3' gutterBottom>Create Listing</Typography>
          : <Typography component='h1' variant='h3' gutterBottom>Edit Listing</Typography>
      }

      <TextField
        autoFocus
        fullWidth
        label='Title'
        margin='normal'
        onInput={(e) => setTitle(e.target.value)}
        required
        type='text'
        value={title}
      />

      <Grid container spacing={3} sx={{ mt: -1, mb: 1 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Type of property'
            margin='none'
            onInput={(e) => setType(e.target.value)}
            required
            type='text'
            value={type}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Price per night'
            margin='none'
            onInput={(e) => setPrice(e.target.value)}
            required
            type='number'
            value={price}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Number of bathrooms'
            margin='none'
            onInput={(e) => setBathrooms(e.target.value)}
            required
            type='number'
            value={bathrooms}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Number of bedrooms'
            margin='none'
            onInput={(e) => setBedrooms(e.target.value)}
            required
            type='number'
            value={bedrooms}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Number of beds'
            margin='none'
            onInput={(e) => setBeds(e.target.value)}
            required
            type='number'
            value={beds}
          />
        </Grid>
      </Grid>

      <TextField
        fullWidth
        label='Address, line 1'
        margin='normal'
        onInput={(e) => setAddress({ ...address, line1: e.target.value })}
        required
        type='text'
        value={address.line1}
      />

      <TextField
        fullWidth
        label='Address, line 2'
        margin='normal'
        onInput={(e) => setAddress({ ...address, line2: e.target.value })}
        required
        type='text'
        value={address.line2}
      />

      <TextField
        fullWidth
        label='Thumbnail image, as Data URL'
        margin='normal'
        onInput={(e) => setThumbnail(e.target.value)}
        required
        type='text'
        value={thumbnail}
      />

      <FormControl fullWidth component='fieldset' sx={{ mt: 1 }}>
        <FormLabel component='legend'>Property amenities</FormLabel>
        <FormGroup aria-label='amenities' row>
          <FormControlLabel
            control={<Checkbox
              checked={amenities.wifi}
              onChange={(e) => setAmenities({ ...amenities, wifi: e.target.checked })}
            />}
            label='WiFi'
            labelPlacement='end'
          />

          <FormControlLabel
            control={<Checkbox
              checked={amenities.parking}
              onChange={(e) => setAmenities({ ...amenities, parking: e.target.checked })}
            />}
            label='Parking'
            labelPlacement='end'
          />

          <FormControlLabel
            control={<Checkbox
              checked={amenities.pool}
              onChange={(e) => setAmenities({ ...amenities, pool: e.target.checked })}
            />}
            label='Pool'
            labelPlacement='end'
          />

          <FormControlLabel
            control={<Checkbox
              checked={amenities.kitchen}
              onChange={(e) => setAmenities({ ...amenities, kitchen: e.target.checked })}
            />}
            label='Kitchen'
            labelPlacement='end'
          />

          <FormControlLabel
            control={<Checkbox
              checked={amenities.heating}
              onChange={(e) => setAmenities({ ...amenities, heating: e.target.checked })}
            />}
            label='Heating'
            labelPlacement='end'
          />
        </FormGroup>
      </FormControl>

      {
        createMode
          ? <>
            <Button fullWidth onClick={create} sx={{ mt: 3, mb: 2 }} variant='contained'>
              Create
            </Button>
          </>
          : <>
            <Typography component='h2' sx={{ mt: 2 }} variant='h5'>Manage property images</Typography>

            {
              images.map((image, index) =>
                <TextField
                  fullWidth
                  key={'image' + index}
                  label={`Image ${index + 1}`}
                  margin='normal'
                  onInput={(e) => {
                    images[index] = e.target.value;
                    setImages([...images]);
                  }}
                  required
                  type='text'
                  value={image}
                />
              )
            }

            <Button fullWidth onClick={() => {
              images.push('');
              setImages([...images]);
            }} sx={{ mt: 3, mb: 2 }} variant='outlined'>Add image</Button>

            <Button fullWidth onClick={edit} sx={{ mt: 3, mb: 2 }} variant='contained'>
              Save changes
            </Button>
          </>
      }
    </Container >
  );
}

ListingEditor.propTypes = {
  createMode: PropTypes.bool,
};

export default ListingEditor;
