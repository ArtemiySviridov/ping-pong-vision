import { create } from 'zustand';

export interface BracketPlayer {
  id: string;
  playerName: string;
  avatar?: string;
  score?: number;
}

export interface BracketMatch {
  id: string;
  players: BracketPlayer[];
}

export interface BracketRound {
  id: number;
  name: string;
  matches: BracketMatch[];
}

interface BracketState {
  rounds: BracketRound[];

  generateBracket: (players: BracketPlayer[]) => void;
  setScore: (
    roundId: number,
    matchId: string,
    playerId: string,
    score: number,
  ) => void;
}

/* ========= ВСПОМОГАТЕЛЬНОЕ ========= */

const ROUND_NAMES: Record<number, string> = {
  1: 'Финал',
  2: '1/2 финала',
  4: '1/4 финала',
  8: '1/8 финала',
  16: '1/16 финала',
};

const getWinner = (match: BracketMatch): BracketPlayer => {
  if (match.players.length === 1) return match.players[0];

  const [a, b] = match.players;
  return (a.score ?? 0) >= (b.score ?? 0) ? a : b;
};

const generateFirstRound = (players: BracketPlayer[]): BracketRound => {
  const matches: BracketMatch[] = [];

  for (let i = 0; i < players.length; i += 2) {
    matches.push({
      id: crypto.randomUUID(),
      players: [players[i], players[i + 1]],
    });
  }

  console.log(matches);
  console.log(players);

  return {
    id: 1,
    name: ROUND_NAMES[matches.length] ?? 'Раунд',
    matches,
  };
};

const generateNextRound = (
  prevRound: BracketRound,
  roundId: number,
): BracketRound => {
  const matches: BracketMatch[] = [];

  console.log(prevRound);
  console.log(roundId);

  for (let i = 0; i < prevRound.matches.length; i += 2) {
    matches.push({
      id: crypto.randomUUID(),
      players: [
        getWinner(prevRound.matches[i]),
        getWinner(prevRound.matches[i + 1]),
      ],
    });
  }
  console.log('Матчи', matches);

  return {
    id: roundId,
    name: ROUND_NAMES[matches.length] ?? 'Раунд',
    matches,
  };
};

/* ========= STORE ========= */

export const useTournamentBracketStore = create<BracketState>((set, get) => ({
  rounds: [],

  generateBracket: (players) => {
    const rounds: BracketRound[] = [];

    let currentRound = generateFirstRound(players);
    rounds.push(currentRound);

    let roundId = 2;

    while (currentRound.matches.length > 1) {
      currentRound = generateNextRound(currentRound, roundId);
      rounds.push(currentRound);
      roundId++;
    }

    set({ rounds });
  },

  setScore: (roundId, matchId, playerId, score) => {
    const rounds = structuredClone(get().rounds);

    const round = rounds.find((r) => r.id === roundId);
    if (!round) return;

    const match = round.matches.find((m) => m.id === matchId);
    if (!match) return;

    const player = match.players.find((p) => p.id === playerId);
    if (!player) return;

    player.score = score;

    // Пересобираем все раунды ниже
    const roundIndex = rounds.findIndex((r) => r.id === roundId);
    let current = round;

    for (let i = roundIndex + 1; i < rounds.length; i++) {
      current = generateNextRound(current, rounds[i].id);
      rounds[i] = current;
    }

    set({ rounds });
  },
}));
