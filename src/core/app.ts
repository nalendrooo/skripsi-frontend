import { ENV_BACKEND_URL } from "./environtment";

export const BASE_URL = `${ENV_BACKEND_URL}/api/admin`;

export const API_ENDPOINTS = {
  user: `${BASE_URL}/user`,
  category: `${BASE_URL}/category`,
  division: `${BASE_URL}/division`,
  unit: `${BASE_URL}/unit`,
  item: `${BASE_URL}/item`,
  itemBalance: `${BASE_URL}/item-balance`,
  itemRestock: `${BASE_URL}/item-restock`,
  itemOut: `${BASE_URL}/item-out`,
  operator: `${BASE_URL}/operator`,
  dashboard: `${BASE_URL}/dashboard`,
  login: `${ENV_BACKEND_URL}/api/operator`,
  downloadExcel: `${ENV_BACKEND_URL}/api/download-excel`,
};
