import './PersonalInfo.scss';
import Avatar from '@/shared/ui/avatar';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import ChangePasswordModal from '@/features/profile/change-password-modal';
import { profileSchema } from '@/features/profile/personal-info/model/profile.schema.ts';
import type { ProfileFormFields } from '@/features/profile/personal-info/model/types.ts';
import { useProfileData } from '@/features/profile/personal-info/model/useProfileData.ts';
import type { ChangePasswordFormFields } from '@/features/profile/change-password-modal/model/types.ts';
import { useProfileStore } from '@/entities/profile/model/profileStore.ts';
import FileUpload from '@/shared/ui/file-upload';
import { RotateCcwKey, X } from 'lucide-react';
import { toast } from 'react-toastify';

const PersonalInfo = () => {
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const { personalInfo } = useProfileData();
  const { updatePersonalInfo, updatePassword, deleteAvatar } =
    useProfileStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormFields>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      middleName: '',
      login: '',
    },
  });

  useEffect(() => {
    if (personalInfo) {
      reset({
        lastName: personalInfo.lastName || '',
        firstName: personalInfo.firstName || '',
        middleName: personalInfo.middleName || '',
        login: personalInfo.login || '',
      });
    }
  }, [personalInfo, reset]);

  const handleProfileSubmit = async (data: ProfileFormFields) => {
    if (!isDirty) return;
    const success = await updatePersonalInfo(data);
    if (success) {
      reset(data);
      toast.success('Данные успешно обновлены');
    }
  };

  const handleChangePassword = async (data: ChangePasswordFormFields) => {
    const success = await updatePassword(data);
    if (success) {
      setIsChangePasswordModalOpen(false);
      toast.success('Пароль успешно обновлен');
    }
  };

  const handleCancel = () => {
    if (personalInfo) {
      reset({
        lastName: personalInfo.lastName || '',
        firstName: personalInfo.firstName || '',
        middleName: personalInfo.middleName || '',
        login: personalInfo.login || '',
      });
    }
  };

  const uploadAvatar = useProfileStore((state) => state.uploadAvatar);

  const handleAvatarUpload = async (file: File) => {
    await uploadAvatar(file);
  };

  return (
    <>
      <form
        className="personal-info"
        onSubmit={handleSubmit(handleProfileSubmit)}
      >
        <div className="personal-info__avatar text-sm-regular">
          <Avatar
            size="medium"
            src={personalInfo?.avatar.path}
            alter={personalInfo?.avatar.alter}
          />
          <div className="personal-info__avatar__buttons">
            <FileUpload
              onFileSelect={handleAvatarUpload}
              label="Загрузить фото"
            />
            <Button
              type="button"
              variant="tertiary"
              icon={<X size={18} />}
              text="Удалить фото"
              size="small"
              onClick={deleteAvatar}
            />
          </div>
        </div>
        <div className="personal-info__info">
          <Input
            type="text"
            label="Фамилия"
            placeholder="Введите фамилию"
            {...register('lastName')}
            error={!!errors.lastName}
            errorMessage={errors.lastName?.message}
          />
          <Input
            type="text"
            label="Имя"
            placeholder="Введите имя"
            {...register('firstName')}
            error={!!errors.firstName}
            errorMessage={errors.firstName?.message}
          />
          <Input
            type="text"
            label="Отчество"
            placeholder="Введите отчество"
            {...register('middleName')}
            error={!!errors.middleName}
            errorMessage={errors.middleName?.message}
          />
          <Input
            type="text"
            label="Логин"
            placeholder="Введите логин"
            {...register('login')}
            error={!!errors.login}
            errorMessage={errors.login?.message}
          />

          <div className="personal-info__info__password">
            <Button
              variant="tertiary"
              text="Изменить пароль"
              icon={<RotateCcwKey strokeWidth={1.5} />}
              size="small"
              onClick={() => setIsChangePasswordModalOpen(true)}
            />
          </div>
        </div>
        <div className="personal-info__buttons">
          <Button
            disabled={!isDirty}
            variant="primary"
            text="Сохранить"
            size="small"
          />
          <Button
            type="button"
            variant="secondary"
            text="Отменить"
            size="small"
            onClick={handleCancel}
          />
        </div>
      </form>
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        onSubmit={handleChangePassword}
      />
    </>
  );
};

export default PersonalInfo;
