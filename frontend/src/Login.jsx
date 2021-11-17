import React, { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';

function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      <Button onClick={() => console.log(email, password)} fullWidth variant="contained">
        Login
      </Button>

      <Grid container>
        <Grid item xs>
          <RouteLink to='/'>
            <Link component='span' variant='body2'>
              Forgot password?
            </Link>
          </RouteLink>
        </Grid>

        <Grid item>
          <RouteLink to='/register'>
            <Link component='span' variant='body2'>
              {'Don\'t have an account? Sign Up'}
            </Link>
          </RouteLink>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
