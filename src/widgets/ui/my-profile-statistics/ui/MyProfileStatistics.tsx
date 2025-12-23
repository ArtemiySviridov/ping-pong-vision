import { useEffect } from 'react';
import { useProfileStore } from '@/entities/profile/model/profileStore.ts';
import PlayerStatistics from '@/widgets/ui/palyer-statistics';
import Loader from '@/shared/ui/loader';

const MyProfileStatistics = () => {
  const fetchProfileStats = useProfileStore((s) => s.fetchProfileStats);
  const profileStats = useProfileStore((s) => s.profileStats);
  const isLoading = useProfileStore((s) => s.isLoading);

  useEffect(() => {
    fetchProfileStats();
  }, [fetchProfileStats]);

  if (isLoading) {
    return (
      <div className="stats_">
        <Loader size="large" />
      </div>
    );
  }

  if (!profileStats) {
    return null;
  }

  return <PlayerStatistics stats={profileStats} />;
};

export default MyProfileStatistics;
