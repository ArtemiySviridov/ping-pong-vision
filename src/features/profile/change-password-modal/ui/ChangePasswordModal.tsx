import './ChangePasswordModal.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import Modal from '@/shared/ui/modal';
import { changePasswordSchema } from '@/features/profile/change-password-modal/model/changePassword.schema.ts';
import type { ChangePasswordFormFields } from '@/features/profile/change-password-modal/model/types.ts';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ChangePasswordFormFields) => Promise<void>;
}

const ChangePasswordModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ChangePasswordModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ChangePasswordFormFields>({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleFormSubmit = async (
    data: ChangePasswordFormFields,
    setError: any,
  ) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setError('currentPassword', {
          type: 'custom',
          message: 'Неверный текущий пароль',
        });
      }
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Смена пароля">
      <form
        className="change-password-form"
        onSubmit={handleSubmit((data) => handleFormSubmit(data, setError))}
      >
        <div className="change-password-form__fields">
          <Input
            type="password"
            label="Текущий пароль"
            placeholder="Введите текущий пароль"
            {...register('currentPassword')}
            error={!!errors.currentPassword}
            errorMessage={errors.currentPassword?.message}
          />

          <Input
            type="password"
            label="Новый пароль"
            placeholder="Введите новый пароль"
            {...register('newPassword')}
            error={!!errors.newPassword}
            errorMessage={errors.newPassword?.message}
          />

          <Input
            type="password"
            label="Подтверждение нового пароля"
            placeholder="Повторите новый пароль"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />
        </div>

        <div className="change-password-form__buttons">
          <Button variant="primary" text="Сменить пароль" size="small" />
          <Button
            variant="secondary"
            text="Отмена"
            onClick={handleClose}
            size="small"
          />
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
