import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

/**
 * Auth guard hook.
 * 
 * KULLANIM:
 * - Protected page'lerde useAuthGuard() çağrılır
 * - Authenticated değilse login'e redirect
 * - Loading state döndürür (hydration için)
 * 
 * ROLE-BASED GUARD:
 * requiredRoles parametresi ile rol kontrolü.
 * Backend'deki authorization ile senkron olmalı.
 * 
 * ÖNEMLİ:
 * Frontend guard sadece UX içindir.
 * Asıl güvenlik backend'de sağlanır.
 * Kullanıcı frontend'i bypass edebilir, ama API'ye ulaşamaz.
 */

interface UseAuthGuardOptions {
  requiredRoles?: string[];
  redirectTo?: string;
}

export function useAuthGuard(options: UseAuthGuardOptions = {}) {
  const { requiredRoles = [], redirectTo = "/login" } = options;
  const router = useRouter();
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (requiredRoles.length > 0 && user) {
      const hasRequiredRole = requiredRoles.some((role) =>
        user.roles.includes(role)
      );
      
      if (!hasRequiredRole) {
        router.push("/unauthorized");
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRoles, redirectTo, router]);

  return {
    isLoading,
    isAuthenticated,
    user,
    hasRole: (role: string) => user?.roles.includes(role) ?? false,
  };
}
