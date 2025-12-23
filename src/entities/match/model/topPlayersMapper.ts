import type { TopPlayer } from '@/entities/match/model/tableAvailabilityStore.ts';
import type { MatchPlayer } from '@/entities/match/api/types.ts';
import type { Avatar } from '@/shared/types/tables/column.ts';

const BASE_URL = 'https://ppv-backend.wonderrfau1t.site';

const mapAvatarWithName = (data: Avatar): Avatar => {
  return {
    alter: data.alter,
    path: data.path ? `${BASE_URL}${data.path}` : null,
  };
};

const mapPlayer = (player: MatchPlayer): MatchPlayer => {
  return {
    ...player,
    avatar: mapAvatarWithName(player.avatar),
  };
};

const mapTopPlayerItem = (player: TopPlayer): TopPlayer => {
  return {
    ...player,
    player: mapPlayer(player.player),
  };
};

export const mapTopPlayers = (players: TopPlayer[]): TopPlayer[] => {
  if (!players || players.length === 0) {
    return players;
  }

  return players.map(mapTopPlayerItem);
};
