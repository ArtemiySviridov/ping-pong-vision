import './PlayerStatistics.scss';
import Card from '@/shared/ui/Card';

interface PlayerStatisticsProps {
  stats: {
    amateurGamesCount: number;
    tournamentGamesCount: number;
    winsCount: number;
    lossesCount: number;
    averageMatchDuration: number;
    averageTimeToPoint: number;
    totalMatchesDuration: number;
  };
}

const PlayerStatistics = ({ stats }: PlayerStatisticsProps) => {
  return (
    <div className="player-statistics">
      <div className="player-statistics__matches-stats">
        <Card
          type="stats-s"
          text={stats?.amateurGamesCount}
          color="light-blue"
          title="Сыграно любительских матчей"
        />
        <Card
          type="stats-s"
          text={stats?.tournamentGamesCount}
          color="turquoise"
          title="Сыграно турнирных матчей"
        />
        <Card
          type="stats-s"
          text={stats?.winsCount}
          color="light-orange"
          title="Всего побед"
        />
        <Card
          type="stats-s"
          text={stats?.lossesCount}
          color="pink"
          title="Всего поражений"
        />
      </div>
      <div className="player-statistics__time-stats">
        <Card
          type="stats-s"
          text={stats?.averageMatchDuration}
          title="Средняя продолжительность матча"
        />
        <Card
          type="stats-s"
          text={stats?.averageTimeToPoint}
          title="Средняя продолжительность розыгрыша"
        />
        <Card
          type="stats-s"
          text={stats?.totalMatchesDuration}
          title="Общая длительность всех матчей"
        />
      </div>
    </div>
  );
};

export default PlayerStatistics;
