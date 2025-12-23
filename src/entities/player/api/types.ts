import type { Avatar } from '@/shared/types/tables/column.ts';
import type { ProfileStats } from '@/entities/profile/api/types.ts';

export interface IPlayer {
  id: number;
  player: {
    id: number;
    fullName: string;
    avatar: Avatar;
  };
  gamesCount: number;
  winsCount: number;
  role?: IPlayerRole;
  status?: IPlayerStatus;
}

export interface IPlayerRole {
  id: string;
  name: string;
}

export interface IPlayerStatus {
  id: string;
  name: string;
}

export interface IPendingUser {
  id: number;
  fullName: string;
  avatar: Avatar;
}

export interface IPlayerProfile {
  id: number;
  fullName: string;
  role: string;
  avatar: Avatar;
  stats: ProfileStats;
}
