import { $api } from '@/shared/api/axios/api.ts';
import type { PaginatedResponse } from '@/shared/api/types.ts';
import type { IPlayer } from '@/entities/player/api/types.ts';

export const playerApi = {
  getPlayers: (offset: number, limit: number) => {
    return $api.get<PaginatedResponse<IPlayer>>('/users', {
      params: { offset, limit },
    });
  },

  getPlayerById: (playerId: number) => {
    return $api.get(`/users/${playerId}`);
  },

  updatePlayerRole: (playerId: number, role: string) => {
    return $api.patch(`/users/${playerId}/role`, { code: role });
  },

  blockPlayer: (playerId: number) => {
    return $api.patch(`/users/${playerId}/block`);
  },

  unblockPlayer: (playerId: number) => {
    return $api.patch(`/users/${playerId}/unblock`);
  },
};
