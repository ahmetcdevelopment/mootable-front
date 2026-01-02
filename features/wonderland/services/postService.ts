import { httpClient } from '@/shared/services/http.client';
import {
  Post,
  PostDetail,
  CreatePostDto,
  UpdatePostDto,
  LikePostDto,
  LikePostResponse,
  GetPostsQuery,
  GetPostsResponse,
  PostSortBy
} from '@/types/post.types';
import { ServiceResponse } from '@/types/api.types';

class PostService {
  private readonly baseUrl = '/posts';

  /**
   * Get posts for Wonderland feed
   */
  async getPosts(query?: GetPostsQuery): Promise<ServiceResponse<GetPostsResponse>> {
    const params = new URLSearchParams();

    if (query?.pageNumber) params.append('pageNumber', query.pageNumber.toString());
    if (query?.pageSize) params.append('pageSize', query.pageSize.toString());
    if (query?.category) params.append('category', query.category);
    if (query?.searchTerm) params.append('searchTerm', query.searchTerm);
    if (query?.sortBy) params.append('sortBy', query.sortBy);
    if (query?.includeReplies !== undefined) params.append('includeReplies', query.includeReplies.toString());
    if (query?.tags?.length) {
      query.tags.forEach(tag => params.append('tags', tag));
    }

    const response = await httpClient.get<ServiceResponse<GetPostsResponse>>(
      `${this.baseUrl}?${params.toString()}`
    );
    return response.data;
  }

  /**
   * Get a single post by ID
   */
  async getPostById(id: string, includeReplies = true): Promise<ServiceResponse<PostDetail>> {
    const response = await httpClient.get<ServiceResponse<PostDetail>>(
      `${this.baseUrl}/${id}?includeReplies=${includeReplies}`
    );
    return response.data;
  }

  /**
   * Create a new post in Wonderland
   * Matrix theme: "Take the red pill and share your truth"
   */
  async createPost(dto: CreatePostDto): Promise<ServiceResponse<Post>> {
    const response = await httpClient.post<ServiceResponse<Post>>(this.baseUrl, dto);
    return response.data;
  }

  /**
   * Update an existing post
   */
  async updatePost(id: string, dto: UpdatePostDto): Promise<ServiceResponse<Post>> {
    const response = await httpClient.put<ServiceResponse<Post>>(`${this.baseUrl}/${id}`, dto);
    return response.data;
  }

  /**
   * Delete a post (soft delete)
   */
  async deletePost(id: string): Promise<ServiceResponse<boolean>> {
    const response = await httpClient.delete<ServiceResponse<boolean>>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  /**
   * Like or unlike a post
   * Matrix theme: "Choose your pill"
   */
  async likePost(id: string, likeType = 'RedPill'): Promise<ServiceResponse<LikePostResponse>> {
    const dto: LikePostDto = { likeType };
    const response = await httpClient.post<ServiceResponse<LikePostResponse>>(
      `${this.baseUrl}/${id}/like`,
      dto
    );
    return response.data;
  }

  /**
   * Get posts by category
   */
  async getPostsByCategory(
    category: string,
    pageNumber = 1,
    pageSize = 20
  ): Promise<ServiceResponse<GetPostsResponse>> {
    const response = await httpClient.get<ServiceResponse<GetPostsResponse>>(
      `${this.baseUrl}/category/${category}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  }

  /**
   * Search posts
   */
  async searchPosts(
    searchTerm: string,
    pageNumber = 1,
    pageSize = 20
  ): Promise<ServiceResponse<GetPostsResponse>> {
    const response = await httpClient.get<ServiceResponse<GetPostsResponse>>(
      `${this.baseUrl}/search?searchTerm=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  }

  /**
   * Get trending posts (highest enlightenment score)
   * Matrix theme: "The most enlightened minds"
   */
  async getTrendingPosts(
    pageNumber = 1,
    pageSize = 20
  ): Promise<ServiceResponse<GetPostsResponse>> {
    const response = await httpClient.get<ServiceResponse<GetPostsResponse>>(
      `${this.baseUrl}/trending?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  }

  /**
   * Reply to a post
   */
  async replyToPost(parentPostId: string, dto: CreatePostDto): Promise<ServiceResponse<Post>> {
    const replyDto = { ...dto, parentPostId };
    return this.createPost(replyDto);
  }
}

export const postService = new PostService();