import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { signalRManager } from "@/shared/services/signalr.manager";

export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: async () => {
      await signalRManager.disconnectAll();
      logout();
      router.push("/login");
    },
    onError: async () => {
      await signalRManager.disconnectAll();
      logout();
      router.push("/login");
    },
  });
}
