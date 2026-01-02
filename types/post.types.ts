// Post related types for Wonderland feature

export enum PostVisibility {
  Public = 0,
  FollowersOnly = 1,
  FriendsOnly = 2,
  Private = 3,
  ServerOnly = 4
}

export enum PostSortBy {
  Latest = 'Latest',
  Popular = 'Popular',
  MostLiked = 'MostLiked',
  MostReplied = 'MostReplied',
  Enlightened = 'Enlightened'
}

export interface Post {
  id: string;
  content: string;
  htmlContent?: string;
  category?: string;
  tags: string[];
  mediaUrls: string[];
  visibility: PostVisibility;
  parentPostId?: string;
  parentPost?: Post;

  // User info
  userId: string;
  userName: string;
  userDisplayName: string;
  userAvatarUrl?: string;

  // Statistics
  likeCount: number;
  replyCount: number;
  viewCount: number;
  shareCount: number;
  enlightenmentScore: number;

  // Interaction states
  isLikedByCurrentUser: boolean;
  isOwnPost: boolean;
  isPinned: boolean;

  // Timestamps
  createdAt: string;
  updatedAt?: string;
}

export interface PostDetail extends Post {
  replies: Post[];
  parentPostDetails?: Post;
}

export interface CreatePostDto {
  content: string;
  htmlContent?: string;
  category?: string;
  tags: string[];
  mediaUrls: string[];
  visibility: PostVisibility;
  parentPostId?: string;
}

export interface UpdatePostDto {
  content: string;
  htmlContent?: string;
  category?: string;
  tags: string[];
  mediaUrls: string[];
}

export interface LikePostDto {
  likeType?: string; // RedPill, BluePill, Awakened, Enlightened
}

export interface LikePostResponse {
  isLiked: boolean;
  likeCount: number;
  message: string;
}

export interface GetPostsQuery {
  pageNumber?: number;
  pageSize?: number;
  category?: string;
  searchTerm?: string;
  tags?: string[];
  sortBy?: PostSortBy;
  includeReplies?: boolean;
}

export interface GetPostsResponse {
  posts: Post[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Matrix-themed like types
export const LIKE_TYPES = {
  RED_PILL: 'RedPill',
  BLUE_PILL: 'BluePill',
  AWAKENED: 'Awakened',
  ENLIGHTENED: 'Enlightened'
} as const;

export type LikeType = typeof LIKE_TYPES[keyof typeof LIKE_TYPES];