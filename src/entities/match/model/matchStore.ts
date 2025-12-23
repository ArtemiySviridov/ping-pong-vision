import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { matchApi } from '@/entities/match/api/matchApi.ts';
import type { MatchById } from '@/entities/match/api/types.ts';
import { mapMatch } from '@/entities/match/model/matchMapper.ts';

interface MatchState {
  match: MatchById | null;
  isLoading: boolean;
  error: string | null;

  fetchMatchById: (id: number) => Promise<void>;
}

export const useMatchStore = create<MatchState>()(
  devtools((set) => ({
    match: null,
    isLoading: false,
    error: null,

    fetchMatchById: async (id: number) => {
      set({ isLoading: true, error: null });

      try {
        const result = await matchApi.getMatchById(id);
        set({ match: mapMatch(result.data), isLoading: false });
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при загрузке матча',
          isLoading: false,
        });
      }
    },
  })),
);
