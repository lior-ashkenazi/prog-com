export const setToken = (token: string) => {
  localStorage.setItem("prog-com-jwt", token);
};

export const removeToken = () => {
  localStorage.removeItem("prog-com-jwt");
};
