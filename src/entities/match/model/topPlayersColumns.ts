import { createTableStore } from '@/shared/lib/createTableStore';

interface TopPlayers {}

export const useTopPlayersColumns = createTableStore<TopPlayers>();
