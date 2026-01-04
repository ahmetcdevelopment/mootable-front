'use client';

import React, { useState } from 'react';
import { usePostStore } from '@/store/postStore';
import { PostVisibility } from '@/types/post.types';
import { Button } from '@/shared/ui/Button';
import { Send, Hash } from 'lucide-react';
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
        'relative border border-ink-700 bg-ink-800/50 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300',
        isFocused && 'border-honey-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)]',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-honey-500/5 before:to-transparent before:pointer-events-none'
      )}
    >
      <div className="relative p-4">
        <div className="flex gap-3">
          {/* User Avatar */}
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-honey-500 to-honey-600 flex items-center justify-center text-ink-950 font-bold">
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
                'w-full min-h-[100px] bg-transparent border-0 text-ink-100 placeholder:text-ink-500',
                'focus:ring-0 focus:outline-none resize-none',
                'scrollbar-thin scrollbar-thumb-ink-700 scrollbar-track-transparent'
              )}
              maxLength={5000}
            />

            {/* Expanded Options (show when focused or has content) */}
            {(isFocused || content) && (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                {/* Tags Input */}
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-honey-500" />
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    className="flex-1 bg-transparent text-sm text-ink-300 placeholder:text-ink-500 focus:outline-none"
                  />
                </div>

                {/* Category & Visibility */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category (optional)"
                    className="flex-1 bg-transparent text-sm text-ink-300 placeholder:text-ink-500 focus:outline-none"
                  />

                  <select
                    value={visibility.toString()}
                    onChange={(e) => setVisibility(parseInt(e.target.value) as PostVisibility)}
                    className="w-[140px] bg-ink-900/50 border border-ink-700 text-ink-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-honey-500/50"
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
              <div className="text-xs text-ink-500">
                {content.length}/5000
              </div>

              <Button
                type="submit"
                disabled={!content.trim() || isCreating}
                className={cn(
                  'bg-honey-500 hover:bg-honey-400 text-ink-950 font-medium',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-all duration-300'
                )}
              >
                {isCreating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-ink-950/30 border-t-ink-950 rounded-full animate-spin" />
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

      {/* Subtle glow effect on focus */}
      {isFocused && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-honey-500/10 via-transparent to-honey-500/5" />
        </div>
      )}
    </form>
  );
};

export default CreatePost;