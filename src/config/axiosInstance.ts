import axios, { AxiosError, AxiosHeaders, CanceledError } from "axios";
import { apiBaseURL } from "./api";
import {
  expireAdminSession,
  getAdminToken,
  isAdminProtectedRequest,
  validateStoredAdminSession,
} from "../utils/adminAuth";

export const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const requiresAdminAuth = isAdminProtectedRequest(config.url);

  if (requiresAdminAuth) {
    const validation = validateStoredAdminSession();

    if (!validation.valid) {
      expireAdminSession(validation.message);
      return Promise.reject(new CanceledError(validation.message));
    }
  }

  const token = getAdminToken();

  if (token) {
    if (config.headers?.set) {
      config.headers.set("Authorization", `Bearer ${token}`);
      config.headers.set("x-admin-token", token);
    } else {
      config.headers = AxiosHeaders.from({
        ...config.headers,
        Authorization: `Bearer ${token}`,
        "x-admin-token": token,
      });
    }
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && isAdminProtectedRequest(error.config?.url)) {
      const message =
        typeof error.response.data === "object" &&
        error.response.data !== null &&
        "message" in error.response.data
          ? String(error.response.data.message)
          : "Admin session expired or invalid. Please login again.";

      expireAdminSession(message);
    }

    return Promise.reject(error);
  },
);
