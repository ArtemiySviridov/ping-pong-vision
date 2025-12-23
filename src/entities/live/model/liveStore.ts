import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { liveApi } from '@/entities/live/api/liveApi.ts';

interface LiveStats {
  player1: {
    id: 0;
    fullName: string;
    avatar: {
      path: string;
      alter: string;
    };
  };
  player2: {
    id: 0;
    fullName: string;
    avatar: {
      path: string;
      alter: string;
    };
  };
  score: string;
  set: {
    label: string;
    score: string;
  };
}

interface LiveState {
  isLive: boolean;
  liveLink: string;
  liveStats: LiveStats | null;

  isLoading: boolean;
  error: string | null;

  fetchLiveStatus: () => void;
  createSession: (playerId: number, bestOf: number) => Promise<void>;
  fetchLiveStats: () => void;
}

export const useLiveStore = create<LiveState>()(
  devtools((set) => ({
    isLive: false,
    liveLink: '',
    liveStats: null,

    isLoading: false,
    error: null,

    fetchLiveStatus: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await liveApi.getLive();
        set({
          isLive: response.data.isLive,
          liveLink: response.data.webRTCUrl,
          isLoading: false,
        });
      } catch (error: any) {
        set({
          error: error.message || 'Failed to fetch live status',
        });
      }
    },

    createSession: async (playerId: number, bestOf: number) => {
      set({ isLoading: true, error: null });
      try {
        const response = await liveApi.createSession(playerId, bestOf);
        if (response.status === 204) {
          const startResponse = await liveApi.startSession();
          if (startResponse.status === 204) {
            await liveApi.getLive();
            set({
              isLive: startResponse.data.isLive,
              liveLink: startResponse.data.webRTCUrl,
              isLoading: false,
            });
          }
        }
      } catch (error: any) {
        set({
          error: error.message || 'Failed to create session',
        });
      }
    },

    fetchLiveStats: async () => {
      set({ isLoading: true, error: null });

      try {
        const response = await liveApi.getLiveStats();
        set({
          liveStats: response.data,
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        if (error?.response?.status === 500) {
          try {
            const liveResponse = await liveApi.getLive();
            set({
              isLive: liveResponse.data.isLive,
              liveLink: liveResponse.data.webRTCUrl ?? '',
              isLoading: false,
            });
          } catch {
            set({
              isLive: false,
              liveLink: '',
              liveStats: null,
              isLoading: false,
            });
          }

          return;
        }

        set({
          error: error.message || 'Failed to fetch live stats',
          isLoading: false,
        });
      }
    },
  })),
);
