import './TournamentCalendar.scss';
import PaginatedTable from '@/shared/ui/paginated-table';
import { useNavigate } from 'react-router';
import type { Column } from '@/shared/types/tables/column.ts';
import Button from '@/shared/ui/Button';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import {
  type Tournament,
  useTournamentStore,
} from '@/entities/tournament/model/tournamentStore.ts';
import Status from '@/shared/ui/status';
import { useAuthStore } from '@/features/auth/model/authStore.ts';

const TournamentCalendar = () => {
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.role);
  const { tournaments, removeTournament } = useTournamentStore();

  const handleRowClick = (tournament: Tournament) => {
    navigate(`/tournament-calendar/tournament/${tournament.id}`);
  };

  const onPageChange = (page: number) => {
    console.log('Page changed to:', page);
  };

  const columns: Column<Tournament>[] = [
    { key: 'id', title: 'ID турнира' },
    { key: 'tournamentName', title: 'Название' },
    {
      key: 'dates',
      title: 'Даты',
    },
    {
      key: 'playersValue',
      title: 'Количество игроков',
    },
    {
      key: 'status',
      title: 'Статус',
      render: (_: any, row: Tournament) => (
        <Status variant={row.status.id} text={row.status.name} />
      ),
    },
    { key: 'category', title: 'Категория турнира' },
  ];

  const adminColumn: Column<Tournament> = {
    key: 'actions',
    title: 'Действия',
    render: (_: any, tournament) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <Button
            size="small"
            icon={<Pencil size={22} />}
            variant="tertiary"
            text=""
            onClick={(e: any) => {
              e.stopPropagation();
              navigate(`/tournament-calendar/tournament/${tournament.id}/edit`);
            }}
          />
          <Button
            size="small"
            icon={<Trash2 size={22} />}
            variant="tertiary"
            text=""
            onClick={(e: any) => {
              e.stopPropagation();
              removeTournament(tournament.id);
            }}
          />
        </div>
      );
    },
  };

  const finalColumns = [...columns, adminColumn];

  const totalPages = Math.ceil(tournaments.length / 10);

  return (
    <div className="tournament-calendar">
      {role === 'admin' && (
        <div className="tournament-calendar__create-tournament-button">
          <Button
            size="small"
            variant="tertiary"
            icon={<Plus />}
            text="Добавить турнир"
            onClick={() => navigate('add-tournament')}
          />
        </div>
      )}
      <PaginatedTable
        total={totalPages}
        currentPage={1}
        data={tournaments}
        columns={finalColumns}
        onRowClick={handleRowClick}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default TournamentCalendar;
