// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import SpotifyCallback from './pages/SpotifyCallback';
import Dashboard from './components/Dashboard/Dashboard';

import ProtectedRoute from './components/NavPlaylist/ProtectedRoute';

function App({ spotifyApi }) {
  return (
    <Routes>
      {/* Publik login-sida */}
      <Route path="/login" element={<Login />} />

      {/* Spotify callback efter inloggning */}
      <Route path="/callback" element={<SpotifyCallback />} />

      {/* Dashboard är skyddad, kräver token */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard spotifyApi={spotifyApi} />
          </ProtectedRoute>
        }
      />

      {/* Allt annat leder till dashboard (ProtectedRoute tar dig till login om ingen token finns) */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
