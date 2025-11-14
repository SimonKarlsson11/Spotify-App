// src/components/Dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { getAccessTokenFromStorage } from '../../utils/getAccessTokenFromStorage';
import SideNav from '../SideNav/SideNav';

const Dashboard = ({ spotifyApi }) => {
  const [token, setToken] = useState(getAccessTokenFromStorage());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ingen token = inget att göra
    if (!token) {
      setIsLoading(false);
      return;
    }

    const onMount = async () => {
      spotifyApi.setAccessToken(token);
      setIsLoading(false);
    };

    onMount();
  }, [spotifyApi, token]);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>Laddar dashboard…</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex' }}>
        {<SideNav spotifyApi={spotifyApi} token={token} />}

        {/* Nested routes från App.jsx renderas här */}
        <Outlet />
      </Box>

      {/* Här kan Player komma in senare */}
      {/* {token && <Player spotifyApi={spotifyApi} />} */}
    </Box>
  );
};

export default Dashboard;
