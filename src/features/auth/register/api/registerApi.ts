import { $api } from '@/shared/api/axios/api.ts';

export const registerApi = (data: {
  login: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
}) => {
  return $api.post('/auth/register', data);
};
