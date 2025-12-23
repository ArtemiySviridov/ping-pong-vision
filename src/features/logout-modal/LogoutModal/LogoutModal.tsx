import './LogoutModal.scss';
import Button from '@/shared/ui/Button';
import Modal from '@/shared/ui/modal';
import { useNavigate } from 'react-router';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
}

const LogoutModal = ({ isOpen, onClose, onSubmit }: LogoutModalProps) => {
  const navigate = useNavigate();
  const handleConfirm = async () => {
    await onSubmit();
    navigate('/login');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Выход">
      <div className="logout-modal">
        <h3 className="logout-modal__title">Вы уверены, что хотите выйти?</h3>
        <div className="logout-modal__buttons">
          <Button
            size="small"
            variant="secondary"
            text="Отмена"
            onClick={onClose}
          />
          <Button
            size="small"
            variant="primary"
            text="Выйти"
            onClick={handleConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
