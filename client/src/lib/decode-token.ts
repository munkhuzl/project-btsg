export const getUserIdFromToken = (token: string | null) => {
  if (!token) return null;
  
  try {
    // Decode the JWT token (without verification since this is client-side)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const decoded = JSON.parse(jsonPayload);
    console.log('Decoded token payload:', decoded);
    console.log('Looking for id field:', decoded.id);
    console.log('Looking for userId field:', decoded.userId);
    
    // Try both possible field names
    console.log('Returning id:', decoded.id || decoded.userId);
    return decoded.id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
