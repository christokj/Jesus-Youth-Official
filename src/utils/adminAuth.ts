import axios from "axios";
import { apiBaseURL } from "../config/api";

export const adminTokenStorageKey = "token";
export const adminSessionExpiryStorageKey = "adminSessionExpiresAt";
const adminSessionMessageStorageKey = "adminSessionMessage";

export const ADMIN_SESSION_EXPIRED_EVENT = "admin-session-expired";

const adminProtectedRoutes = ["/admin/", "/user/previous-year/"];
const adminPublicRoutes = ["/admin/login"];

export interface AdminSessionValidationResult {
  valid: boolean;
  message?: string;
}

export const isAdminProtectedRequest = (url?: string) => {
  if (!url) {
    return false;
  }

  if (adminPublicRoutes.some((route) => url.includes(route))) {
    return false;
  }

  return adminProtectedRoutes.some((route) => url.includes(route));
};

export const getAdminToken = () => localStorage.getItem(adminTokenStorageKey);

export const getAdminSessionExpiry = () => {
  const rawValue = localStorage.getItem(adminSessionExpiryStorageKey);
  const parsedValue = Number(rawValue);
  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : null;
};

export const saveAdminSession = (token: string, expiresAt: number) => {
  localStorage.setItem(adminTokenStorageKey, token);
  localStorage.setItem(adminSessionExpiryStorageKey, String(expiresAt));
};

export const clearAdminSession = () => {
  localStorage.removeItem(adminTokenStorageKey);
  localStorage.removeItem(adminSessionExpiryStorageKey);
};

export const consumeAdminSessionMessage = () => {
  const message = sessionStorage.getItem(adminSessionMessageStorageKey);

  if (message) {
    sessionStorage.removeItem(adminSessionMessageStorageKey);
  }

  return message;
};

export const expireAdminSession = (message = "Admin session expired. Please login again.") => {
  clearAdminSession();
  sessionStorage.setItem(adminSessionMessageStorageKey, message);
  window.dispatchEvent(new CustomEvent(ADMIN_SESSION_EXPIRED_EVENT, { detail: { message } }));
};

export const validateStoredAdminSession = (): AdminSessionValidationResult => {
  const token = getAdminToken();

  if (!token) {
    return { valid: false, message: "Please login to continue." };
  }

  const expiryTime = getAdminSessionExpiry();

  if (!expiryTime) {
    return { valid: false, message: "Admin session information is missing. Please login again." };
  }

  if (expiryTime <= Date.now()) {
    return { valid: false, message: "Admin session expired. Please login again." };
  }

  return { valid: true };
};

export const getAdminAuthHeaders = () => {
  const token = getAdminToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
    "x-admin-token": token,
  };
};

export const validateAdminSessionWithServer = async (): Promise<AdminSessionValidationResult> => {
  const storedValidation = validateStoredAdminSession();

  if (!storedValidation.valid) {
    return storedValidation;
  }

  try {
    await axios.get(`${apiBaseURL}/admin/validate-session`, {
      withCredentials: true,
      headers: getAdminAuthHeaders(),
    });

    return { valid: true };
  } catch (error: unknown) {
    const message =
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof error.response === "object" &&
      error.response !== null &&
      "data" in error.response &&
      typeof error.response.data === "object" &&
      error.response.data !== null &&
      "message" in error.response.data
        ? String(error.response.data.message)
        : "Admin session expired or invalid. Please login again.";

    return {
      valid: false,
      message,
    };
  }
};
