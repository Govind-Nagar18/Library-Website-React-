import axios from "axios";

const isLocal = import.meta.env.MODE === "development";

export const BASE_URL = isLocal
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_DEPLOY;

export default function Axiosinstance() {
  return axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
