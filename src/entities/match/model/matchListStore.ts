import type { Match } from '@/entities/match/api/types.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { matchApi } from '@/entities/match/api/matchApi.ts';
import { mapMatchesList } from '@/entities/match/model/matchListMapper.ts';
import type { Pagination } from '@/shared/api/types.ts';

interface MatchListState {
  matches: Match[] | null;
  matchesPagination: Pagination;

  isLoading: boolean;
  error: string | null;

  fetchMatches: (page: number, limit: number) => Promise<void>;
}

export const useMatchListStore = create<MatchListState>()(
  devtools((set) => ({
    matches: [],
    matchesPagination: { total: 0, offset: 0, limit: 0 },
    isLoading: false,
    error: null,

    fetchMatches: async (page = 1, limit = 10) => {
      const offset = (page - 1) * limit;
      set({ isLoading: true, error: null });
      try {
        const response = await matchApi.getMatches(offset, limit);
        set({
          matches: mapMatchesList(response.data.items),
          matchesPagination: {
            total: response.data.total,
            offset: response.data.offset,
            limit: response.data.limit,
          },
          isLoading: false,
        });
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при загрузке матчей',
          isLoading: false,
        });
      }
    },
  })),
);
