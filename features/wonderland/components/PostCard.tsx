'use client';

import React, { useState } from 'react';
import { Post } from '@/types/post.types';
import { usePostStore } from '@/store/postStore';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Eye, Share2, MoreVertical, Trash2, Edit, Pin } from 'lucide-react';
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
    if (score >= 100) return 'text-green-300 shadow-green-500/50';
    if (score >= 50) return 'text-green-400 shadow-green-500/30';
    if (score >= 20) return 'text-green-500 shadow-green-500/20';
    return 'text-green-600';
  };

  return (
    <article
      className={cn(
        'relative border border-green-900/30 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300',
        'hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-900/5 before:to-transparent before:pointer-events-none',
        isCompact && 'p-3',
        !isCompact && 'p-4'
      )}
    >
      {/* Matrix rain effect on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent animate-matrix-rain" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full border border-green-500/30 bg-black flex items-center justify-center text-green-500 font-bold">
              {post.userDisplayName[0].toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-green-400">
                  {post.userDisplayName}
                </span>
                <span className="text-xs text-green-600">
                  @{post.userName}
                </span>
                {post.isPinned && (
                  <Pin className="w-3 h-3 text-green-500" />
                )}
              </div>
              <time className="text-xs text-green-600/70">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </time>
            </div>
          </div>

          {post.isOwnPost && (
            <div className="flex gap-1">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="p-1 hover:bg-green-900/20 rounded transition-colors"
                >
                  <Edit className="w-4 h-4 text-green-500" />
                </button>
              )}
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1 hover:bg-red-900/20 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mb-3">
          <p className="text-green-100 whitespace-pre-wrap break-words">
            {post.content}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-green-400 hover:text-green-300 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Category */}
          {post.category && (
            <div className="mt-2">
              <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded">
                {post.category}
              </span>
            </div>
          )}
        </div>

        {/* Media URLs (placeholder for future implementation) */}
        {post.mediaUrls.length > 0 && (
          <div className="mb-3 p-2 bg-green-900/10 rounded">
            <span className="text-xs text-green-500">
              {post.mediaUrls.length} media attachment(s)
            </span>
          </div>
        )}

        {/* Footer / Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-green-900/30">
          <div className="flex items-center gap-4">
            {/* Like Button */}
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={cn(
                'flex items-center gap-1 transition-all duration-300 group',
                post.isLikedByCurrentUser
                  ? 'text-green-400'
                  : 'text-green-600 hover:text-green-400'
              )}
            >
              <Heart
                className={cn(
                  'w-4 h-4 transition-transform group-hover:scale-110',
                  post.isLikedByCurrentUser && 'fill-current'
                )}
              />
              <span className="text-xs">{post.likeCount}</span>
            </button>

            {/* Reply Button */}
            <button
              onClick={onReply}
              className="flex items-center gap-1 text-green-600 hover:text-green-400 transition-colors group"
            >
              <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="text-xs">{post.replyCount}</span>
            </button>

            {/* View Count */}
            <div className="flex items-center gap-1 text-green-600">
              <Eye className="w-4 h-4" />
              <span className="text-xs">{post.viewCount}</span>
            </div>

            {/* Share Count */}
            <div className="flex items-center gap-1 text-green-600">
              <Share2 className="w-4 h-4" />
              <span className="text-xs">{post.shareCount}</span>
            </div>
          </div>

          {/* Enlightenment Score */}
          <div
            className={cn(
              'flex items-center gap-1',
              getEnlightenmentColor(post.enlightenmentScore)
            )}
          >
            <span className="text-xs font-mono">
              ⚡ {post.enlightenmentScore}
            </span>
          </div>
        </div>
      </div>

      {/* Matrix glow effect for high enlightenment */}
      {post.enlightenmentScore >= 50 && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
      )}
    </article>
  );
};

export default PostCard;