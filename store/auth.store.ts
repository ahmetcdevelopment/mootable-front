import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Auth state yönetimi.
 * 
 * NEDEN ZUSTAND:
 * 1. Redux'a göre çok daha az boilerplate
 * 2. TypeScript first-class support
 * 3. Selector'lar otomatik memoized
 * 4. DevTools entegrasyonu kolay
 * 
 * PERSIST MIDDLEWARE:
 * Token'lar localStorage'da saklanır.
 * Page refresh'te login state korunur.
 * 
 * ANTI-PATTERN:
 * Auth state'i Context API ile yönetmek.
 * Her state değişikliğinde tüm consumer'lar re-render olur.
 * 100+ component'li app'te performance nightmare.
 * 
 * SECURITY NOTE:
 * localStorage XSS'e açık. Production'da:
 * - Access token: memory (Zustand)
 * - Refresh token: httpOnly cookie (server-side set)
 * Bu implementasyon demo amaçlı localStorage kullanıyor.
 */

export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  roles: string[];
  enlightenmentScore?: number;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: user !== null,
        }),

      setTokens: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
        }),

      login: (user, accessToken, refreshToken) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "mootable-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectAccessToken = (state: AuthState) => state.accessToken;
