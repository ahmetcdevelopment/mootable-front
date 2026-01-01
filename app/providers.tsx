"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

/**
 * Global providers wrapper.
 * 
 * NEDEN CLIENT COMPONENT:
 * QueryClientProvider ve diğer provider'lar client-side state gerektirir.
 * "use client" directive ile client boundary oluşturuyoruz.
 * 
 * QUERY CLIENT CONFIG:
 * - staleTime: 60 saniye - cache'lenmiş data bu süre boyunca "fresh" sayılır
 * - retry: 1 - sadece 1 kez retry (backend kontrolünde)
 * - refetchOnWindowFocus: false - tab değişiminde otomatik refetch kapalı
 */

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
