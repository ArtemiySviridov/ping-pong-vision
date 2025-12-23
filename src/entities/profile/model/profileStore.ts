import type {
  ProfileChangePassword,
  ProfileFormFields,
  ProfilePersonalInfo,
  ProfileStats,
} from '@/entities/profile/api/types.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { profileApi } from '@/entities/profile/api/profileApi.ts';
import type { ProfileMatch } from '@/entities/match/api/types.ts';
import { mapProfile } from '@/entities/profile/model/personalDataMapper.ts';
import { mapProfileMatchesList } from '@/entities/profile/model/profileMatchesMapper.ts';
import type { Pagination } from '@/shared/api/types.ts';

export interface ProfileState {
  personalInfo: ProfilePersonalInfo | null;
  profileStats: ProfileStats | null;
  profileMatches: ProfileMatch[] | null;

  profileMatchesPagination: Pagination;

  isLoading: boolean;
  error: string | null;

  fetchPersonalInfo: () => Promise<void>;
  fetchProfileStats: () => Promise<void>;
  fetchProfileMatches: (page: number, limit: number) => Promise<void>;

  updatePersonalInfo: (data: ProfileFormFields) => Promise<boolean>;
  updatePassword: (data: ProfileChangePassword) => Promise<boolean>;

  uploadAvatar: (file: File) => Promise<boolean>;
  deleteAvatar: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>()(
  devtools((set, get) => ({
    personalInfo: null,
    profileStats: null,
    profileMatches: null,

    profileMatchesPagination: {
      total: 0,
      offset: 0,
      limit: 10,
    },

    isLoading: false,
    error: null,

    fetchPersonalInfo: async () => {
      set({ isLoading: true, error: null });
      try {
        const result = await profileApi.getPersonalInfo();
        set({
          personalInfo: mapProfile(result.data),
          isLoading: false,
        });
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при загрузке персональной информации',
          isLoading: false,
        });
      }
    },

    fetchProfileStats: async () => {
      set({ isLoading: true, error: null });
      try {
        const result = await profileApi.getProfileStats();
        set({ profileStats: result.data, isLoading: false });
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при загрузке статистики профиля',
          isLoading: false,
        });
      }
    },

    fetchProfileMatches: async (page = 1, limit = 10) => {
      const offset = (page - 1) * limit;
      set({ isLoading: true, error: null });
      try {
        const result = await profileApi.getProfileMatches(offset, limit);
        set({
          profileMatches: mapProfileMatchesList(result.data.items),
          profileMatchesPagination: {
            total: result.data.total,
            offset: result.data.offset,
            limit: result.data.limit,
          },
          isLoading: false,
        });
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при загрузке матчей профиля',
          isLoading: false,
        });
      }
    },

    updatePersonalInfo: async (data: ProfileFormFields) => {
      set({ isLoading: true, error: null });

      try {
        await profileApi.updatePersonalInfo(data);
        await get().fetchPersonalInfo();

        return true;
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при обновлении информации',
          isLoading: false,
        });
      }
    },

    updatePassword: async (data: ProfileChangePassword) => {
      set({ isLoading: true, error: null });
      try {
        await profileApi.updatePassword(data);
        set({ isLoading: false, error: null });
        return true;
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при обновлении пароля',
          isLoading: false,
        });
      }
    },

    uploadAvatar: async (file: File) => {
      set({ isLoading: true, error: null });

      try {
        const formData = new FormData();
        formData.append('file', file);

        await profileApi.uploadAvatar(formData);

        await get().fetchPersonalInfo();

        set({ isLoading: false, error: null });

        return true;
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при загрузке аватара',
          isLoading: false,
        });
        return false;
      }
    },

    deleteAvatar: async () => {
      set({ isLoading: true, error: null });
      try {
        await profileApi.deleteAvatar();
        await get().fetchPersonalInfo();
        set({ isLoading: false, error: null });
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при удалении аватара',
          isLoading: false,
        });
      }
    },
  })),
);
