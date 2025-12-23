import type { Match, MatchPlayer } from '@/entities/match/api/types';
import type { Avatar } from '@/shared/types/tables/column';

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

const mapMatchItem = (match: Match): Match => {
  return {
    ...match,
    player1: mapPlayer(match.player1),
    player2: mapPlayer(match.player2),
    winner: mapPlayer(match.winner),
  };
};

export const mapMatchesList = (matches: Match[]): Match[] => {
  if (!matches || matches.length === 0) {
    return matches;
  }
  return matches.map(mapMatchItem);
};
