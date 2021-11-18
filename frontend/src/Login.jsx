import React, { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Button, Container, Link, TextField, Typography } from '@mui/material';

import URL, { setToken } from './backend.jsx';

function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (email, password) => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };

    try {
      const response = await fetch(`${URL}/user/auth/login`, init);

      if (response.status === 200) {
        const data = await response.json();
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
      <Typography align='center' component='h1' variant='h2'>
        Welcome back!
      </Typography>

      <Typography align='center' component='h1' variant='body2'>
        Login to your account here.
      </Typography>

      <TextField
        autoComplete='email'
        autoFocus
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
        autoComplete='current-password'
        fullWidth
        id='password'
        label='Password'
        margin='normal'
        onInput={e => setPassword(e.target.value)}
        required
        type='password'
        value={password}
      />

      <Button onClick={() => submit(email, password)} fullWidth variant="contained">
        Login
      </Button>

      <RouteLink to='/register'>
        <Link component='span' variant='body2'>
          {'Don\'t have an account? Register here'}
        </Link>
      </RouteLink>
    </Container>
  );
}

export default Login;
