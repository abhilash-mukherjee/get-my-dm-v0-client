import { ThemeProvider } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { theme } from './theme'
import { Influencer } from './components/Influencer/Influencer';
import { Grid, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FollowerChatPage } from './components/follower/FollowerChatPage';
import { Follower } from './components/follower/Follower';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container bgcolor={theme.palette.secondary.main} justifyContent={'center'} minHeight={'100vh'} overflow={'auto'}>
          <Grid item xs={12} sm={6} md={5} lg={4} xl={3} bgcolor={'white'}>
            <Router>
              <Routes>
                <Route path='/influencer/*' element={<Influencer />} />
                <Route path='/:influencerSlug' element={<FollowerChatPage />} />
                <Route path='/follower/*' element={<Follower />} />
              </Routes>
            </Router>
          </Grid>
        </Grid>
        <ToastContainer position="bottom-center" autoClose={1000} pauseOnFocusLoss={false}
          pauseOnHover={false} />
      </ThemeProvider>
    </>
  )
}

export default App
