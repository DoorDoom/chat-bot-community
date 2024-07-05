import { HttpError } from "types/errors";

export const fetchRequest = (url: string, request: RequestInit) => {
  try {
    return fetch(url, request);
  } catch (error) {
    throw new HttpError(400, "Failed to fetch");
  }
};
