import { $api } from '@/shared/api/axios/api';

export const loginApi = (data: { login: string; password: string }) => {
  return $api.post('/auth/login', data);
};
