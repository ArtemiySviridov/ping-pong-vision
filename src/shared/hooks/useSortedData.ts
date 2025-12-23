// // shared/lib/hooks/useSortedData.ts
// import { useMemo } from 'react';
// import type { Column } from '@/shared/types/tables/column.ts';
//
// export const useSortedData = <T>(
//   data: T[],
//   columns: Column<T>[],
//   sortColumn: keyof T | null,
//   sortDirection: 'asc' | 'desc' | null,
// ) => {
//   return useMemo(() => {
//     if (!sortColumn || !sortDirection) return data;
//
//     const column = columns.find((c) => c.key === sortColumn);
//     const sorter = column?.sortFunction;
//
//     return [...data].sort((a, b) => {
//       const aVal = a[sortColumn];
//       const bVal = b[sortColumn];
//
//       if (sorter) return sorter(a, b) * (sortDirection === 'asc' ? 1 : -1);
//
//       if (aVal == null) return sortDirection === 'asc' ? -1 : 1;
//       if (bVal == null) return sortDirection === 'asc' ? 1 : -1;
//
//       if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
//       if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }, [data, columns, sortColumn, sortDirection]);
// };
