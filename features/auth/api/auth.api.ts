import { httpClient } from "@/shared/services/http.client";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenResponse,
} from "../types/auth.types";

/**
 * Auth API calls.
 * 
 * NEDEN AYRI API DOSYASI:
 * 1. API endpoint'leri tek yerde
 * 2. Type safety garanti
 * 3. Test edilebilir (mock edilebilir)
 * 4. Hook'lar bu fonksiyonları çağırır
 * 
 * ANTI-PATTERN:
 * Component içinde doğrudan axios.post() çağrısı.
 * Endpoint değişirse 10 farklı component güncellenir.
 */

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await httpClient.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await httpClient.post<RegisterResponse>("/auth/register", data);
    return response.data;
  },

  refreshToken: async (token: string): Promise<RefreshTokenResponse> => {
    const response = await httpClient.post<RefreshTokenResponse>("/auth/refresh-token", { token });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await httpClient.post("/auth/logout");
  },
};
