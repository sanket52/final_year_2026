import { API_BASE } from "../config/site";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(t) {
  if (t) localStorage.setItem("token", t);
  else localStorage.removeItem("token");
}

export function authHeaders(json = true) {
  const t = getToken();
  const h = {};
  if (t) h.Authorization = `Bearer ${t}`;
  if (json) h["Content-Type"] = "application/json";
  return h;
}

/** Use with FormData — do not set Content-Type (browser sets multipart boundary). */
export function authHeadersMultipart() {
  const t = getToken();
  const h = {};
  if (t) h.Authorization = `Bearer ${t}`;
  return h;
}

export { API_BASE };
