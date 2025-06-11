import { ENV_BACKEND_URL } from "./environtment";

export const BASE_URL = `${ENV_BACKEND_URL}/api/admin`;

export const API_ENDPOINTS = {
  user: `${BASE_URL}/user`,
  category: `${BASE_URL}/category`,
};
