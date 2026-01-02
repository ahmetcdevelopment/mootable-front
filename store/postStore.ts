import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { postService } from '@/features/wonderland/services/postService';
import {
  Post,
  PostDetail,
  CreatePostDto,
  UpdatePostDto,
  GetPostsQuery,
  PostSortBy
} from '@/types/post.types';
// Toast notifications removed for simplicity

interface PostState {
  // State
  posts: Post[];
  currentPost: PostDetail | null;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  isLiking: boolean;
  error: string | null;

  // Current query/filters
  currentQuery: GetPostsQuery;

  // Actions
  fetchPosts: (query?: GetPostsQuery) => Promise<void>;
  fetchPostById: (id: string, includeReplies?: boolean) => Promise<void>;
  createPost: (dto: CreatePostDto) => Promise<boolean>;
  updatePost: (id: string, dto: UpdatePostDto) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  likePost: (id: string, likeType?: string) => Promise<void>;
  replyToPost: (parentPostId: string, dto: CreatePostDto) => Promise<boolean>;

  // Feed actions
  loadMorePosts: () => Promise<void>;
  refreshFeed: () => Promise<void>;
  searchPosts: (searchTerm: string) => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  sortPosts: (sortBy: PostSortBy) => Promise<void>;

  // UI actions
  clearError: () => void;
  resetState: () => void;
}

const initialState = {
  posts: [],
  currentPost: null,
  totalCount: 0,
  pageNumber: 1,
  pageSize: 20,
  hasNextPage: false,
  hasPreviousPage: false,
  isLoading: false,
  isCreating: false,
  isDeleting: false,
  isLiking: false,
  error: null,
  currentQuery: {
    pageNumber: 1,
    pageSize: 20,
    sortBy: PostSortBy.Latest
  }
};

export const usePostStore = create<PostState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchPosts: async (query?: GetPostsQuery) => {
        set({ isLoading: true, error: null });
        try {
          const mergedQuery = { ...get().currentQuery, ...query };
          const response = await postService.getPosts(mergedQuery);

          if (response.succeeded && response.data) {
            set({
              posts: response.data.posts,
              totalCount: response.data.totalCount,
              pageNumber: response.data.pageNumber,
              pageSize: response.data.pageSize,
              hasNextPage: response.data.hasNextPage,
              hasPreviousPage: response.data.hasPreviousPage,
              currentQuery: mergedQuery
            });
          } else {
            throw new Error(response.errors?.[0] || 'Failed to fetch posts');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch posts';
          set({ error: errorMessage });
          console.error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchPostById: async (id: string, includeReplies = true) => {
        set({ isLoading: true, error: null });
        try {
          const response = await postService.getPostById(id, includeReplies);

          if (response.succeeded && response.data) {
            set({ currentPost: response.data });
          } else {
            throw new Error(response.errors?.[0] || 'Failed to fetch post');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch post';
          set({ error: errorMessage });
          console.error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      createPost: async (dto: CreatePostDto) => {
        set({ isCreating: true, error: null });
        try {
          const response = await postService.createPost(dto);

          if (response.succeeded && response.data) {
            // Add new post to the beginning of the list
            set(state => ({
              posts: [response.data!, ...state.posts],
              totalCount: state.totalCount + 1
            }));

            console.log(response.message || 'Welcome to the real world.');
            return true;
          } else {
            throw new Error(response.errors?.[0] || 'Failed to create post');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to create post';
          set({ error: errorMessage });
          console.error(errorMessage);
          return false;
        } finally {
          set({ isCreating: false });
        }
      },

      updatePost: async (id: string, dto: UpdatePostDto) => {
        set({ isLoading: true, error: null });
        try {
          const response = await postService.updatePost(id, dto);

          if (response.succeeded && response.data) {
            // Update post in the list
            set(state => ({
              posts: state.posts.map(post =>
                post.id === id ? response.data! : post
              ),
              currentPost: state.currentPost?.id === id
                ? { ...state.currentPost, ...response.data }
                : state.currentPost
            }));

            console.log(response.message || 'Reality has been reshaped.');
            return true;
          } else {
            throw new Error(response.errors?.[0] || 'Failed to update post');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to update post';
          set({ error: errorMessage });
          console.error(errorMessage);
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      deletePost: async (id: string) => {
        set({ isDeleting: true, error: null });
        try {
          const response = await postService.deletePost(id);

          if (response.succeeded) {
            // Remove post from the list
            set(state => ({
              posts: state.posts.filter(post => post.id !== id),
              totalCount: Math.max(0, state.totalCount - 1),
              currentPost: state.currentPost?.id === id ? null : state.currentPost
            }));

            console.log(response.message || 'Some truths are better forgotten.');
            return true;
          } else {
            throw new Error(response.errors?.[0] || 'Failed to delete post');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to delete post';
          set({ error: errorMessage });
          console.error(errorMessage);
          return false;
        } finally {
          set({ isDeleting: false });
        }
      },

      likePost: async (id: string, likeType = 'RedPill') => {
        set({ isLiking: true, error: null });
        try {
          const response = await postService.likePost(id, likeType);

          if (response.succeeded && response.data) {
            // Update like status in the list
            set(state => ({
              posts: state.posts.map(post =>
                post.id === id
                  ? {
                      ...post,
                      isLikedByCurrentUser: response.data!.isLiked,
                      likeCount: response.data!.likeCount
                    }
                  : post
              ),
              currentPost: state.currentPost?.id === id
                ? {
                    ...state.currentPost,
                    isLikedByCurrentUser: response.data!.isLiked,
                    likeCount: response.data!.likeCount
                  }
                : state.currentPost
            }));

            console.log(response.data.message);
          } else {
            throw new Error(response.errors?.[0] || 'Failed to like post');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to like post';
          set({ error: errorMessage });
          console.error(errorMessage);
        } finally {
          set({ isLiking: false });
        }
      },

      replyToPost: async (parentPostId: string, dto: CreatePostDto) => {
        const replyDto = { ...dto, parentPostId };
        const success = await get().createPost(replyDto);

        if (success) {
          // Refresh the parent post to update reply count
          await get().fetchPostById(parentPostId);
        }

        return success;
      },

      loadMorePosts: async () => {
        const { hasNextPage, pageNumber, currentQuery } = get();

        if (!hasNextPage) return;

        const nextQuery = {
          ...currentQuery,
          pageNumber: pageNumber + 1
        };

        set({ isLoading: true, error: null });
        try {
          const response = await postService.getPosts(nextQuery);

          if (response.succeeded && response.data) {
            set(state => ({
              posts: [...state.posts, ...response.data!.posts],
              pageNumber: response.data!.pageNumber,
              hasNextPage: response.data!.hasNextPage,
              currentQuery: nextQuery
            }));
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to load more posts';
          set({ error: errorMessage });
          console.error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      refreshFeed: async () => {
        const { currentQuery } = get();
        await get().fetchPosts({ ...currentQuery, pageNumber: 1 });
      },

      searchPosts: async (searchTerm: string) => {
        await get().fetchPosts({ searchTerm, pageNumber: 1 });
      },

      filterByCategory: async (category: string) => {
        await get().fetchPosts({ category, pageNumber: 1 });
      },

      sortPosts: async (sortBy: PostSortBy) => {
        await get().fetchPosts({ sortBy, pageNumber: 1 });
      },

      clearError: () => set({ error: null }),

      resetState: () => set(initialState)
    }),
    {
      name: 'post-store'
    }
  )
);