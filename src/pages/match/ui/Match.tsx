import './Match.scss';
import BreadCrumbs from '@/widgets/ui/bread-crumbs';
import Tabs from '@/shared/ui/tabs';
import { useEffect, useState } from 'react';
import MatchReview from '@/widgets/ui/match-review';
import MatchStatistics from '@/widgets/ui/match-statistics';
import { useParams } from 'react-router';
import { useMatchStore } from '@/entities/match/model/matchStore.ts';
import { useBreadcrumbStore } from '@/widgets/ui/bread-crumbs/model/breaCrumbsStore.ts';

const tabs = [
  { id: 'match-review', label: 'Обзор матча', content: <MatchReview /> },
  { id: 'stats', label: 'Статистика', content: <MatchStatistics /> },
];

const Match = () => {
  const { fetchMatchById } = useMatchStore();
  const [value, setValue] = useState('match-review');
  const { matchId } = useParams();
  const { items, setItems } = useBreadcrumbStore();
  useEffect(() => {
    if (matchId) {
      const idNumber = parseInt(matchId, 10);
      if (!isNaN(idNumber)) {
        fetchMatchById(idNumber);
      }
    }
  }, [matchId, fetchMatchById]);

  useEffect(() => {
    if (!matchId) return;

    const matchLabel = `Матч #${matchId}`;
    const hasMatchInTrail = items.some((item) => item.label === matchLabel);

    if (hasMatchInTrail) {
      return;
    }

    setItems([
      { label: 'История матчей', href: '/match-history' },
      { label: matchLabel },
    ]);
  }, [matchId, items, setItems]);

  return (
    <div className="match">
      <BreadCrumbs items={items} />
      <Tabs tabs={tabs} value={value} onChange={setValue} />
    </div>
  );
};

export default Match;
