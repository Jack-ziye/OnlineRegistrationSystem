const TOKEN_KEY = "token";
const TOKEN_REFRESH_KEY = "refresh_token";

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
const getRefreshToken = () => {
  return localStorage.getItem(TOKEN_REFRESH_KEY);
};
const setToken = (access_token, refresh_token) => {
  localStorage.setItem(TOKEN_KEY, access_token);
  localStorage.setItem(TOKEN_REFRESH_KEY, refresh_token);
};
const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_REFRESH_KEY);
};

export { getToken, getRefreshToken, setToken, removeToken };
