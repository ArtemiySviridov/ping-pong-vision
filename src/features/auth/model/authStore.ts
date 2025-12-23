// features/auth/model/authStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authApi } from '@/features/auth/api/authApi.ts'; // твой API

interface AuthState {
  role: string | null;
  isLoading: boolean; // важно для ProtectedRoute
  isAuthenticated: boolean; // явный флаг

  setRole: (role: string | null) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        role: null,
        isLoading: true,
        isAuthenticated: false,

        setRole: (role) =>
          set(
            {
              role,
              isAuthenticated: !!role,
              isLoading: false,
            },
            false,
            'auth/setRole',
          ),

        checkAuth: async () => {
          set({ isLoading: true });
          try {
            await authApi.checkAuth();
            set({
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            set({
              isAuthenticated: false,
              isLoading: false,
            });
          }
        },

        logout: async () => {
          try {
            await authApi.logout();
          } catch (error) {
            console.error('Ошибка при выходе:', error);
          }
        },
      }),
      {
        name: 'auth-storage', // сохраняем в localStorage (опционально)
        partialize: (state) => ({ role: state.role }), // только роль храним
      },
    ),
  ),
);
