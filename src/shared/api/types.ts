export interface PaginatedResponse<T> {
  total: number;
  offset: number;
  limit: number;
  items: T[];
}

export interface Pagination {
  total: number;
  offset: number;
  limit: number;
}
