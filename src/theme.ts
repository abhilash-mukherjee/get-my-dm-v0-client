import { ThemeOptions, createTheme } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0c172f',
    },
    secondary: {
      main: '#F5F5F5',
    },
    info: {
      main: '#F8FBFF',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Set border-radius to 8px
          boxShadow: '0px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
      `,
    },
    MuiOutlinedInput: {
      styleOverrides:{
        root:{
          fontSize:'medium'
        }
      }
    },
    MuiCircularProgress:{
      styleOverrides:{
        root:{
          color: "#F5F5F5"
        }
      }
    }
  }
};

export const theme = createTheme(themeOptions);