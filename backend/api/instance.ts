import axios, { type AxiosRequestConfig } from "axios";

export const instance = axios.create({
  baseURL: process.env.API_BASE_URL || "https://sandbox-api.okto.tech",
  headers: {
    "x-api-key": process.env.OKTO_SERVER_API_KEY,
  },
});
