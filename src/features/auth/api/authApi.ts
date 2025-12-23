import { $api } from '@/shared/api/axios/api.ts';

export const authApi = {
  checkAuth: () => {
    return $api.get('/auth/check-auth');
  },

  logout: () => {
    return $api.get('/auth/logout');
  },
};
