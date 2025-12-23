type AvatarSize = 'xs' | 'small' | 'medium' | 'large';

export interface AvatarProps {
  size: AvatarSize;
  content?: string;
  src?: string | null;
  alter?: string;
}
