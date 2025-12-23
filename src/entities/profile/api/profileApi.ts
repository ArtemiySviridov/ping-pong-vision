import { $api, $apiFormData } from '@/shared/api/axios/api.ts';
import type {
  ProfileChangePassword,
  ProfileFormFields,
  ProfilePersonalInfo,
  ProfileStats,
} from '@/entities/profile/api/types.ts';

import type { PaginatedResponse } from '@/shared/api/types.ts';
import type { ProfileMatch } from '@/entities/match/api/types.ts';

export const profileApi = {
  getPersonalInfo: () => {
    return $api.get<ProfilePersonalInfo>('/users/me');
  },

  getProfileStats: () => {
    return $api.get<ProfileStats>('/users/me/stats');
  },

  getProfileMatches: (offset: number, limit: number) => {
    return $api.get<PaginatedResponse<ProfileMatch>>('/users/me/matches', {
      params: { offset, limit },
    });
  },

  updatePersonalInfo: (data: ProfileFormFields) => {
    return $api.put<ProfilePersonalInfo>('/users/me', data);
  },

  updatePassword: (data: ProfileChangePassword) => {
    return $api.patch<ProfileChangePassword>('/users/me/password', data);
  },

  uploadAvatar: (data: FormData) => {
    return $apiFormData.post('/users/me/avatar', data);
  },

  deleteAvatar: () => {
    return $api.delete('/users/me/avatar');
  },

  getPendingUsers: () => {
    return $api.get('/users/pending');
  },
};
