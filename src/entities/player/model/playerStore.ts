import type {
  IPendingUser,
  IPlayer,
  IPlayerProfile,
  IPlayerRole,
} from '@/entities/player/api/types.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { playerApi } from '@/entities/player/api/playerApi.ts';
import { mapPlayersList } from '@/entities/player/model/playersListMapper.ts';
import { profileApi } from '@/entities/profile/api/profileApi.ts';
import { mapProfileMatchesList } from '@/entities/profile/model/profileMatchesMapper.ts';
import type { ProfileMatch } from '@/entities/match/api/types.ts';
import type { Pagination } from '@/shared/api/types.ts';

interface PlayerState {
  players: IPlayer[];
  pendingUsers: IPendingUser[];
  player: IPlayerProfile;
  playerMatches: ProfileMatch[];

  playersPagination: Pagination;
  playerMatchesPagination: Pagination;

  isLoading: boolean;
  error: string | null;

  fetchPlayers: (page: number, limit: number) => Promise<void>;
  fetchPlayerById: (id: number) => Promise<void>;
  fetchPlayerProfileMatches: (page: number, limit: number) => Promise<void>;

  updatePlayerRole: (id: number, role: IPlayerRole) => void;

  blockPlayer: (id: number) => void;
  unblockPlayer: (id: number) => void;

  isPlayersLoading: boolean; // для таблицы
  isPendingUsersLoading: boolean;

  fetchPendingUsers: () => Promise<void>;

  approvePendingUser: (id: number) => Promise<void>;
  rejectPendingUser: (id: number) => Promise<void>;
}

export const usePlayerStore = create<PlayerState>()(
  devtools((set) => ({
    players: [],
    pendingUsers: [],
    player: {},
    playerMatches: [],

    playersPagination: { total: 0, offset: 0, limit: 0 },
    playerMatchesPagination: { total: 0, offset: 0, limit: 0 },
    isPlayersLoading: false, // для таблицы
    isPendingUsersLoading: false,
    isLoading: false,
    error: null,

    fetchPlayers: async (page: number, limit: number) => {
      const offset = (page - 1) * limit;
      set({ isPlayersLoading: true, error: null });
      try {
        const response = await playerApi.getPlayers(offset, limit);
        set({
          players: mapPlayersList(response.data.items),
          playersPagination: {
            total: response.data.total,
            offset: response.data.offset,
            limit: response.data.limit,
          },
          isPlayersLoading: false,
        });
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при загрузке игроков',
          isPlayersLoading: false,
        });
      }
    },

    fetchPlayerById: async (id: number) => {
      set({ isLoading: true, error: null });
      try {
        const result = await playerApi.getPlayerById(id);
        set({ player: result.data, isLoading: false });
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при загрузке профиля игрока',
          isLoading: false,
        });
      }
    },

    fetchPlayerProfileMatches: async (page: number, limit: number) => {
      const offset = (page - 1) * limit;
      set({ isLoading: true, error: null });
      try {
        const response = await profileApi.getProfileMatches(offset, limit);
        set({
          playerMatches: mapProfileMatchesList(response.data.items),
          playerMatchesPagination: {
            total: response.data.total,
            offset: response.data.offset,
            limit: response.data.limit,
          },
          isLoading: false,
        });
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при загрузке матчей профиля',
          isLoading: false,
        });
      }
    },

    updatePlayerRole: async (playerId: number, role: IPlayerRole) => {
      set({ isLoading: true, error: null });
      try {
        await playerApi.updatePlayerRole(playerId, role.id);
        set((state) => ({
          players: state.players.map((player) =>
            player.id === playerId ? { ...player, role } : player,
          ),
          isLoading: false,
        }));
        return true;
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при обновлении роли игрока',
          isLoading: false,
        });
      }
    },

    blockPlayer: async (playerId: number) => {
      set({ isLoading: true, error: null });
      try {
        await playerApi.blockPlayer(playerId);
        set((state) => ({
          players: state.players.map((player) =>
            player.id === playerId
              ? { ...player, status: { id: 'blocked', name: 'Заблокирован' } }
              : player,
          ),
          isLoading: false,
        }));
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при блокировании игрока',
          isLoading: false,
        });
      }
    },

    unblockPlayer: async (playerId: number) => {
      set({ isLoading: true, error: null });
      try {
        await playerApi.unblockPlayer(playerId);
        set((state) => ({
          players: state.players.map((player) =>
            player.id === playerId
              ? { ...player, status: { id: 'active', name: 'Активный' } }
              : player,
          ),
          isLoading: false,
        }));
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при блокировании игрока',
          isLoading: false,
        });
      }
    },

    fetchPendingUsers: async () => {
      set({ isPendingUsersLoading: true, error: null });
      try {
        const response = await profileApi.getPendingUsers();
        set({
          pendingUsers: response.data.players,
          isPendingUsersLoading: false,
        });
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при загрузке ожидающих пользователей',
          isPendingUsersLoading: false,
        });
      }
    },

    approvePendingUser: async (playerId: number) => {
      set({ isPendingUsersLoading: true, error: null });
      try {
        await playerApi.blockPlayer(playerId);
        set((state) => ({
          pendingUsers: state.pendingUsers.filter(
            (user) => user.id !== playerId,
          ),
          isPendingUsersLoading: false,
        }));
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при блокировании игрока',
          isPendingUsersLoading: false,
        });
      }
    },

    rejectPendingUser: async (playerId: number) => {
      set({ isPendingUsersLoading: true, error: null });
      try {
        await playerApi.unblockPlayer(playerId);
        set((state) => ({
          pendingUsers: state.pendingUsers.filter(
            (user) => user.id !== playerId,
          ),
          isPendingUsersLoading: false,
        }));
      } catch (error: any) {
        set({
          error: error.message || 'Ошибка при блокировании игрока',
          isPendingUsersLoading: false,
        });
      }
    },
  })),
);
