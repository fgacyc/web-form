import createClient from "openapi-fetch";

export const useAPI = () => {
  const token = sessionStorage.getItem("fgacyc-auth-token");

  return createClient({
    baseUrl: import.meta.env.VITE_IDENTITY_HOST,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
