import React, { useEffect } from 'react';
import { Container, Box, Typography, Button, CssBaseline } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/header';
import LoadingSpinner from '../components/loading';

const HomePage = () => {
    const navigate = useNavigate();
    const { currentUser, loggedIn, loading } = useAuth();

   useEffect(() => {
        if (!loading) {
            if (!loggedIn || !currentUser) {
                navigate('/login');
            }
        }
    }, [loggedIn, loading, currentUser, navigate]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Header />
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h3" gutterBottom>
                        Welcome to the Admin Panel
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {currentUser === 'Admin' ? (
                            <span>
                                You are logged in as an Admin. <br />
                                <Button component={RouterLink} to="/dashboard" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                                    Go to Dashboard
                                </Button>
                            </span>
                        ) : (
                            <span>
                                You are logged in as a normal user. <br />
                                Enjoy using our services.
                            </span>
                        )}
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default HomePage;
