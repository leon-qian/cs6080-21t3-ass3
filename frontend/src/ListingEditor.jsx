import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';

import URL, { getToken } from './backend';

function ListingEditor () {
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [type, setType] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [beds, setBeds] = useState('');
  const [amenities, setAmenities] = useState('');

  const id = parseInt(params.listingId, 10);
  // TODO: Fetch current values and set the state.

  const submit = async () => {
    const metadata = { type, bathrooms: Number(bathrooms), beds: Number(beds), amenities };
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ title, address, price: Number(price), thumbnail, metadata }),
    };

    const response = await fetch(`${URL}/listings/${id}`, init);
    if (!response.ok) {
      console.log(`TEMP ERROR HANDLER - ${response.status}`);
      return;
    }

    navigate('/host');
  }

  return (
    <Container>
      <TextField label='Listing Title' value={title} onInput={(e) => setTitle(e.target.value)} />
      <TextField label='Listing Address' value={address} onInput={(e) => setAddress(e.target.value)} />
      <TextField label='Listing Price(per night)' type='number' value={price} onInput={(e) => setPrice(e.target.value)} />
      <TextField label='Listing Thumbnail' value={thumbnail} onInput={(e) => setThumbnail(e.target.value)} />
      <TextField label='Property Type' value={type} onInput={(e) => setType(e.target.value)} />
      <TextField label='Number of bathrooms on the property' type='number' value={bathrooms} onInput={(e) => setBathrooms(e.target.value)} />
      <TextField label='Property bedrooms(e.g.each bedroom could include number of beds and their type)' type='number' value={beds} onInput={(e) => setBeds(e.target.value)} />
      <TextField label='Property amenities' value={amenities} onInput={(e) => setAmenities(e.target.value)} />
      <Button onClick={submit}>Save</Button>
    </Container >
  );
}

export default ListingEditor;
