import crypto from "./crypto";

const USER_KEY = "user";

const setUsername = (username) => {
  const encrypt = crypto.encrypt(username);
  return localStorage.setItem(USER_KEY, encrypt);
};

const getUsername = () => {
  const value = localStorage.getItem(USER_KEY);
  return value ? crypto.decrypt(value) : "";
};

export { setUsername, getUsername };
