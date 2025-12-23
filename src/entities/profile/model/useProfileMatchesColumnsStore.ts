import { createTableStore } from '@/shared/lib/createTableStore';
import type { ProfileMatch } from '@/entities/match/api/types.ts';

export const useProfileMatchesColumnsStore = createTableStore<ProfileMatch>();
