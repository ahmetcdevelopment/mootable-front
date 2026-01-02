'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { usePostStore } from '@/store/postStore';
import { PostSortBy } from '@/types/post.types';
import PostCard from '@/features/wonderland/components/PostCard';
import CreatePost from '@/features/wonderland/components/CreatePost';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import {
  RefreshCw,
  TrendingUp,
  Clock,
  Heart,
  MessageCircle,
  Zap,
  Search
} from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export default function WonderlandPage() {
  const {
    posts,
    isLoading,
    hasNextPage,
    fetchPosts,
    loadMorePosts,
    refreshFeed,
    searchPosts,
    sortPosts
  } = usePostStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<PostSortBy>(PostSortBy.Latest);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initial load
  useEffect(() => {
    fetchPosts({ sortBy: PostSortBy.Latest, pageNumber: 1 });
  }, [fetchPosts]);

  // Handle tab change
  const handleTabChange = async (value: string) => {
    const sortBy = value as PostSortBy;
    setActiveTab(sortBy);
    await sortPosts(sortBy);
  };

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshFeed();
    setIsRefreshing(false);
  };

  // Handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      await searchPosts(searchTerm);
    }
  };

  // Clear search
  const clearSearch = async () => {
    setSearchTerm('');
    await fetchPosts({ sortBy: activeTab, pageNumber: 1 });
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 100
    ) {
      if (hasNextPage && !isLoading) {
        loadMorePosts();
      }
    }
  }, [hasNextPage, isLoading, loadMorePosts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-black">
      {/* Matrix-style background pattern */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            #00ff00 2px,
            #00ff00 4px
          )`,
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-green-400 font-mono">
              WONDERLAND
            </h1>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-black border border-green-500/30 text-green-400 hover:bg-green-900/20"
            >
              <RefreshCw className={cn(
                "w-4 h-4 mr-2",
                isRefreshing && "animate-spin"
              )} />
              Reload Matrix
            </Button>
          </div>

          <p className="text-green-600 text-sm font-mono mb-4">
            &gt; Welcome to the feed. Choose your reality.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search the Matrix..."
                className={cn(
                  "pl-10 pr-20 bg-black border-green-900/50 text-green-400",
                  "placeholder:text-green-700 focus:border-green-500/50",
                  "focus:shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                )}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
              {searchTerm && (
                <Button
                  type="button"
                  onClick={clearSearch}
                  variant="ghost"
                  size="sm"
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-400"
                >
                  Clear
                </Button>
              )}
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-500 text-black"
              >
                Search
              </Button>
            </div>
          </form>
        </header>

        {/* Create Post */}
        <div className="mb-6">
          <CreatePost />
        </div>

        {/* Sort Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            onClick={() => handleTabChange(PostSortBy.Latest)}
            variant={activeTab === PostSortBy.Latest ? "primary" : "ghost"}
            className={cn(
              "flex items-center gap-1",
              activeTab === PostSortBy.Latest
                ? "bg-green-600 text-black"
                : "border-green-900/50 text-green-400 hover:bg-green-900/20"
            )}
          >
            <Clock className="w-4 h-4" />
            Latest
          </Button>
          <Button
            onClick={() => handleTabChange(PostSortBy.Popular)}
            variant={activeTab === PostSortBy.Popular ? "primary" : "ghost"}
            className={cn(
              "flex items-center gap-1",
              activeTab === PostSortBy.Popular
                ? "bg-green-600 text-black"
                : "border-green-900/50 text-green-400 hover:bg-green-900/20"
            )}
          >
            <TrendingUp className="w-4 h-4" />
            Popular
          </Button>
          <Button
            onClick={() => handleTabChange(PostSortBy.MostLiked)}
            variant={activeTab === PostSortBy.MostLiked ? "primary" : "ghost"}
            className={cn(
              "flex items-center gap-1",
              activeTab === PostSortBy.MostLiked
                ? "bg-green-600 text-black"
                : "border-green-900/50 text-green-400 hover:bg-green-900/20"
            )}
          >
            <Heart className="w-4 h-4" />
            Liked
          </Button>
          <Button
            onClick={() => handleTabChange(PostSortBy.MostReplied)}
            variant={activeTab === PostSortBy.MostReplied ? "primary" : "ghost"}
            className={cn(
              "flex items-center gap-1",
              activeTab === PostSortBy.MostReplied
                ? "bg-green-600 text-black"
                : "border-green-900/50 text-green-400 hover:bg-green-900/20"
            )}
          >
            <MessageCircle className="w-4 h-4" />
            Discussed
          </Button>
          <Button
            onClick={() => handleTabChange(PostSortBy.Enlightened)}
            variant={activeTab === PostSortBy.Enlightened ? "primary" : "ghost"}
            className={cn(
              "flex items-center gap-1",
              activeTab === PostSortBy.Enlightened
                ? "bg-green-600 text-black"
                : "border-green-900/50 text-green-400 hover:bg-green-900/20"
            )}
          >
            <Zap className="w-4 h-4" />
            Enlightened
          </Button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {isLoading && posts.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-green-600 font-mono">Loading the Matrix...</p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4 text-6xl">🐰</div>
              <h3 className="text-xl font-bold text-green-400 mb-2">
                The feed is empty
              </h3>
              <p className="text-green-600">
                Take the red pill and be the first to share your truth.
              </p>
            </div>
          ) : (
            <>
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onReply={() => {
                    // Navigate to post detail or open reply modal
                    // TODO: Implement reply functionality
                  }}
                  onEdit={() => {
                    // Open edit modal
                    // TODO: Implement edit functionality
                  }}
                />
              ))}

              {/* Load More Indicator */}
              {isLoading && posts.length > 0 && (
                <div className="flex items-center justify-center py-4">
                  <div className="w-6 h-6 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
                </div>
              )}

              {/* End of Feed */}
              {!hasNextPage && posts.length > 0 && (
                <div className="text-center py-8 border-t border-green-900/30">
                  <p className="text-green-600 font-mono">
                    &gt; You&apos;ve reached the end of the rabbit hole
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Matrix rain animation */}
      <style jsx>{`
        @keyframes matrix-rain {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .animate-matrix-rain {
          animation: matrix-rain 20s linear infinite;
        }
      `}</style>
    </div>
  );
}