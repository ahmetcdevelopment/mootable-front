'use client';

import React, { useState } from 'react';
import { usePostStore } from '@/store/postStore';
import { PostVisibility } from '@/types/post.types';
import { Button } from '@/shared/ui/Button';
import { Send, Hash, Globe, Users, Lock, Server } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { useAuthStore } from '@/store/auth.store';

interface CreatePostProps {
  parentPostId?: string;
  onSuccess?: () => void;
  placeholder?: string;
}

export const CreatePost: React.FC<CreatePostProps> = ({
  parentPostId,
  onSuccess,
  placeholder = "Take the red pill... Share your truth with the Matrix"
}) => {
  const { user } = useAuthStore();
  const { createPost, replyToPost, isCreating } = usePostStore();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState<PostVisibility>(PostVisibility.Public);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    const postData = {
      content: content.trim(),
      tags: tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0),
      category: category || undefined,
      visibility,
      mediaUrls: [],
      htmlContent: undefined
    };

    let success = false;
    if (parentPostId) {
      success = await replyToPost(parentPostId, postData);
    } else {
      success = await createPost(postData);
    }

    if (success) {
      setContent('');
      setTags('');
      setCategory('');
      setVisibility(PostVisibility.Public);
      onSuccess?.();
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative border border-green-900/30 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300',
        isFocused && 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.15)]',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-900/5 before:to-transparent before:pointer-events-none'
      )}
    >
      <div className="relative p-4">
        <div className="flex gap-3">
          {/* User Avatar */}
          <div className="h-10 w-10 rounded-full border border-green-500/30 bg-black flex items-center justify-center text-green-500 font-bold">
            {(user?.displayName || user?.username || 'U')[0].toUpperCase()}
          </div>

          <div className="flex-1 space-y-3">
            {/* Main Textarea */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className={cn(
                'w-full min-h-[100px] bg-transparent border-0 text-green-100 placeholder:text-green-700',
                'focus:ring-0 focus:outline-none resize-none',
                'scrollbar-thin scrollbar-thumb-green-800 scrollbar-track-transparent'
              )}
              maxLength={5000}
            />

            {/* Expanded Options (show when focused or has content) */}
            {(isFocused || content) && (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                {/* Tags Input */}
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-green-600" />
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    className="flex-1 bg-transparent text-sm text-green-400 placeholder:text-green-700 focus:outline-none"
                  />
                </div>

                {/* Category & Visibility */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category (optional)"
                    className="flex-1 bg-transparent text-sm text-green-400 placeholder:text-green-700 focus:outline-none"
                  />

                  <select
                    value={visibility.toString()}
                    onChange={(e) => setVisibility(parseInt(e.target.value) as PostVisibility)}
                    className="w-[140px] bg-black/50 border border-green-900/50 text-green-400 rounded px-2 py-1 text-sm focus:outline-none focus:border-green-500/50"
                  >
                    <option value="0">🌐 Public</option>
                    <option value="1">👥 Followers</option>
                    <option value="3">🔒 Private</option>
                    <option value="4">🖥️ Server Only</option>
                  </select>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-green-600">
                {content.length}/5000
              </div>

              <Button
                type="submit"
                disabled={!content.trim() || isCreating}
                className={cn(
                  'bg-green-600 hover:bg-green-500 text-black font-medium',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-all duration-300'
                )}
              >
                {isCreating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Transmitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    {parentPostId ? 'Reply' : 'Broadcast'}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Matrix effect on focus */}
      {isFocused && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/20 to-transparent animate-matrix-rain" />
        </div>
      )}
    </form>
  );
};

export default CreatePost;