import { $api } from '@/shared/api/axios/api.ts';

export const tableAvailabilityApi = {
  getMatchesInPeriod: (period: string) => {
    return $api.get(`/matches/load/${period}`);
  },

  getExtraStats: () => {
    return $api.get('/matches/load/extra-stats');
  },

  getTopPlayers: () => {
    return $api.get('/matches/top-players');
  },
};
