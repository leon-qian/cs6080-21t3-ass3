import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

import URL, { getToken } from './backend';

function Booking ({ id, dateRange, totalPrice, status }) {
  const accept = async () => {
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = await fetch(`${URL}/bookings/accept/${id}`, init);
    if (!response.ok) {
      const error = await response.json();
      console.log(error.error);
    }
  };

  const decline = async () => {
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = await fetch(`${URL}/bookings/decline/${id}`, init);
    if (!response.ok) {
      const error = await response.json();
      console.log(error.error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography>
          Date Range {`${dateRange.start} to ${dateRange.end}`}
        </Typography>

        <Typography>
          Total Price ${totalPrice}
        </Typography>

        <Typography>
          Status {status}
        </Typography>
      </CardContent>

      {
        status === 'pending'
          ? <CardActions>
            <Button onClick={accept}>
              Accept
            </Button>

            <Button onClick={decline}>
              Decline
            </Button>
          </CardActions>
          : <></>
      }
    </Card>
  );
}

Booking.propTypes = {
  id: PropTypes.number,
  dateRange: PropTypes.object,
  totalPrice: PropTypes.number,
  status: PropTypes.string,
}

export default Booking;
