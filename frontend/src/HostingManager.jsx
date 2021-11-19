import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Divider, Stack, Typography } from '@mui/material';

import Hosting from './Hosting';
import URL, { getEmail } from './backend';

function HostingManager () {
  const navigate = useNavigate();

  const [updateFlag, setUpdateFlag] = useState({});

  const [hostings, setHostings] = useState([]);

  useEffect(async () => {
    const init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${URL}/listings`, init);

    const data = await response.json();

    const hostings = [];

    data.listings.forEach(hosting => {
      if (hosting.owner === getEmail()) {
        hostings.push(hosting.id);
      }
    });

    setHostings(hostings);
  }, [updateFlag]);

  return (
    <Container component='main'>
      <Typography component='h1' variant='h3' gutterBottom>Your Hosted Listings</Typography>

      <Button onClick={() => navigate('/list/create')} sx={{ mb: 2 }} variant='contained'>
        Create a new listing
      </Button>

      <Stack divider={<Divider flexItem orientation='horizontal' />} spacing={3}>
        {
          hostings.map(hosting =>
            <Hosting key={hosting} id={hosting} onUpdate={setUpdateFlag} />
          )
        }
      </Stack>
    </Container>
  );
}

export default HostingManager;
