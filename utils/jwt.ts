// utils/jwt.js
export const base64UrlToBase64 = (input) => {
  let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return base64;
};

export const decodeToken = (token) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("JWT token must have 3 parts");
  }
  const payload = parts[1];
  const decodedPayload = atob(base64UrlToBase64(payload));
  return JSON.parse(decodedPayload);
};
