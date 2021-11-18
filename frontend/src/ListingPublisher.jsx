import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Paper, TextField } from '@mui/material';

import URL, { getToken } from './backend';

function ListingPublisher () {
  const navigate = useNavigate();
  const params = useParams();

  const [availability, setAvailability] = useState([{ start: '', end: '' }]);

  // TODO: Validate this and mark inputs with error styling if false.
  // console.log(new Date(start) <= new Date(end));

  const id = parseInt(params.listingId, 10);
  // TODO: Fetch current values and set the state.

  const submit = async () => {
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ availability }),
    };

    const response = await fetch(`${URL}/listings/publish/${id}`, init);
    if (!response.ok) {
      console.log(`TEMP ERROR HANDLER - ${response.status}`);
      return;
    }

    navigate('/host');
  }

  return (
    <Container>
      {availability.map((range, index) =>
        <Paper key={'r' + index}>
          <TextField label={`Date range ${index + 1} start`} type='date' value={range.start} onInput={(e) => {
            range.start = e.target.value;
            setAvailability([...availability]);
          }} InputLabelProps={{ shrink: true }} />
          <TextField label='...end' type='date' value={range.end} onInput={(e) => {
            range.end = e.target.value;
            setAvailability([...availability]);
          }} InputLabelProps={{ shrink: true }} />
        </Paper>
      )}
      <Button onClick={() => {
        availability.push({ start: '', end: '' });
        setAvailability([...availability]);
      }}>Add range</Button>
      <Button onClick={submit}>Publish listing</Button>
    </Container >
  );
}

export default ListingPublisher;
