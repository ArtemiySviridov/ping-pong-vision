import { useState, useMemo } from 'react';

export function usePagination<T>(data: T[], pageSize: number) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [page, pageSize, data]);

  return {
    page,
    totalPages,
    paginated,
    next: () => setPage((p) => Math.min(p + 1, totalPages)),
    prev: () => setPage((p) => Math.max(p - 1, 1)),
    setPage,
  };
}
