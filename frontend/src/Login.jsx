import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Snackbar, TextField, Typography } from '@mui/material';

import URL, { setUser } from './backend.jsx';

function Login () {
  const navigate = useNavigate();

  const [snackMessage, setSnackMessage] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(`${URL}/user/auth/login`, init);

    if (response.status === 200) {
      const data = await response.json();
      setUser(data.token, email);
      navigate('/');
    }

    if (response.status === 400) {
      const error = await response.json();
      setSnackMessage(`ERROR - ${error.error}`);
      setSnackOpen(true);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Typography align='center' component='h1' variant='h5'>Login to your account</Typography>

      <TextField
        autoComplete='email'
        autoFocus
        fullWidth
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
        label='Password'
        margin='normal'
        onInput={e => setPassword(e.target.value)}
        required
        type='password'
        value={password}
      />

      <Button fullWidth onClick={login} sx={{ mt: 3, mb: 2 }} variant='contained'>Login</Button>

      <Button
        fullWidth
        onClick={() => navigate('/auth/register')}
        variant='outlined'
      >
        Register
      </Button>

      <Snackbar
        autoHideDuration={3000}
        message={snackMessage}
        onClose={() => setSnackOpen(false)}
        open={snackOpen}
      />
    </Container>
  );
}

export default Login;
