import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { tableAvailabilityApi } from '@/entities/match/api/tableAvailabilityApi.ts';
import { mapTopPlayers } from '@/entities/match/model/topPlayersMapper.ts';

interface MatchesInPeriod {
  labels: string[];
  data: number[];
}

interface ExtraStats {
  topDays: string[];
  topPeriod: string;
}

export interface TopPlayer {
  place: number;
  player: {
    id: number;
    fullName: string;
    avatar: {
      path: string | null;
      alter: string;
    };
  };
  totalMatchesDuration: number;
  totalGamesCount: number;
}

interface TableAvailabilityState {
  matchesInPeriod: MatchesInPeriod;
  extraStats: ExtraStats | null;
  topPlayers: TopPlayer[] | null;

  isLoading: boolean;
  isMatchesInPeriodLoading: boolean;
  error: string | null;

  fetchMatchesInPeriod: (period: string) => void;
  fetchExtraStats: () => Promise<void>;
  fetchTopPlayers: () => void;
}

export const useTableAvailabilityStore = create<TableAvailabilityState>()(
  devtools((set) => ({
    matchesInPeriod: null,
    topPlayers: null,

    isMatchesInPeriodLoading: false,
    isLoading: false,
    error: null,

    fetchMatchesInPeriod: async (period: string) => {
      set({ isMatchesInPeriodLoading: true, error: null });
      try {
        const response = await tableAvailabilityApi.getMatchesInPeriod(period);
        set({
          matchesInPeriod: {
            labels: [...response.data.labels],
            data: [...response.data.data],
          },
          isMatchesInPeriodLoading: false,
        });
        console.log(response.data);
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при загрузке загруженности стола',
          isMatchesInPeriodLoading: false,
        });
      }
    },

    fetchExtraStats: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await tableAvailabilityApi.getExtraStats();
        set({ extraStats: response.data, isLoading: false });
      } catch (error: any) {
        set({
          error:
            error.message || 'Ошибка при загрузке дополнительных статистик',
          isLoading: false,
        });
      }
    },

    fetchTopPlayers: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await tableAvailabilityApi.getTopPlayers();
        set({
          topPlayers: mapTopPlayers(response.data.items),
          isLoading: false,
        });
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при загрузке топа игроков',
          isLoading: false,
        });
      }
    },
  })),
);
