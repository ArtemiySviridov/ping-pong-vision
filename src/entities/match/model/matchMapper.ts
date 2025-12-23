import type { MatchById, Player } from '@/entities/match/api/types';
import type { Avatar } from '@/shared/types/tables/column';

const BASE_URL = 'https://ppv-backend.wonderrfau1t.site';

const mapAvatar = (avatar: Avatar): Avatar => {
  if (!avatar?.path) {
    return avatar;
  }

  return {
    ...avatar,
    path: avatar.path ? `${BASE_URL}${avatar.path}` : null,
  };
};

const mapPlayer = (player: Player): Player => ({
  ...player,
  avatar: mapAvatar(player.avatar),
});

export const mapMatch = (data: MatchById): MatchById => {
  if (!data) {
    throw new Error('Invalid match data');
  }

  return {
    ...data,
    player1: mapPlayer(data.player1),
    player2: mapPlayer(data.player2),
  };
};
