import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Snackbar, TextField, Typography } from '@mui/material';

import URL, { setUser } from './backend.jsx';

function Register () {
  const navigate = useNavigate();

  const [snackMessage, setSnackMessage] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = async () => {
    if (password !== confirmPassword) {
      setSnackMessage('Passwords do not match');
      setSnackOpen(true);
      return;
    }

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    };

    const response = await fetch(`${URL}/user/auth/register`, init);

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
      <Typography align='center' component='h1' variant='h5'>Register a new account</Typography>

      <TextField
        autoComplete='name'
        autoFocus
        fullWidth
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
        label='Password'
        margin='normal'
        onInput={e => setPassword(e.target.value)}
        required
        type='password'
        value={password}
      />

      <TextField
        autoComplete='new-password'
        fullWidth
        label='Confirm Password'
        margin='normal'
        onInput={e => setConfirmPassword(e.target.value)}
        required
        type='password'
        value={confirmPassword}
      />

      <Button
        fullWidth
        onClick={register}
        sx={{ mt: 3, mb: 2 }}
        variant='contained'
      >
        Register
      </Button>

      <Button fullWidth onClick={() => navigate('/auth/login')} variant='outlined'>Login</Button>

      <Snackbar
        autoHideDuration={3000}
        message={snackMessage}
        onClose={() => setSnackOpen(false)}
        open={snackOpen}
      />
    </Container>
  );
}

export default Register;
