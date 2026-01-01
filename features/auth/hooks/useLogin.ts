import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import type { LoginRequest } from "../types/auth.types";

/**
 * Login mutation hook.
 * 
 * TanStack Query mutation kullanımı:
 * - Loading state otomatik
 * - Error handling otomatik
 * - Success callback ile redirect
 * 
 * NEDEN useMutation:
 * 1. Retry logic built-in
 * 2. Error/success state'leri otomatik
 * 3. Optimistic update desteği
 * 4. DevTools entegrasyonu
 */

export function useLogin() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      login(
        {
          id: response.userId,
          username: response.username,
          email: response.email,
          displayName: response.displayName,
          avatarUrl: response.avatarUrl,
          roles: response.roles,
        },
        response.accessToken,
        response.refreshToken
      );
      router.push("/servers");
    },
  });
}
