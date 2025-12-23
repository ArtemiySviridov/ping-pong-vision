import './ApproveUserCard.scss';
import AvatarWithName from '@/shared/ui/AvatarWithName';
import Button from '@/shared/ui/Button';
import type { Avatar } from '@/shared/types/tables/column.ts';

interface ApproveUserCardProps {
  fullName: string;
  avatar: Avatar;
  onBlock: () => void;
  onApprove: () => void;
}

const ApproveUserCard = ({
  fullName,
  avatar,
  onBlock,
  onApprove,
}: ApproveUserCardProps) => {
  return (
    <div className="approve-user-card">
      <div className="approve-user-card__user">
        <AvatarWithName
          name={fullName}
          namePosition="right"
          avatarSize="small"
          textStyle="sm-medium"
          src={avatar.path}
          alter={avatar.alter}
        />
      </div>
      <div className="approve-user-card__buttons">
        <Button
          size="small"
          variant="secondary"
          text="Отклонить"
          onClick={onBlock}
        />
        <Button
          size="small"
          variant="primary"
          text="Подтвердить"
          onClick={onApprove}
        />
      </div>
    </div>
  );
};

export default ApproveUserCard;
