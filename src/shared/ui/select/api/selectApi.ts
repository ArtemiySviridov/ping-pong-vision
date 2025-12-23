import { $api } from '@/shared/api/axios/api.ts';

export const selectApi = {
  getRoleSelectOptions: () => {
    return $api.get('/resources/role-select');
  },
};
