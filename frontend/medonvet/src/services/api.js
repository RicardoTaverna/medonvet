import axios from "axios";
import { getToken } from "./auth";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const imgApi = axios.create({
  baseURL: "http://127.0.0.1:8001"
})

export const viaCEP = axios.create({
  baseURL: "https://viacep.com.br/ws/"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

api.defaults.xsrfCookieName = "csrftoken"
api.defaults.xsrfHeaderName = "X-CSRFTOKEN"

