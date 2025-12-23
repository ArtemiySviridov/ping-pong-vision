import './ProfileMatches.scss';
import PaginatedTable from '@/shared/ui/paginated-table';
import { useProfileMatchesColumnsStore } from '@/entities/profile/model/useProfileMatchesColumnsStore.ts';
import { useEffect } from 'react';
import { useProfileStore } from '@/entities/profile/model/profileStore.ts';
import type { ProfileMatch } from '@/entities/match/api/types.ts';
import { useNavigate } from 'react-router';

const ProfileMatches = () => {
  const navigate = useNavigate();
  const fetchColumns = useProfileMatchesColumnsStore(
    (state) => state.fetchColumns,
  );

  const {
    profileMatches,
    fetchProfileMatches,
    isLoading,
    profileMatchesPagination,
  } = useProfileStore();

  const columns = useProfileMatchesColumnsStore((state) => state.columns);

  const currentPage =
    Math.floor(
      profileMatchesPagination.offset / profileMatchesPagination.limit,
    ) + 1;

  const totalPages = Math.ceil(
    profileMatchesPagination.total / profileMatchesPagination.limit,
  );

  useEffect(() => {
    fetchColumns('user-matches-history');
    fetchProfileMatches(1, 10);
  }, [fetchProfileMatches]);

  const handlePageChange = (page: number) => {
    fetchProfileMatches(page, profileMatchesPagination.limit);
  };

  const handleRowClick = (match: ProfileMatch) => {
    navigate(`/match-history/match/${match.id}`);
  };

  return (
    <div className="profile-matches">
      <PaginatedTable
        data={profileMatches || []}
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

export default ProfileMatches;
