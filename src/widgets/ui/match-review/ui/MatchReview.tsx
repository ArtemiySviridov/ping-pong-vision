import './MatchReview.scss';
import MatchHat from '@/widgets/ui/match-hat';
import Button from '@/shared/ui/Button';
import { Calendar, Clock, Download } from 'lucide-react';
import Table from '@/shared/ui/table';
import { useMatchStore } from '@/entities/match/model/matchStore.ts';
import { useEffect } from 'react';
import { useMatchWithSetsColumns } from '@/entities/match/model/useMatchWithSetsColumns.ts';
import type { Player } from '@/entities/match/api/types.ts';
import MessagePanel from '@/shared/ui/MessagePanel';
import Loader from '@/shared/ui/loader';

const MatchReview = () => {
  const { match, isLoading } = useMatchStore();
  const { columns, fetchColumns } = useMatchWithSetsColumns();

  const formatPlayerForTable = (player: Player, opponentScore: number) => {
    const sets = [...player.sets, ...Array(5 - player.sets.length).fill('-')];

    return {
      player, // будет использоваться в колонке "player"
      s1: sets[0],
      s2: sets[1],
      s3: sets[2],
      s4: sets[3],
      s5: sets[4],
      score: `${player.score}:${opponentScore}`,
    };
  };

  const players = match
    ? [
        formatPlayerForTable(match.player1, match.player2.score),
        formatPlayerForTable(match.player2, match.player1.score),
      ]
    : [];

  useEffect(() => {
    fetchColumns('match-with-sets');
  }, []);

  if (isLoading) {
    return (
      <div className="match-review">
        <Loader size="large" />
      </div>
    );
  }

  if (!match && !columns) {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="match-review"
      >
        <MessagePanel
          message="Не удалось загрузить данные этого матча"
          iconMood="sad"
        />
      </div>
    );
  }

  return (
    <div className="match-review">
      <div className="match-review__title">
        <span className="text-lg-medium">{match?.type}</span>
        <Button
          size="small"
          variant="tertiary"
          text="Скачать отчет по матчу"
          icon={<Download strokeWidth={1.5} />}
        />
      </div>
      <MatchHat />
      <div className="match-review__date-time text-sm-medium">
        <div className="match-review__date-time__date">
          <Calendar strokeWidth={1.5} />
          <span>{match?.datetime}</span>
        </div>
        <div className="match-review__date-time__time">
          <Clock strokeWidth={1.5} />
          <span>{match?.durationInMinutes}</span>
        </div>
      </div>
      <div className="match-review__score">
        <h3 className="text-md-semibold">Счет по партиям</h3>
        <Table data={players} columns={columns} />
      </div>
    </div>
  );
};

export default MatchReview;
