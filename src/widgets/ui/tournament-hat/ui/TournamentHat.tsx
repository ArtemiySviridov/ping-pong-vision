import './TournamentHat.scss';
import Avatar from '@/shared/ui/avatar';
import tournamentLogo from '@/assets/icons/tournament-logo.svg';
import Status from '@/shared/ui/status';

interface TournamentHatProps {
  name: string;
  status: {
    id: string;
    name: string;
  };
  dates: string;
}

const TournamentHat = ({ name, status, dates }: TournamentHatProps) => {
  return (
    <div className="tournament-hat">
      <div className="tournament-hat__profile-info-wrapper">
        <div className="tournament-hat__info">
          <div className="tournament-hat__info__avatar">
            <Avatar size="large" src={tournamentLogo} alter="Т" />
          </div>
          <div className="tournament-hat__info__user-info">
            <h2 className="text-md-semibold">{name}</h2>
            <div className="tournament-hat__info__user-info__dates-status">
              <span className="text-xs-regular">{dates}</span>
              <Status variant={status.id} text={status.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentHat;
