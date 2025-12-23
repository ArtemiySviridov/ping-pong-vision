import './AvatarWithName.scss';
import Avatar from '@/shared/ui/avatar';
import { Link } from 'react-router';

type NamePosition = 'left' | 'bottom' | 'right';

type AvatarSize = 'xs' | 'small' | 'medium' | 'large';

type TextStyle = 'sm-medium' | 'md-semibold';

interface AvatarWithNameProps {
  playerId?: string;
  name: string;
  avatarContent?: string;
  namePosition: NamePosition;
  avatarSize: AvatarSize;
  textStyle: TextStyle;
  src?: string | null;
  alter?: string;
}

const AvatarWithName = ({
  playerId,
  name,
  avatarContent,
  namePosition,
  avatarSize,
  textStyle,
  src,
  alter,
}: AvatarWithNameProps) => {
  return (
    <Link
      to={`/players/${playerId}`}
      className="avatar-with-name-link"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={[
          'avatar-with-name',
          `avatar-with-name--${namePosition}`,
          `text-${textStyle}`,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Avatar
          size={avatarSize}
          content={avatarContent}
          src={src}
          alter={alter}
        />
        <span className="avatar-with-name__name">{name}</span>
      </div>
    </Link>
  );
};

export default AvatarWithName;
