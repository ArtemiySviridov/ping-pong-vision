import { createTableStore } from '@/shared/lib/createTableStore';
import type { IPlayer } from '@/entities/player/api/types.ts';

export const usePlayersColumns = createTableStore<IPlayer>();
