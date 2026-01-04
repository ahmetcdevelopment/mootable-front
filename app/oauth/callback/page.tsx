"use client";

import { useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { PageLoader } from "@/shared/components/PageLoader";

function OAuth2CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent running multiple times
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const handleOAuth2Callback = () => {
      // Extract tokens and user info from URL params
      const accessToken = searchParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token");
      const userId = searchParams.get("user_id");
      const username = searchParams.get("username");
      const email = searchParams.get("email");
      const isNewUser = searchParams.get("is_new_user") === "true";
      const provider = searchParams.get("provider");
      const error = searchParams.get("error");

      if (error) {
        // Handle OAuth2 error
        console.error("OAuth2 login failed:", error);
        router.push(`/login?error=${error}&provider=${provider}`);
        return;
      }

      if (accessToken && refreshToken && userId) {
        // Store tokens and user info
        login(
          {
            id: userId,
            username: username || "",
            email: email || "",
            displayName: username || "",
            avatarUrl: undefined,
            roles: [],
          },
          accessToken,
          refreshToken
        );

        // Redirect based on new user status
        if (isNewUser) {
          // New user - redirect to onboarding
          router.push("/onboarding");
        } else {
          // Existing user - redirect to main app
          router.push("/servers");
        }
      } else {
        // Missing required parameters
        router.push("/login?error=invalid_callback");
      }
    };

    handleOAuth2Callback();
  }, [searchParams, router, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-950">
      <div className="text-center">
        <PageLoader />
        <h2 className="mt-4 text-xl font-semibold text-honey-500">
          Entering the Matrix...
        </h2>
        <p className="mt-2 text-ink-400">
          Completing authentication with your chosen provider
        </p>
      </div>
    </div>
  );
}

export default function OAuth2CallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-ink-950">
        <PageLoader />
      </div>
    }>
      <OAuth2CallbackContent />
    </Suspense>
  );
}