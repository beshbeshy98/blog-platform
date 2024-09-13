import { createTheme } from '@mui/material/styles';

// Define your custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#ffcc00', // Yellow
        },
        secondary: {
            main: '#f44336', // Red
        },
        background: {
            default: '#111', // Dark background
        },
        text: {
            primary: '#f9f9f9', // Light text color
            secondary: '#333', // Darker text for contrast
        },
        action: {
            hover: '#e6b800', // Hover color
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#ffcc00', // Yellow for headings
        },
        h2: {
            fontSize: '1.5rem',
        },
        body1: {
            fontSize: '1rem',
            color: '#f9f9f9',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '4px',
                },
                containedPrimary: {
                    backgroundColor: '#ffcc00',
                    color: '#1a1a1a',
                    '&:hover': {
                        backgroundColor: '#e6b800',
                    },
                    '&:active': {
                        backgroundColor: '#cc9900',
                    },
                },
                containedSecondary: {
                    backgroundColor: '#f44336',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#d32f2f',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#333',
                    color: '#f9f9f9',
                    borderColor: '#444',
                    '& .MuiInputBase-root': {
                        color: '#f9f9f9',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#444',
                        },
                        '&:hover fieldset': {
                            borderColor: '#ffcc00',
                        },
                    },
                },
            },
        },
    },
});

export default theme;
