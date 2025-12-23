import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { registerApi } from '@/features/auth/register/api/registerApi.ts';

interface RegisterState {
  isLoading: boolean;
  error: string | null;
  register: (data: {
    login: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
  }) => Promise<void>;
}

export const useRegisterStore = create<RegisterState>()(
  devtools((set) => ({
    isLoading: false,
    error: null,

    register: async (data) => {
      set({ isLoading: true }, undefined, 'register/setLoading');
      set({ error: '' }, undefined, 'register/setError');
      try {
        await registerApi(data);
      } catch (e: any) {
        set(
          {
            error: e.message,
          },
          undefined,
          'register/setError',
        );
        throw e;
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);
