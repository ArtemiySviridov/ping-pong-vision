import './Tournament.scss';
import { useState } from 'react';
import BreadCrumbs from '@/widgets/ui/bread-crumbs';
import Tabs from '@/shared/ui/tabs';
import TournamentBracket from '@/widgets/ui/tournament-bracket';
import TournamentInfo from '@/widgets/ui/tournament-info';

const tabs = [
  { id: 'information', label: 'Общая информация', content: <TournamentInfo /> },
  {
    id: 'tournament-bracket',
    label: 'Турнирная сетка',
    content: <TournamentBracket />,
  },
];

const Tournament = () => {
  const [value, setValue] = useState('information');
  return (
    <div className="tournament">
      <BreadCrumbs
        items={[
          { label: 'Турнирный календарь', href: '/tournament-calendar' },
          { label: 'Турнир #fldkg' },
        ]}
      />
      <Tabs tabs={tabs} value={value} onChange={setValue} />
    </div>
  );
};

export default Tournament;
