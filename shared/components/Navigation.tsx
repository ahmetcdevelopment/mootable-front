'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { Logo } from '@/shared/components/Logo';
import { Button } from '@/shared/ui/Button';
import {
  Home,
  Compass,
  Users,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Zap
} from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const navItems = [
    {
      href: '/wonderland',
      label: 'Wonderland',
      icon: Compass,
      description: 'Feed & Timeline'
    },
    {
      href: '/servers',
      label: 'Nebuchadnezzar',
      icon: Users,
      description: 'Your Ships'
    },
    {
      href: '/moot-tables',
      label: 'Moot Tables',
      icon: Home,
      description: 'Discussion Tables'
    },
  ];

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-green-900/30 bg-black/90 backdrop-blur-xl">
      {/* Matrix effect overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            #00ff00 2px,
            #00ff00 4px
          )`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/wonderland">
              <Logo size="sm" />
            </Link>

            {/* Main Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 rounded-lg transition-all duration-300',
                      'hover:bg-green-900/20 group',
                      active && 'bg-green-900/30'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={cn(
                        'w-4 h-4 transition-colors',
                        active ? 'text-green-400' : 'text-green-600 group-hover:text-green-500'
                      )} />
                      <span className={cn(
                        'font-medium transition-colors',
                        active ? 'text-green-400' : 'text-green-600 group-hover:text-green-500'
                      )}>
                        {item.label}
                      </span>
                    </div>

                    {active && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Enlightenment Score */}
            {user && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-900/20 border border-green-800/30">
                <Zap className="w-4 h-4 text-green-500" />
                <span className="text-sm font-mono text-green-400">
                  {user.enlightenmentScore || 0}
                </span>
              </div>
            )}

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full border border-green-500/30 bg-black flex items-center justify-center text-green-500 font-bold">
                {(user?.displayName || user?.username || 'U')[0].toUpperCase()}
              </div>
              <span className="hidden md:block text-green-400 font-medium">
                {user?.displayName || user?.username}
              </span>
              <Button
                onClick={logout}
                variant="ghost"
                className="text-red-400 hover:bg-red-900/20 p-2"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;