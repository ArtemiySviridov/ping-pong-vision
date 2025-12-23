import './PlayerProfileMatches.scss';
import { useProfileMatchesColumnsStore } from '@/entities/profile/model/useProfileMatchesColumnsStore.ts';
import { useEffect } from 'react';
import PaginatedTable from '@/shared/ui/paginated-table';
import { usePlayerStore } from '@/entities/player/model/playerStore.ts';
import { useNavigate } from 'react-router';
import type { ProfileMatch } from '@/entities/match/api/types.ts';
import { useBreadcrumbStore } from '@/widgets/ui/bread-crumbs/model/breaCrumbsStore.ts';

const PlayerProfileMatches = () => {
  const navigate = useNavigate();
  const fetchColumns = useProfileMatchesColumnsStore(
    (state) => state.fetchColumns,
  );

  const columns = useProfileMatchesColumnsStore((state) => state.columns);
  const {
    playerMatches,
    fetchPlayerProfileMatches,
    playerMatchesPagination,
    isLoading,
  } = usePlayerStore();

  const currentPage =
    Math.floor(playerMatchesPagination.offset / playerMatchesPagination.limit) +
    1;

  const totalPages = Math.ceil(
    playerMatchesPagination.total / playerMatchesPagination.limit,
  );

  useEffect(() => {
    fetchColumns('user-matches-history');
    fetchPlayerProfileMatches(1, 10);
  }, [fetchPlayerProfileMatches]);

  const handlePageChange = (page: number) => {
    fetchPlayerProfileMatches(page, playerMatchesPagination.limit);
  };

  const handleRowClick = (match: ProfileMatch) => {
    useBreadcrumbStore.getState().pushItem({ label: `Матч #${match.id}` });
    navigate(`/match-history/match/${match.id}`);
  };

  return (
    <div className="player-profile-matches">
      <PaginatedTable
        data={playerMatches || []}
        columns={columns}
        total={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default PlayerProfileMatches;
