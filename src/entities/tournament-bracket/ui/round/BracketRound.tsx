import './BracketRound.scss';
import BracketMatch from '@/entities/tournament-bracket/ui/match/BracketMatch.tsx';
import type { IBracketMatch } from '@/entities/tournament-bracket/model/types.ts';

interface RoundProps {
  name: string;
  matches: IBracketMatch[];
  offset?: number;
}

const BracketRound = ({ name, matches, offset = 0 }: RoundProps) => {
  return (
    <div className="bracket-round">
      <h2 className="bracket-round__title text-lg-medium">{name}</h2>
      <div className="bracket-round__matches" style={{ rowGap: `${offset}px` }}>
        {matches.map((match) => (
          <BracketMatch key={match.id} players={match.players} />
        ))}
      </div>
    </div>
  );
};
export default BracketRound;
