// authUtils.js

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token'); // Ensure the key matches your storage
  if (token) {
    try {
      const decoded = parseJwt(token);
      return decoded._id; // Extract the user ID from the token
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  } else {
    console.error('No token found in local storage');
    return null;
  }
};

function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}
