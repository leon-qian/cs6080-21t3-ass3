import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Divider, Stack, Typography } from '@mui/material';

import URL, { getToken } from './backend';
import Booking from './Booking';

function Bookings () {
  const params = useParams();

  const listingId = parseInt(params.listingId, 10);

  const [bookings, setBookings] = useState([]);
  const [published, setPublished] = useState(false);
  const [daysOnline, setDaysOnline] = useState(0);

  useEffect(async () => {
    let init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let response = await fetch(`${URL}/listings/${listingId}`, init);
    if (!response.ok) {
      const error = await response.json();
      console.log(error.error);
      return;
    }

    let data = await response.json();
    if (data.listing.published) {
      const datePosted = (new Date(data.listing.postedOn)).getTime();
      const dateNow = (new Date()).getTime();
      const days = Math.round((dateNow - datePosted) / (1000 * 60 * 60 * 24));

      setDaysOnline(days);
      setPublished(true);
    }

    init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    };

    response = await fetch(`${URL}/bookings`, init);
    if (!response.ok) {
      const error = await response.json();
      console.log(error.error);
      return;
    }

    data = await response.json();

    const bookings = [];
    data.bookings.forEach(booking => {
      if (parseInt(booking.listingId, 10) === listingId) {
        bookings.push(booking);
      }
    });

    setBookings(bookings);
  }, []);

  return (
    <Container>
      <Typography>
        {
          published
            ? `This listing been online for ${daysOnline} days.`
            : 'This listing is not live.'
        }
      </Typography>

      <Typography>
        This listing has been booked for n days this year.
      </Typography>

      <Typography>
        This listing has made $X in profit this year.
      </Typography>

      <Stack divider={<Divider flexItem orientation='horizontal' />} spacing={3}>
        {bookings.map(booking =>
          <Booking
            key={booking.id}
            id={booking.id}
            dateRange={booking.dateRange}
            totalPrice={booking.totalPrice}
            status={booking.status}
          />
        )}
      </Stack>
    </Container>
  );
}

export default Bookings;
