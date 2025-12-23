import './TopPlayers.scss';
import { useEffect } from 'react';
import Table from '@/shared/ui/table';
import { useTableAvailabilityStore } from '@/entities/match/model/tableAvailabilityStore.ts';
import { useTopPlayersColumns } from '@/entities/match/model/topPlayersColumns.ts';
import Loader from '@/shared/ui/loader';

export const TopPlayers = () => {
  const { topPlayers, fetchTopPlayers } = useTableAvailabilityStore();
  const { fetchColumns, columns } = useTopPlayersColumns();

  useEffect(() => {
    fetchTopPlayers();
    fetchColumns('top-players');
  }, []);

  if (!topPlayers) {
    return (
      <div className="top-players">
        <Loader />
      </div>
    );
  }

  return (
    <div className="top-players">
      <h3 className="text-lg-medium">Статистика загруженности стола</h3>
      <Table data={topPlayers} columns={columns} />
    </div>
  );
};
