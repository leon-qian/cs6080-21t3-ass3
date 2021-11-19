import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

import URL, { getToken } from './backend';

function ListingPublisher () {
  const navigate = useNavigate();
  const params = useParams();

  const [availability, setAvailability] = useState([{ start: '', end: '' }]);

  const listingId = parseInt(params.listingId, 10);

  const publish = async () => {
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ availability }),
    };

    await fetch(`${URL}/listings/publish/${listingId}`, init);

    navigate('/host');
  };

  return (
    <Container component='main'>
      <Typography component='h1' variant='h3' gutterBottom>Publish Listing</Typography>

      {
        availability.map((range, index) =>
          <Grid container key={'range' + index} spacing={3} sx={{ mt: -1, mb: 1 }}>
            <Grid item xs={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                label={`Date range ${index + 1} start...`}
                margin='normal'
                onInput={(e) => {
                  range.start = e.target.value;
                  setAvailability([...availability]);
                }}
                required
                type='date'
                value={range.start}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                label='...end'
                margin='normal'
                onInput={(e) => {
                  range.end = e.target.value;
                  setAvailability([...availability]);
                }}
                required
                type='date'
                value={range.end}
              />
            </Grid>
          </Grid>
        )
      }

      <Button fullWidth onClick={() => {
        availability.push({ start: '', end: '' });
        setAvailability([...availability]);
      }} sx={{ mt: 3, mb: 2 }} variant='outlined'>Add range</Button>

      <Button fullWidth onClick={publish} sx={{ mt: 3, mb: 2 }} variant='contained'>
        Confirm availability and publish
      </Button>
    </Container>
  );
}

export default ListingPublisher;
