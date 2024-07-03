import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Pink
    },
    error: {
      main: '#f44336', // Red
    },
    warning: {
      main: '#ff9800', // Orange
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Light blue
    },
    secondary: {
      main: '#f48fb1', // Light pink
    },
    error: {
      main: '#e57373', // Light red
    },
    warning: {
      main: '#ffb74d', // Light orange
    },
  },
});
