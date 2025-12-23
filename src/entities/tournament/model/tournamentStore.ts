import { create } from 'zustand';

export type TournamentStatus = {
  id: string;
  name: string;
};

export interface Participant {
  id: string;
  fullName: string;
  avatar: {
    path: null;
    alter: string;
  };
}

export interface TournamentInfo {
  id: string;
  name: string;
  dates: string;
  status: TournamentStatus;
  winner: Participant | null;
  players: Participant[];
}

export type Tournament = {
  id: string;
  tournamentName: string;
  dates: string;
  playersValue: number | string;
  status: TournamentStatus;
  category: string;
  participants: Participant[];
};

interface TournamentStore {
  tournaments: Tournament[];
  tournamentInfo: TournamentInfo | null;
  setTournamentInfo: (id: string) => void;
  addTournament: (tournament: Tournament) => void;
  getTournamentById: (id: string) => Tournament | undefined;
  updateTournament: (tournament: Tournament) => void;
  removeTournament: (id: string) => void;
  clearTournamentInfo: () => void;
}

// Моковые данные участников
const mockParticipants: Participant[] = Array.from({ length: 10 }, (_, i) => ({
  id: (i + 1).toString(),
  fullName: `Петров Петр Петрович ${i + 1}`,
  avatar: {
    path: null,
    alter: `ПП${i + 1}`,
  },
}));

// Начальные моковые данные турниров
const initialTournaments: Tournament[] = [
  {
    id: '1',
    tournamentName: 'Зимний турнир 2025',
    dates: 'Не известно',
    playersValue: 'Не известно',
    status: { id: 'planned', name: 'запланирован' },
    category: 'Профессионалы',
    participants: [],
  },
  {
    id: '2',
    tournamentName: 'Осенний турнир 2025',
    dates: '14.09.2025 - 16.09.2025',
    playersValue: 16,
    status: { id: 'over', name: 'завершен' },
    category: 'Профессионалы',
    participants: mockParticipants.slice(0, 8),
  },
  {
    id: '3',
    tournamentName: 'Летний турнир 2025',
    dates: '15.11.2025 - 17.11.2025',
    playersValue: 32,
    status: { id: 'active', name: 'активен' },
    category: 'Профессионалы',
    participants: mockParticipants,
  },
  {
    id: '4',
    tournamentName: 'Весенний турнир 2025',
    dates: '16.10.2025 - 19.10.2025',
    playersValue: 8,
    status: { id: 'cancelled', name: 'отменен' },
    category: 'Профессионалы',
    participants: mockParticipants.slice(0, 6),
  },
];

export const useTournamentStore = create<TournamentStore>((set, get) => ({
  tournaments: initialTournaments || [],
  tournamentInfo: null,

  setTournamentInfo: (id: string) => {
    const tournament = get().tournaments.find((t) => t.id === id);
    if (tournament) {
      // Создаем объект TournamentInfo на основе данных турнира
      const tournamentInfo: TournamentInfo = {
        id: tournament.id,
        name: `${tournament.tournamentName} | ${tournament.category}`,
        dates: tournament.dates,
        status: tournament.status,
        winner:
          tournament.participants.length > 0 && tournament.status.id === 'over'
            ? tournament.participants[0]
            : null,
        players: tournament.participants,
      };
      set({ tournamentInfo: tournamentInfo });
    }
  },

  clearTournamentInfo: () => {
    set({ tournamentInfo: null });
  },

  addTournament: (tournament) => {
    set((state) => ({
      tournaments: [...state.tournaments, tournament],
    }));
  },

  getTournamentById: (id) => get().tournaments.find((t) => t.id === id),

  updateTournament: (tournament) => {
    set((state) => ({
      tournaments: state.tournaments.map((t) =>
        t.id === tournament.id ? tournament : t,
      ),
    }));
  },

  removeTournament: (id) =>
    set((state) => ({
      tournaments: state.tournaments.filter((t) => t.id !== id),
    })),
}));
