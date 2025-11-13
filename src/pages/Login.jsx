// src/pages/Login.jsx
import React from 'react';
import { Box, Button } from '@mui/material';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce';

const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectUri = import.meta.env.VITE_LIVE_URL;

// Samma scopes, fast i en sträng (space-separerad)
const scope =
  'playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private app-remote-control streaming user-read-email user-read-private user-library-modify user-library-read user-top-read user-read-playback-position ugc-image-upload user-modify-playback-state user-read-playback-state user-read-currently-playing user-follow-modify user-follow-read user-read-recently-played';

export async function redirectToSpotifyAuth() {
  // 1. skapa verifier & challenge
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // 2. spara verifier i localStorage (behövs vid token-hämtning sen)
  localStorage.setItem('code_verifier', codeVerifier);

  // 3. bygga upp query-parametrarna
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });

  // 4. skicka användaren till Spotifys login-sida
  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

const Login = () => {
  return (
    <Box sx={{
          backgroundColor: 'background.paper',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }} >
      <img
        src="/Spotify_Logo.png"
        alt="Spotify logo"
        style={{ marginBottom: '300px', width: '70%', maxWidth: '500px' }}
      />
      <Button
        onClick={redirectToSpotifyAuth}
        color="primary"
        size="large"
        variant="contained"
      >
        Login to Spotify
      </Button>
    </Box>
  );
};

export default Login;
