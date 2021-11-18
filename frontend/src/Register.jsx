import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';

import URL, { setToken } from './backend.jsx';

function Register () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (name, email, password) => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    };

    try {
      const response = await fetch(`${URL}/user/auth/register`, init);

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setToken(data.token);
        return;
      }

      if (response.status === 400) {
        const error = await response.json();
        throw new Error(`${error.error}`);
      }

      throw new Error('Encountered an unexpected error.');
    } catch (e) {
      console.log(e);
      // TODO: Show error in UI.
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Typography align='center' component='h1' variant='body2'>
        Sign up for an account.
      </Typography>

      <TextField
        autoComplete='name'
        autoFocus
        fullWidth
        id='name'
        label='Name'
        margin='normal'
        onInput={e => setName(e.target.value)}
        required
        type='text'
        value={name}
      />

      <TextField
        autoComplete='email'
        fullWidth
        id='email'
        label='Email'
        margin='normal'
        onInput={e => setEmail(e.target.value)}
        required
        type='text'
        value={email}
      />

      <TextField
        autoComplete='new-password'
        fullWidth
        id='password'
        label='Password'
        margin='normal'
        onInput={e => setPassword(e.target.value)}
        required
        type='password'
        value={password}
      />

      <Button onClick={() => submit(name, email, password)} fullWidth variant="contained">
        Register
      </Button>
    </Container>
  );
}

export default Register;
