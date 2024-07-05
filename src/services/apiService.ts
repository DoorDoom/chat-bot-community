import { Methods } from "constants/enums";
import { fetchRequest } from "./httpService";

const apiUrl = "/api/hello";

export const getHello = async () => {
  const request = {
    method: Methods.Get,
  } as RequestInit;

  return await fetchRequest(apiUrl, request);
};
