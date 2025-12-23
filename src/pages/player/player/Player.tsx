import './Player.scss';
import BreadCrumbs from '@/widgets/ui/bread-crumbs';
import ProfileHat from '@/widgets/ui/profile-hat';
import Tabs from '@/shared/ui/tabs';
import { useEffect, useState } from 'react';
import { usePlayerStore } from '@/entities/player/model/playerStore.ts';
import { useParams } from 'react-router';
import UserProfileStatistics from '@/widgets/ui/user-profile-statistics/UserProfileStatistics';
import PlayerProfileMatches from '@/widgets/ui/player-profile-matches';
import { useBreadcrumbStore } from '@/widgets/ui/bread-crumbs/model/breaCrumbsStore.ts';

const Player = () => {
  const [value, setValue] = useState('stats');
  const { playerId } = useParams();
  const player = usePlayerStore((state) => state.player);
  const items = useBreadcrumbStore((state) => state.items);

  useEffect(() => {
    useBreadcrumbStore.getState().setItems([
      { label: 'Игроки', href: '/players' },
      { label: `Игрок #${playerId}`, href: `/players/${playerId}` },
    ]);
  }, [playerId]);

  const tabs = [
    {
      id: 'stats',
      label: 'Статистика',
      content: playerId ? (
        <UserProfileStatistics userId={Number(playerId)} />
      ) : null,
    },
    {
      id: 'tables',
      label: 'Матчи',
      content: <PlayerProfileMatches />,
    },
  ];

  if (items.length === 0) return null;
  return (
    <div className="player">
      <BreadCrumbs items={items} />
      <ProfileHat
        fullName={player.fullName}
        role={player.role}
        avatar={player.avatar}
      />
      <Tabs tabs={tabs} value={value} onChange={setValue} />
    </div>
  );
};

export default Player;
