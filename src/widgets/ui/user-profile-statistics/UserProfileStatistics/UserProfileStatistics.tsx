import { useEffect } from 'react';
import PlayerStatistics from '@/widgets/ui/palyer-statistics';
import { usePlayerStore } from '@/entities/player/model/playerStore.ts';
import Loader from '@/shared/ui/loader';

const UserProfileStatistics = ({ userId }: { userId: number }) => {
  const fetchPlayerById = usePlayerStore((state) => state.fetchPlayerById);
  const player = usePlayerStore((state) => state.player);
  const isLoading = usePlayerStore((state) => state.isLoading);
  useEffect(() => {
    fetchPlayerById(userId);
  }, [fetchPlayerById, userId]);

  if (isLoading) {
    return (
      <div className="stats_">
        <Loader size="large" />
      </div>
    );
  }

  if (!player) {
    return null;
  }

  return <PlayerStatistics stats={player.stats} />;
};

export default UserProfileStatistics;
