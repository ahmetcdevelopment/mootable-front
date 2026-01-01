export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  errors?: ErrorDetail[];
}

export interface ErrorDetail {
  field: string;
  message: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CursorPaginatedResponse<T> {
  items: T[];
  nextCursor?: string;
  hasMore: boolean;
}
