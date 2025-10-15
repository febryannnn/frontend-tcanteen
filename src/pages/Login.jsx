import React, { useState } from 'react';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Container, Link, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0000',
    },
    background: {
      default:"#dbe2edff",
      paper: '#ffffffff',
    },
  },
      typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password, remember });
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}
          >
            {/* Logo */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ color: 'black', fontWeight: 'bold' }}>🍴</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: 'black', fontWeight: 600 }}>
                  Welcome to CanteenTC
                </Typography>
              </Box>
              
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'black' }}>
                Sign in
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, color: 'black' }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#ffffffff',
                      'fieldset': {
                        borderColor: 'grey.500',
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, color: 'black' }}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#ffffffff',
                      'fieldset': {
                        borderColor: 'grey.500',
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                      },
                    },
                  }}
                />
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    size="small"
                    color="primary.main"
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    Remember me
                  </Typography>
                }
                sx={{ mb: 3}}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  py: 1.5,
                  mb: 2,
                  bgcolor: 'black',
                  color: 'white',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'grey.800',
                  },
                }}
              >
                Sign in
              </Button>

              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Link
                  href="#"
                  underline="hover"
                  sx={{ 
                    color: 'grey.600', 
                    fontSize: '0.875rem' ,
                    '&:hover': {
                    color: 'black',
                  },
                  }}
                >
                  Forgot your password?
                </Link>
              </Box>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  Don't have an account?{' '}
                  <Link
                    href="/register"
                    underline="hover"
                    sx={{ color: 'black', fontWeight: 500,'&:hover': {
                    color: 'black',
                  }, }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}