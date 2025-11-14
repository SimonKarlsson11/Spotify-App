// src/utils/getAccessTokenFromStorage.js
export function getAccessTokenFromStorage() {
  const tokenFromSessionStorage = sessionStorage.getItem('spotifyToken');
  if (tokenFromSessionStorage !== null) {
    return tokenFromSessionStorage;
  }
  return false;
}
