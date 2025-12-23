import './TableAvailability.scss';
import { ChartSection, TopPlayers } from '@/widgets/ui/table-statstics';

const TableAvailability = () => {
  return (
    <div className="table-availability">
      <ChartSection />
      <TopPlayers />
    </div>
  );
};

export default TableAvailability;
