import type { MatchPlayer, ProfileMatch } from '@/entities/match/api/types';
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

const mapMatchItem = (match: ProfileMatch): ProfileMatch => {
  return {
    ...match,
    opponent: mapPlayer(match.opponent),
    winner: mapPlayer(match.winner),
  };
};

export const mapProfileMatchesList = (
  matches: ProfileMatch[],
): ProfileMatch[] => {
  if (!matches || matches.length === 0) {
    return matches;
  }

  return matches.map(mapMatchItem);
};
