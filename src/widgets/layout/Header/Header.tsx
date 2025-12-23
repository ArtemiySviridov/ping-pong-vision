import './Header.scss';
import AvatarWithName from '@/shared/ui/AvatarWithName';
import { useProfileStore } from '@/entities/profile/model/profileStore.ts';
import { useEffect } from 'react';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const fetchPersonalInfo = useProfileStore((state) => state.fetchPersonalInfo);
  const personalInfo = useProfileStore((state) => state.personalInfo);

  useEffect(() => {
    if (!personalInfo) {
      fetchPersonalInfo();
    }
  }, [personalInfo, fetchPersonalInfo]);
  return (
    <div className="header">
      <h1 className="header__title text-xl-bold">{title}</h1>
      <div className="header__info">
        <AvatarWithName
          name={`${personalInfo?.firstName} ${personalInfo?.lastName}`}
          namePosition="left"
          avatarSize="small"
          src={personalInfo?.avatar.path}
          alter={personalInfo?.avatar?.alter}
          textStyle="sm-medium"
        />
      </div>
    </div>
  );
};

export default Header;
