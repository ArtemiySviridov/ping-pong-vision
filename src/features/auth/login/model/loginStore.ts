import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { loginApi } from '@/features/auth/login/api/loginApi.ts';
import { useAuthStore } from '@/features/auth/model/authStore.ts';

interface LoginState {
  isLoading: boolean;
  error: string | null;
  login: (data: { login: string; password: string }) => Promise<void>;
}

export const useLoginStore = create<LoginState>()(
  devtools((set) => ({
    isLoading: false,
    error: null,

    login: async (data) => {
      set({ isLoading: true, error: null });
      try {
        const result = await loginApi(data);
        const role = result?.data?.role;
        useAuthStore.getState().setRole(role);
      } catch (e: any) {
        set({ error: e.message ?? 'Ошибка входа' });
        throw e;
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);
