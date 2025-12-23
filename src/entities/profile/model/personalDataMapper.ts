import type { ProfilePersonalInfo } from '@/entities/profile/api/types';

const BASE_URL = 'https://ppv-backend.wonderrfau1t.site';

export const mapProfile = (
  data: ProfilePersonalInfo,
): {
  firstName: string;
  lastName: string;
  role: string;
  middleName: string;
  id: number;
  avatar: { path: string | null; alter: string };
  login: string;
} => {
  if (!data.avatar) {
    return { ...data };
  }

  return {
    ...data,
    avatar: {
      path: data.avatar.path ? `${BASE_URL}${data.avatar.path}` : null,
      alter: data.avatar.alter || '',
    },
  };
};
