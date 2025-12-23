export interface IBracketPlayer {
  id: string;
  avatar?: string;
  playerName: string;
  score?: number;
}

export interface IBracketMatch {
  id: string;
  players: IBracketPlayer[];
}

export interface IBracketRound {
  id: string;
  name: string;
  matches: IBracketMatch[];
}
