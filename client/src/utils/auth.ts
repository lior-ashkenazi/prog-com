import api from "./api";

export const setToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("prog-com-token", token);
};

export const removeToken = () => {
  delete api.defaults.headers.common["Authorization"];
  localStorage.removeItem("token");
};
