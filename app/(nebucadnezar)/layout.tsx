"use client";

import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";
import { PageLoader } from "@/shared/components/PageLoader";

/**
 * Protected layout for authenticated users.
 * 
 * NEDEN LAYOUT'TA AUTH GUARD:
 * Her protected page'de ayrı ayrı guard çağırmak yerine,
 * layout seviyesinde tek bir guard tüm alt route'ları korur.
 * 
 * Code duplication önlenir, maintenance kolaylaşır.
 */

export default function NebucadnezarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated } = useAuthGuard();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-moot-background flex">
      {/* Sidebar will be added here */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
