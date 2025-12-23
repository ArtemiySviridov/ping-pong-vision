import './Players.scss';
import PaginatedTable from '@/shared/ui/paginated-table';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { usePlayersColumns } from '@/entities/player/model/usePlayersColumns.ts';
import { usePlayerStore } from '@/entities/player/model/playerStore.ts';
import type { IPlayer } from '@/entities/player/api/types.ts';
import { useSelectStore } from '@/shared/ui/select/model/selectStore.ts';
import { useAuthStore } from '@/features/auth/model/authStore.ts';
import type { Column } from '@/shared/types/tables/column.ts';
import Button from '@/shared/ui/Button';
import ApproveUsersCarousel from '@/widgets/ui/approve-users-carousel';

const Players = () => {
  const navigate = useNavigate();
  const { columns, fetchColumns } = usePlayersColumns();
  const players = usePlayerStore((state) => state.players);
  const blockPlayer = usePlayerStore((state) => state.blockPlayer);
  const unblockPlayer = usePlayerStore((state) => state.unblockPlayer);
  const fetchPlayers = usePlayerStore((state) => state.fetchPlayers);
  const playersPagination = usePlayerStore((state) => state.playersPagination);
  const isPlayersLoading = usePlayerStore((state) => state.isPlayersLoading);

  const role = useAuthStore((state) => state.role);
  const fetchRoleSelectOptions = useSelectStore(
    (state) => state.fetchRoleSelectOptions,
  );

  const fetchColumnsDirection = role === 'admin' ? 'admin-users' : 'users';
  const actionsColumn: Column<IPlayer> = {
    key: 'actions',
    title: 'Действия',
    render: (_, player) => {
      if (player.status?.id === 'active') {
        return (
          <Button
            size="small"
            variant="tertiary"
            text="Заблокировать"
            onClick={(e: any) => {
              e.stopPropagation();
              blockPlayer(player.id);
            }}
          />
        );
      } else {
        return (
          <Button
            size="small"
            variant="tertiary"
            text="Разблокировать"
            onClick={(e: any) => {
              e.stopPropagation();
              unblockPlayer(player.id);
            }}
          />
        );
      }
    },
  };

  const finalColumns: Column<IPlayer>[] = [...columns, actionsColumn];
  useEffect(() => {
    fetchRoleSelectOptions();
    fetchColumns(fetchColumnsDirection);
    fetchPlayers(1, 10);
  }, [fetchColumns, fetchPlayers, fetchRoleSelectOptions]);

  const currentPage =
    Math.floor(playersPagination.offset / playersPagination.limit) + 1;

  const totalPages = Math.ceil(
    playersPagination.total / playersPagination.limit,
  );

  const handlePageChange = (page: number) => {
    fetchPlayers(page, playersPagination.limit);
  };

  const handleRowClick = (player: IPlayer) => {
    navigate(`/players/${player.id}`);
  };

  return (
    <div className="players">
      {role === 'admin' && (
        <div className="players__register-aprove">
          <h2 className="text-lg-medium">Заявки на регистрацию в системе</h2>
          <ApproveUsersCarousel />
        </div>
      )}
      <PaginatedTable
        data={players || []}
        columns={role === 'admin' ? finalColumns : columns}
        total={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isLoading={isPlayersLoading}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default Players;
