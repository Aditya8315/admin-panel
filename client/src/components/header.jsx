import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const { mode, toggleTheme } = useTheme();
    const { loggedIn} = useAuth();
    const logout=()=>{
        localStorage.clear('token');
        navigate('/login');
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Admin Panel
                </Typography>
                <IconButton edge="end" color="inherit" onClick={toggleTheme} sx={{ marginRight: 2 }} >
                    {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
                {loggedIn ? (
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                ) : (
                    <Link to="login" 
                    >
                        <Button color="inherit">
                            Login
                        </Button>

                    </Link>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
