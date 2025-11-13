// src/App.jsx
import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

function App({ spotifyApi }) {
  return (
    <Routes>
      {/* Hela dashboarden lever under /dashboard */}
      <Route
        path="/dashboard/*"
        element={<Dashboard spotifyApi={spotifyApi} />}
      />

      {/* Fallback: allt annat skickas till /dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
