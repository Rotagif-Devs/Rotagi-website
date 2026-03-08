export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
};