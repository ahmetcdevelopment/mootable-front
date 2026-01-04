"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useServerStore } from "@/store/serverStore";
import { MootableIcon } from "./Logo";
import { AppLoader } from "./AppLoader";
import { cn } from "@/shared/utils/cn";
import {
  Compass,
  Plus,
  Settings,
  LogOut,
} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const { servers, fetchServers, selectServer } = useServerStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Fetch servers on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchServers({ onlyMyServers: true, pageNumber: 1 });
    }
  }, [isAuthenticated, fetchServers]);

  // Auth check
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return <AppLoader fullScreen text="Follow the white rabbit..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const isWonderland = pathname === "/wonderland";
  const currentServerId = pathname.match(/\/servers\/([^/]+)/)?.[1];

  return (
    <div className="h-screen flex bg-ink-950 overflow-hidden">
      {/* Server Sidebar - Discord style */}
      <aside className="w-[72px] bg-ink-950 flex flex-col items-center py-3 gap-2 border-r border-ink-900">
        {/* Home / Wonderland */}
        <div className={cn("server-icon-wrapper", isWonderland && "active")}>
          <Link
            href="/wonderland"
            className={cn(
              "server-icon",
              isWonderland && "active"
            )}
          >
            <MootableIcon size={28} />
          </Link>
          <span className="tooltip">Wonderland</span>
        </div>

        {/* Divider */}
        <div className="w-8 h-0.5 bg-ink-800 rounded-full my-1" />

        {/* Server List */}
        <div className="flex-1 w-full overflow-y-auto sidebar-scrollbar flex flex-col items-center gap-2 px-3">
          {servers.map((server) => (
            <div
              key={server.id}
              className={cn(
                "server-icon-wrapper tooltip-trigger",
                currentServerId === server.id && "active"
              )}
            >
              <Link
                href={`/servers/${server.id}`}
                className={cn(
                  "server-icon",
                  currentServerId === server.id && "active"
                )}
                onClick={() => selectServer(server)}
              >
                {server.iconUrl ? (
                  <img
                    src={server.iconUrl}
                    alt={server.name}
                    className="w-full h-full rounded-inherit object-cover"
                  />
                ) : (
                  <span className="text-lg font-semibold">
                    {server.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </Link>
              <span className="tooltip">{server.name}</span>
            </div>
          ))}

          {/* Add Server Button */}
          <div className="server-icon-wrapper tooltip-trigger">
            <Link
              href="/servers?create=true"
              className="server-icon !bg-transparent border-2 border-dashed border-ink-700 hover:border-honey-500 hover:text-honey-500"
            >
              <Plus className="w-5 h-5" />
            </Link>
            <span className="tooltip">Create Ship</span>
          </div>

          {/* Discover Servers */}
          <div className="server-icon-wrapper tooltip-trigger">
            <Link
              href="/discover"
              className="server-icon !bg-transparent border-2 border-dashed border-ink-700 hover:border-honey-500 hover:text-honey-500"
            >
              <Compass className="w-5 h-5" />
            </Link>
            <span className="tooltip">Discover Ships</span>
          </div>
        </div>

        {/* User Avatar at Bottom */}
        <div className="mt-auto pt-2 border-t border-ink-800 w-full flex justify-center">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="server-icon !bg-gradient-to-br from-honey-500 to-honey-600 text-ink-950"
            >
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.displayName || user.username}
                  className="w-full h-full rounded-inherit object-cover"
                />
              ) : (
                <span className="text-lg font-bold">
                  {(user?.displayName || user?.username || "U")[0].toUpperCase()}
                </span>
              )}
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute bottom-full left-full ml-2 mb-2 w-56 bg-ink-900 border border-ink-700 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="p-3 border-b border-ink-800">
                  <p className="font-semibold text-ink-100 truncate">
                    {user?.displayName || user?.username}
                  </p>
                  <p className="text-caption text-ink-500 truncate">{user?.email}</p>
                </div>
                <div className="p-1">
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-3 py-2 text-body-sm text-ink-300 hover:bg-ink-800 hover:text-ink-100 rounded-lg transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-body-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
}

export default AppLayout;
