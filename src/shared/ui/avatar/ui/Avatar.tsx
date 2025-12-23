import './Avatar.scss';
import type { AvatarProps } from '@/shared/ui/avatar/ui/types.ts';

const Avatar = ({ size, src, alter }: AvatarProps) => {
  return (
    <div className={`avatar avatar--${size}`}>
      {src !== null ? (
        <img src={src} alt={alter} className="avatar__image" loading="eager" />
      ) : (
        <span className="avatar__content">{alter}</span>
      )}
    </div>
  );
};

export default Avatar;
