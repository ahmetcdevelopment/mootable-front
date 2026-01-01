import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import type { RegisterRequest } from "../types/auth.types";

export function useRegister() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      login(
        {
          id: response.userId,
          username: response.username,
          email: response.email,
          roles: ["User"],
        },
        response.accessToken,
        response.refreshToken
      );
      router.push("/servers");
    },
  });
}
