import './Sidebar.scss';
import {
  Video,
  Calendar,
  Grid,
  Clock,
  Users,
  User,
  LogOut,
} from 'lucide-react';
import SidebarNav from '@/shared/ui/SidebarNav';
import PpvLogo from '@/shared/ui/ppv-logo';
import { useAuthStore } from '@/features/auth/model/authStore.ts';
import { useState } from 'react';
import LogoutModal from '@/features/logout-modal/LogoutModal'; // Import icons

const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };
  const navLabels = [
    { icon: Video, text: 'Live', link: '/live' },
    {
      icon: Calendar,
      text: 'Турнирный календарь',
      link: '/tournament-calendar',
    },
    { icon: Grid, text: 'История матчей', link: '/match-history' },
    { icon: Clock, text: 'Загруженность стола', link: '/table-availability' },
    { icon: Users, text: 'Игроки', link: '/players' },
    { icon: User, text: 'Профиль', link: '/profile' },
  ];

  const logoutItem = {
    icon: LogOut,
    text: 'Выйти',
    link: '#',
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__header">
          <PpvLogo size="small" textStyle="text-lg-medium" />
        </div>
        <div className="sidebar__menu">
          <p className="sidebar__menu-label">Меню</p>
          <nav className="sidebar__menu-nav">
            {navLabels.map((label) => (
              <SidebarNav
                link={label.link}
                variant="default"
                text={label.text}
                icon={label.icon}
                key={label.text}
                isActive={location.pathname === label.link}
              />
            ))}
          </nav>
          <div className="sidebar__menu-logout">
            <SidebarNav
              link={logoutItem.link}
              variant="logout"
              text={logoutItem.text}
              icon={logoutItem.icon}
              onClick={() => setIsLogoutModalOpen(true)}
            />
          </div>
        </div>
      </div>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onSubmit={handleLogout}
      />
    </>
  );
};

export default Sidebar;
