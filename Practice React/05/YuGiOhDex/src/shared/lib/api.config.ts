export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export function getApiUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
