import type { Column } from '@/shared/types/tables/column.ts';

export interface PaginatedTableProps<T> {
  data: T[] | [];
  columns: Column<T>[];
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
}
