import './BracketMatch.scss';
import BracketPlayer from '@/entities/tournament-bracket/ui/player/BracketPlayer.tsx';
import type { IBracketPlayer } from '@/entities/tournament-bracket/model/types.ts';
interface BracketMatchProps {
  players: IBracketPlayer[];
  offset?: number;
}
const BracketMatch = ({ players, offset = 0 }: BracketMatchProps) => {
  return (
    <div className="tournament-match" style={{ marginTop: offset }}>
      <div className="tournament-match__players">
        {players.map((player) => (
          <BracketPlayer key={player.id} {...player} />
        ))}
      </div>
    </div>
  );
};
export default BracketMatch;
