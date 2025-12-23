import { $api } from '@/shared/api/axios/api.ts';

export const liveApi = {
  getLive: () => {
    return $api.get('session/live');
  },

  createSession: (playerId: number, bestOf: number) => {
    return $api.post('session/create', { playerId, bestOf });
  },

  startSession: () => {
    return $api.post('session/start');
  },

  getLiveStats: () => {
    return $api.get('session/stats');
  },
};
