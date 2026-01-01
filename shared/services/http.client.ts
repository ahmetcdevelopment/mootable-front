import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth.store";

/**
 * Merkezi HTTP client.
 * 
 * NEDEN AXIOS INSTANCE:
 * 1. Interceptor'lar tek yerde tanımlanır
 * 2. Base URL, timeout, headers merkezi
 * 3. Her feature kendi axios import etmez
 * 
 * INTERCEPTOR MİMARİSİ:
 * 
 * Request Interceptor:
 * - JWT token'ı Authorization header'a ekler
 * - Request logging (development)
 * 
 * Response Interceptor:
 * - 401 → Token expired, refresh token dene
 * - Refresh başarısız → Logout ve login'e yönlendir
 * - Diğer hatalar → Error format standardize
 * 
 * ANTI-PATTERN:
 * Her component'te axios.get('/api/...') çağrısı.
 * Token yönetimi, error handling her yerde tekrar edilir.
 * Bir gün base URL değişir, 50 dosya update gerekir.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const httpClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return httpClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = useAuthStore.getState().refreshToken;

      if (!refreshToken) {
        useAuthStore.getState().logout();
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          token: refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        useAuthStore.getState().setTokens(accessToken, newRefreshToken);
        
        processQueue(null, accessToken);
        
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return httpClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export { API_URL };
