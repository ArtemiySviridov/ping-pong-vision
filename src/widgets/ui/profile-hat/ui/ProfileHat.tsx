import './ProfileHat.scss';
import Avatar from '@/shared/ui/avatar';

interface ProfileHatProps {
  fullName: string;
  role: string;
  avatar: {
    path: string | null;
    alter: string;
  };
}

const ProfileHat = ({ avatar, role, fullName }: ProfileHatProps) => {
  return (
    <div className="profile-hat">
      <div className="profile-hat__profile-info-wrapper">
        <div className="profile-hat__info">
          <div className="profile-hat__info__avatar">
            <Avatar size="large" src={avatar?.path} alter={avatar?.alter} />
          </div>
          <div className="profile-hat__info__user-info">
            <h2 className="text-md-semibold">{fullName}</h2>
            <span className="text-xs-regular">{role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHat;
