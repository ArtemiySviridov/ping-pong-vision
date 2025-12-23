import './DefaultLayout.scss';
import { Outlet, useLocation } from 'react-router';
import Sidebar from '@/widgets/layout/Sidebar';
import Header from '@/widgets/layout/Header';

const ROUTE_TITLES: Record<string, string> = {
  '/live': 'LIVE',
  '/tournament-calendar': 'Турнирный календарь',
  '/match-history': 'История матчей',
  '/table-availability': 'Загруженность стола',
  '/players': 'Игроки',
  '/profile': 'Профиль',
  '/players/': 'Игрок',
  '/tournament-calendar/add-tournament': 'Добавление турнира',
};

const DefaultLayout = () => {
  const location = useLocation();
  const title = ROUTE_TITLES[location.pathname];
  return (
    <div className="default-layout">
      <div className="default-layout__sidebar">
        <Sidebar />
      </div>
      <div className="default-layout__content">
        <header className="default-layout__header">
          <Header title={title} />
        </header>
        <main className="default-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
