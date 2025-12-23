import type { Avatar } from '@/shared/types/tables/column.ts';

export interface ProfilePersonalInfo {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
  login: string;
  avatar: Avatar;
}

export interface ProfileStats {
  amateurGamesCount: number;
  tournamentGamesCount: number;
  winsCount: number;
  lossesCount: number;
  averageMatchDuration: number;
  averageTimeToPoint: number;
  totalMatchesDuration: number;
}

export interface ProfileFormFields {
  lastName: string;
  firstName: string;
  middleName?: string;
  login: string;
}

export interface ProfileChangePassword {
  currentPassword: string;
  newPassword: string;
}
