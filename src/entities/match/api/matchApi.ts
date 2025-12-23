import { $api } from '@/shared/api/axios/api.ts';
import type { PaginatedResponse } from '@/shared/api/types.ts';
import type { Match } from '@/entities/match/api/types.ts';

export const matchApi = {
  getMatches: (offset: number, limit: number) => {
    return $api.get<PaginatedResponse<Match>>('/matches', {
      params: { offset, limit },
    });
  },

  getMatchById: (matchId: number) => {
    return $api.get(`/matches/${matchId}`);
  },
};
