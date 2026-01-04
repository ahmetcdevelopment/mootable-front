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
  Sparkles
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
      label: 'Ships',
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
    <nav className="sticky top-0 z-50 border-b border-ink-800 bg-ink-900/95 backdrop-blur-xl">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/wonderland" className="hover:opacity-80 transition-opacity">
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
                      'relative px-4 py-2 rounded-lg transition-all duration-200',
                      'hover:bg-ink-800/50 group',
                      active && 'bg-ink-800/70'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={cn(
                        'w-4 h-4 transition-colors',
                        active ? 'text-honey-500' : 'text-ink-400 group-hover:text-honey-400'
                      )} />
                      <span className={cn(
                        'text-body-sm font-medium transition-colors',
                        active ? 'text-ink-50' : 'text-ink-400 group-hover:text-ink-200'
                      )}>
                        {item.label}
                      </span>
                    </div>

                    {active && (
                      <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-honey-500 rounded-full" />
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
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-800/50 border border-ink-700">
                <Sparkles className="w-4 h-4 text-honey-500" />
                <span className="text-caption font-medium text-ink-200">
                  {user.enlightenmentScore || 0}
                </span>
              </div>
            )}

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-honey-500 to-honey-600 flex items-center justify-center text-ink-950 font-bold text-sm shadow-lg shadow-honey-500/20">
                {(user?.displayName || user?.username || 'U')[0].toUpperCase()}
              </div>
              <div className="hidden md:block">
                <p className="text-body-sm font-medium text-ink-100">
                  {user?.displayName || user?.username}
                </p>
                <p className="text-caption text-ink-500">Online</p>
              </div>
              <Button
                onClick={logout}
                variant="ghost"
                className="text-ink-400 hover:text-ink-200 hover:bg-ink-800/50 p-2 ml-2"
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