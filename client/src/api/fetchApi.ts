import { ApiError } from "../errors/ApiError";

export const fetchApi = async <T>(
  url: string,
  init?: RequestInit,
): Promise<T> => {
  const res = await fetch(url, init);

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message = isJson ? (data.message ?? res.statusText) : res.statusText;
    throw new ApiError(message, res.status);
  }

  if (!isJson) {
    throw new ApiError("Response is only accepted as JSON", res.status);
  }

  return data as T;
};
