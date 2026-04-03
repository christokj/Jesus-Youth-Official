import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#915EFF', 
      light: '#A87CFF',
      dark: '#7A4DE6',
    },
    secondary: {
      main: '#aaa6c3', 
    },
    success: {
      main: '#00cea8', 
    },
    error: {
      main: '#ec008c',
    },
    background: {
      default: '#050816', 
      paper: '#151030', 
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaa6c3',
    },
  },
  typography: {
    fontFamily: [
      '"Poppins"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0.75rem',
          padding: '0.75rem 2rem',
          fontWeight: 700,
          boxShadow: '0 4px 6px -1px rgba(145, 94, 255, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)'
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#151030',
          borderRadius: '20px',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(145, 94, 255, 0.15)',
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none',
            }
        }
    },
    MuiTableCell: {
        styleOverrides: {
            root: {
                borderColor: 'rgba(255,255,255,0.05)',
            }
        }
    }
  },
});

export default theme;
