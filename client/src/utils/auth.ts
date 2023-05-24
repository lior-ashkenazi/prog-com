const setToken = (token: string) => {
  localStorage.setItem("prog-com-jwt", token);
};

const getToken = () => {
  return localStorage.getItem("prog-com-jwt");
};

const removeToken = () => {
  localStorage.removeItem("prog-com-jwt");
};

export { setToken, getToken, removeToken };
