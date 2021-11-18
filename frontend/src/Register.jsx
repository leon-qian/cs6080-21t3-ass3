import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';

function Register () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      <Button onClick={() => console.log(name, email, password)} fullWidth variant="contained">
        Register
      </Button>
    </Container>
  );
}

export default Register;
