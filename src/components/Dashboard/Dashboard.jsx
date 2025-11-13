// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard = ({ spotifyApi }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('spotifyToken');

    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
    setToken(accessToken);
  }, [spotifyApi]);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h4">
        Techover Self Made – Spotify
      </Typography>

      {token ? (
        <Typography>Du är inloggad med Spotify 🎧</Typography>
      ) : (
        <Typography>Försöker läsa token...</Typography>
      )}
    </Box>
  );
};

export default Dashboard;
