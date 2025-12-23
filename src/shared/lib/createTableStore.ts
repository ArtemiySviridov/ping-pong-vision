import type { Column, ServerColumn } from '@/shared/types/tables/column.ts';
import { create } from 'zustand';
import { getColumns } from '@/shared/api/endpoints/column.ts';
import { createTableColumns } from '@/shared/utils/tableColumnFactory.tsx';

interface TableStoreState<T> {
  columns: Column<T>[];
  isLoading: boolean;
  error: string | null;

  fetchColumns: (endpoint: string) => Promise<void>;
}

export const createTableStore = <T>() =>
  create<TableStoreState<T>>((set) => ({
    columns: [],
    isLoading: false,
    error: null,

    fetchColumns: async (endpoint: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await getColumns(endpoint);
        const schema: ServerColumn[] = response.data.columns;

        const columns = createTableColumns<T>(schema);
        set({
          columns,
          isLoading: false,
        });
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при загрузке данных',
          isLoading: false,
        });
      }
    },
  }));
