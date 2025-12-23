import type { IPlayer } from '@/entities/player/api/types.ts';
import type { Avatar } from '@/shared/types/tables/column.ts';
import type { MatchPlayer } from '@/entities/match/api/types.ts';

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

const mapPlayerItem = (player: IPlayer): IPlayer => {
  return {
    ...player,
    player: mapPlayer(player.player),
  };
};

export const mapPlayersList = (players: IPlayer[]): IPlayer[] => {
  if (!players || players.length === 0) {
    return players;
  }

  return players.map(mapPlayerItem);
};
