import AvatarWithName from '@/shared/ui/AvatarWithName';
import './BracketPlayer.scss';
interface BracketPlayerProps {
  avatar: string;
  playerName: string;
  score: number;
}

const BracketPlayer = ({ avatar, playerName, score }: BracketPlayerProps) => {
  return (
    <div className="bracket-player">
      <div className="bracket-player__player">
        <AvatarWithName
          name={playerName}
          avatarContent={avatar}
          namePosition="right"
          textStyle="sm-medium"
          avatarSize="xs"
        />
      </div>
      <span className="bracket-player__score">{score}</span>
    </div>
  );
};

export default BracketPlayer;
