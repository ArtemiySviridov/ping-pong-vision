import './StatsProgressBar.scss';
import ProgressBar from '@/shared/ui/progress-bar';
import type { StatsProgressBarProps } from '@/shared/ui/stats-progress-bar/model/types.ts';

const StatsProgressBar = ({
  title,
  firstPlayerScore,
  secondPlayerScore,
}: StatsProgressBarProps) => {
  return (
    <div className="stats-progress-bar">
      <h2 className="stats-progress-bar__title text-lg-medium">{title}</h2>
      <div className="stats-progress-bar__progress-bars">
        <ProgressBar progress={firstPlayerScore} />
        <ProgressBar progress={secondPlayerScore} reverse={true} />
      </div>
    </div>
  );
};

export default StatsProgressBar;
