// authUtils.js
"use client";
export const getUserIdFromToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        const decoded = parseJwt(token);
        return decoded._id; // Extract the user id from token
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      console.error('No token found in local storage');
      return null;
    }
  }

};

function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}
