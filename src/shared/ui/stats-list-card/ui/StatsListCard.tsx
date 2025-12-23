import './StatsListCard.scss';
import type { StatsListCardProps } from '@/shared/ui/stats-list-card/model/types.ts';

const StatsListCard = ({ title, statsList }: StatsListCardProps) => {
  return (
    <div className="stats-list-card">
      <h3 className="stats-list-card__title text-md-semibold">{title}</h3>
      <div className="stats-list-card__stats-list">
        {statsList.map((statsItem) => (
          <div className="stats-list-card__stats-item text-sm-medium">
            <span>{statsItem.label}</span>
            <span>{statsItem.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsListCard;
