import type { Avatar } from '@/shared/types/tables/column.ts';

export interface MatchPlayer {
  id: number;
  fullName: string;
  avatar: Avatar;
}

export interface Match {
  id: number;
  date: string;
  player1: MatchPlayer;
  player2: MatchPlayer;
  score: string;
  winner: MatchPlayer;
  type: string;
}

export interface MatchById {
  type: string;
  datetime: string;
  durationInMinutes: number;
  player1: Player;
  player2: Player;
}

export interface Player {
  id: number;
  fullName: string;
  avatar: Avatar;
  isWinner: boolean;
  score: number;
  sets: number[];
}

export interface ProfileMatch {
  id: number;
  date: string;
  opponent: MatchPlayer;
  score: string;
  winner: MatchPlayer;
  type: string;
}
