import { $api } from '@/shared/api/axios/api.ts';

export const getColumns = (endpoint: string) => {
  return $api.get(`schemas/${endpoint}`);
};
