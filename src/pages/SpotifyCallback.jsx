// src/pages/SpotifyCallback.jsx
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '../utils/pkce';

const SpotifyCallback = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const handledRef = useRef(false); // 👈 för att undvika dubbelkörning i StrictMode

  useEffect(() => {
    if (handledRef.current) return; // redan kört en gång
    handledRef.current = true;

    const params = new URLSearchParams(search);
    const code = params.get('code');

    if (!code) {
      navigate('/login');
      return;
    }

    (async () => {
      await getToken(code); // den sparar spotifyToken i sessionStorage
      navigate('/dashboard');
    })();
  }, [search, navigate]);

  return <div style={{ padding: 40 }}>Logging in with Spotify...</div>;
};

export default SpotifyCallback;
