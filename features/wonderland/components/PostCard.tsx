'use client';

import React, { useState } from 'react';
import { Post } from '@/types/post.types';
import { usePostStore } from '@/store/postStore';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Eye, Share2, Trash2, Edit, Pin, Sparkles, Bookmark, MoreHorizontal } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface PostCardProps {
  post: Post;
  onReply?: () => void;
  onEdit?: () => void;
  isCompact?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onReply,
  onEdit,
  isCompact = false
}) => {
  const { likePost, deletePost } = usePostStore();
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    await likePost(post.id);
    setIsLiking(false);
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    await deletePost(post.id);
    setIsDeleting(false);
  };

  const getEnlightenmentColor = (score: number) => {
    if (score >= 100) return 'text-honey-300';
    if (score >= 50) return 'text-honey-400';
    if (score >= 20) return 'text-honey-500';
    return 'text-ink-400';
  };

  return (
    <article
      className={cn(
        'group relative bg-ink-800/40 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300',
        'border border-ink-700/50 hover:border-honey-500/30',
        'hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)]',
        isCompact ? 'p-4' : 'p-5'
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-honey-500/[0.02] via-transparent to-ink-900/20 pointer-events-none" />
      
      {/* Left accent line for high enlightenment */}
      {post.enlightenmentScore >= 50 && (
        <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-gradient-to-b from-honey-400 via-honey-500 to-honey-600 rounded-full" />
      )}

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            {/* Avatar with gradient ring */}
            <div className="relative">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-honey-400 to-honey-600 p-0.5">
                <div className="h-full w-full rounded-full bg-ink-900 flex items-center justify-center">
                  <span className="text-honey-400 font-bold text-sm">
                    {post.userDisplayName[0].toUpperCase()}
                  </span>
                </div>
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-ink-900" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-ink-100 hover:text-honey-400 cursor-pointer transition-colors">
                  {post.userDisplayName}
                </span>
                <span className="text-caption text-ink-500">
                  @{post.userName}
                </span>
                {post.isPinned && (
                  <span className="flex items-center gap-1 text-xs text-honey-500 bg-honey-500/10 px-2 py-0.5 rounded-full">
                    <Pin className="w-3 h-3" />
                    Pinned
                  </span>
                )}
              </div>
              <time className="text-caption text-ink-500">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </time>
            </div>
          </div>

          {/* Actions Menu */}
          <div className={cn(
            'flex items-center gap-1 transition-opacity duration-200',
            showActions ? 'opacity-100' : 'opacity-0'
          )}>
            {post.isOwnPost && (
              <>
                {onEdit && (
                  <button
                    onClick={onEdit}
                    className="p-2 hover:bg-ink-700/50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-ink-400 hover:text-honey-400" />
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-ink-400 hover:text-red-400" />
                </button>
              </>
            )}
            <button className="p-2 hover:bg-ink-700/50 rounded-lg transition-colors">
              <MoreHorizontal className="w-4 h-4 text-ink-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4 pl-14">
          <p className="text-ink-100 text-body leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </p>

          {/* Tags - Rabbit Holes */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-caption text-honey-400 hover:text-honey-300 bg-honey-500/10 hover:bg-honey-500/20 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Category Badge */}
          {post.category && (
            <div className="mt-3">
              <span className="text-caption px-3 py-1 bg-ink-700/50 text-ink-300 rounded-full border border-ink-600/50">
                {post.category}
              </span>
            </div>
          )}
        </div>

        {/* Media Preview */}
        {post.mediaUrls.length > 0 && (
          <div className="mb-4 pl-14">
            <div className="bg-ink-800/50 border border-ink-700/50 rounded-xl p-3 flex items-center gap-2">
              <div className="w-10 h-10 bg-honey-500/10 rounded-lg flex items-center justify-center">
                <span className="text-lg">📎</span>
              </div>
              <span className="text-caption text-ink-400">
                {post.mediaUrls.length} attachment{post.mediaUrls.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}

        {/* Footer / Actions */}
        <div className="flex items-center justify-between pl-14 pt-3">
          <div className="flex items-center gap-1">
            {/* Like Button */}
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 group',
                post.isLikedByCurrentUser
                  ? 'text-rose-400 bg-rose-500/10'
                  : 'text-ink-400 hover:text-rose-400 hover:bg-rose-500/10'
              )}
            >
              <Heart
                className={cn(
                  'w-4 h-4 transition-transform group-hover:scale-110',
                  post.isLikedByCurrentUser && 'fill-current'
                )}
              />
              <span className="text-caption font-medium">{post.likeCount}</span>
            </button>

            {/* Reply Button */}
            <button
              onClick={onReply}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-ink-400 hover:text-sky-400 hover:bg-sky-500/10 transition-all group"
            >
              <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="text-caption font-medium">{post.replyCount}</span>
            </button>

            {/* Share Button */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-ink-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all group">
              <Share2 className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="text-caption font-medium">{post.shareCount}</span>
            </button>

            {/* Bookmark */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-ink-400 hover:text-honey-400 hover:bg-honey-500/10 transition-all group">
              <Bookmark className="w-4 h-4 transition-transform group-hover:scale-110" />
            </button>
          </div>

          {/* Right side: Views & Enlightenment */}
          <div className="flex items-center gap-3">
            {/* View Count */}
            <div className="flex items-center gap-1 text-ink-500">
              <Eye className="w-3.5 h-3.5" />
              <span className="text-caption">{post.viewCount}</span>
            </div>

            {/* Enlightenment Score */}
            <div
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-full',
                post.enlightenmentScore >= 50 ? 'bg-honey-500/10' : 'bg-ink-700/30',
                getEnlightenmentColor(post.enlightenmentScore)
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-caption font-medium">
                {post.enlightenmentScore}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;