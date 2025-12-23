import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { selectApi } from '@/shared/ui/select/api/selectApi.ts';

interface SelectOption {
  id: string;
  name: string;
}

interface SelectState {
  options: SelectOption[];

  isLoading: boolean;
  error: string | null;

  fetchRoleSelectOptions: () => Promise<void>;
}

export const useSelectStore = create<SelectState>()(
  devtools((set) => ({
    options: [],
    isLoading: false,
    error: null,

    fetchRoleSelectOptions: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await selectApi.getRoleSelectOptions();
        set({ options: response.data, isLoading: false });
      } catch (error: any) {
        set({
          isLoading: false,
          error:
            error.response?.data?.message ||
            error.message ||
            'Ошибка при загрузке данных',
        });
      }
    },
  })),
);
