import './MatchHat.scss';
import Avatar from '@/shared/ui/avatar';
import Status from '@/shared/ui/status';
import { useMatchStore } from '@/entities/match/model/matchStore.ts';

const MatchHat = () => {
  const match = useMatchStore((state) => state.match);
  const isLoading = useMatchStore((state) => state.isLoading);

  if (isLoading || !match) return <div>Загрузка матча...</div>;
  return (
    <div className="match-hat">
      <div className="match-hat__info-wrapper">
        <div className="match-hat__team match-hat__team--left">
          <div className="match-hat__avatar">
            <Avatar
              size="large"
              src={match?.player1.avatar.path}
              alter={match?.player1.avatar.alter}
            />
          </div>
          <div className="match-hat__team-info">
            <h2 className="text-md-semibold">{match?.player1.fullName}</h2>
            <Status
              variant={match?.player1.isWinner ? 'win' : 'lose'}
              text={match?.player1.isWinner ? 'победа' : 'поражение'}
            />
          </div>
        </div>

        {/* Счёт по центру */}
        <div className="match-hat__score">
          <h2 className="text-lg-bold">
            {match?.player1.score} : {match?.player2.score}
          </h2>
        </div>

        {/* Правая команда */}
        <div className="match-hat__team match-hat__team--right">
          <div className="match-hat__avatar match-hat__avatar--right">
            <Avatar
              size="large"
              src={match?.player2.avatar.path}
              alter={match?.player2.avatar.alter}
            />
          </div>
          <div className="match-hat__team-info">
            <h2 className="text-md-semibold">{match?.player2.fullName}</h2>
            <Status
              variant={match?.player2.isWinner ? 'win' : 'lose'}
              text={match?.player2.isWinner ? 'победа' : 'поражение'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchHat;
