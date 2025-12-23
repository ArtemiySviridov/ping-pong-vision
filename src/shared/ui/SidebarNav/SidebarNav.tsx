import './SidebarNav.scss';
import React from 'react';
import { Link, useLocation } from 'react-router';

interface SidebarNavProps {
  link: string;
  icon: React.ComponentType<{
    className?: string;
    width?: number;
    height?: number;
  }>;
  text: string;
  variant: 'default' | 'logout';
  onClick?: () => void;
  isActive?: boolean;
}

const SidebarNav = ({
  link,
  icon: Icon,
  text,
  variant = 'default',
  onClick,
  isActive = false,
}: SidebarNavProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isCurrent = isActive || currentPath === link;
  return (
    <Link
      to={link}
      className={`sidebar-nav sidebar-nav--${variant} ${
        isCurrent ? 'sidebar-nav--active' : ''
      }`}
      onClick={onClick}
    >
      <Icon className="sidebar-nav__icon" height={20} width={20} />
      <span>{text}</span>
    </Link>
  );
};

export default SidebarNav;
