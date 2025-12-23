import './MatchHistory.scss';
import PaginatedTable from '@/shared/ui/paginated-table';
import { useNavigate } from 'react-router';
import { useMatchListStore } from '@/entities/match/model/matchListStore.ts';
import { useEffect } from 'react';
import {
  type HistoryMatch,
  useMatchHistoryColumnsStore,
} from '@pages/match-history/model/useMatchHistoryColumnsStore.ts';

const MatchHistory = () => {
  const { matches, isLoading, fetchMatches, matchesPagination } =
    useMatchListStore();
  const { columns, fetchColumns } = useMatchHistoryColumnsStore();
  const navigate = useNavigate();

  const currentPage =
    Math.floor(matchesPagination.offset / matchesPagination.limit) + 1;

  const totalPages = Math.ceil(
    matchesPagination.total / matchesPagination.limit,
  );

  useEffect(() => {
    fetchMatches(1, 10);
    fetchColumns('matches-history');
  }, []);

  const handlePageChange = (page: number) => {
    fetchMatches(page, matchesPagination.limit);
  };

  const handleRowClick = (match: HistoryMatch) => {
    navigate(`/match-history/match/${match.id}`);
  };

  return (
    <div className="match-history">
      <div className="match-history__table">
        <PaginatedTable
          data={matches || []}
          columns={columns}
          total={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default MatchHistory;
