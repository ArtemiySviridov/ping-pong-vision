import './TableStatistics.scss';
import { ChartSection } from './ChartSection';
import { TopPlayers } from './TopPlayers';

export const TableStatistics = () => {
  return (
    <div className="table-statistics">
      <ChartSection />
      <TopPlayers />
    </div>
  );
};
