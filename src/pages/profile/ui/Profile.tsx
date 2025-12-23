import './Profile.scss';
import ProfileHat from '@/widgets/ui/profile-hat';
import Tabs from '@/shared/ui/tabs';
import { useEffect, useState } from 'react';
import PersonalInfo from '@/features/profile/personal-info';
import ProfileMatches from '@/widgets/ui/profile-matches';
import { useProfileStore } from '@/entities/profile/model/profileStore.ts';
// import { useAuthStore } from '@/features/auth/model/authStore.ts';
// import AdminPanel from '@/widgets/ui/admin-panel';
import MyProfileStatistics from '@/widgets/ui/my-profile-statistics';

const baseTabs = [
  {
    id: 'personal-info',
    label: 'Личная информация',
    content: <PersonalInfo />,
  },
  {
    id: 'stats',
    label: 'Моя статистика',
    content: <MyProfileStatistics />,
  },
  {
    id: 'matches',
    label: 'Мои матчи',
    content: <ProfileMatches />,
  },
];

// const adminTabs = [
//   ...baseTabs,
//   // {
//   //   id: 'admin-panel',
//   //   label: 'Панель администратора',
//   //   content: <AdminPanel />,
//   // },
//   {
//     id: 'calibrate-cameras',
//     label: 'Калибровка камер',
//     content: '',
//   },
// ];

const Profile = () => {
  const [value, setValue] = useState('personal-info');
  const fetchPersonalInfo = useProfileStore((state) => state.fetchPersonalInfo);
  const personalInfo = useProfileStore((state) => state.personalInfo);
  // const role = useAuthStore((state) => state.role);

  // const tabs = role === 'admin' ? adminTabs : baseTabs;

  useEffect(() => {
    fetchPersonalInfo();
  }, [fetchPersonalInfo]);

  const fullName = personalInfo
    ? `${personalInfo.firstName} ${personalInfo.lastName}`
    : '';

  return (
    <div className="profile">
      <ProfileHat
        fullName={fullName}
        role={personalInfo?.role}
        avatar={personalInfo?.avatar}
      />
      <Tabs tabs={baseTabs} value={value} onChange={setValue} />
    </div>
  );
};

export default Profile;
