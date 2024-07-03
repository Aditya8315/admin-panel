import React from 'react'
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
const Error = () => {
    return (
        <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h2">
            Error 404
          </Typography>
          <Typography component="h5" variant="h5">
            Page you were looking for doesn't  exist
          </Typography>
          <Link href="/" variant="body2">
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Go to Home Page
          </Button>
              </Link>
        </Box>
      </Container>
    )
}

export default Error