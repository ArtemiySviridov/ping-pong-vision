import { createTableStore } from '@/shared/lib/createTableStore';

export interface HistoryMatch {
  id: number;
  date: string;
  player1: { id: number; fullName: string };
  player2: { id: number; fullName: string };
  score: string;
  winner: { id: number; fullName: string };
  type: string;
}

export const useMatchHistoryColumnsStore = createTableStore<HistoryMatch>();
