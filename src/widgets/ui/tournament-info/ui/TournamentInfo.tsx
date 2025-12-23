import './TournamentInfo.scss';
import TournamentHat from '@/widgets/ui/tournament-hat';
import AvatarWithName from '@/shared/ui/AvatarWithName';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useTournamentStore } from '@/entities/tournament/model/tournamentStore.ts';

const TournamentInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { tournamentInfo, setTournamentInfo } = useTournamentStore();

  useEffect(() => {
    if (id) {
      setTournamentInfo(id);
    }
    return () => {
      // Очистка при уходе со страницы
      useTournamentStore.getState().clearTournamentInfo();
    };
  }, [id, setTournamentInfo]);

  if (!tournamentInfo) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className="tournament-info">
      <TournamentHat
        name={tournamentInfo.name}
        status={tournamentInfo.status}
        dates={tournamentInfo.dates}
      />
      <div className="tournament-info__information">
        <div className="tournament-info__information__winner">
          <h2 className="text-lg-medium">Победитель</h2>
          {tournamentInfo.winner === null ? (
            'Станет известен после окончания турнира.'
          ) : (
            <AvatarWithName
              name={tournamentInfo.winner.fullName}
              namePosition="right"
              avatarSize="small"
              textStyle="sm-medium"
            />
          )}
        </div>
        <div className="tournament-info__information__players">
          <h2 className="text-lg-medium">
            Участники ({tournamentInfo.players.length})
          </h2>
          <div className="tournament-info__information__players__list-container">
            <h5 className="tournament-info__information__players__list-container__title text">
              ФИО игрока
            </h5>
            <div className="tournament-info__information__players__list-container__list">
              {tournamentInfo.players.map((player) => (
                <AvatarWithName
                  name={player.fullName}
                  namePosition="right"
                  avatarSize="small"
                  textStyle="sm-medium"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentInfo;
