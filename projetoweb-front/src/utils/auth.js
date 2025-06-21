export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('jwtToken', token);
  } else {
    localStorage.removeItem('jwtToken');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('jwtToken');
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (decoded.exp * 1000 < Date.now()) {
      setAuthToken(null);
      return false;
    }
  } catch (e) {
    console.error("Erro ao decodificar token:", e);
    setAuthToken(null);
    return false;
  }
  return true;
};