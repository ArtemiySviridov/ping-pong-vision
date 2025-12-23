import './RegisterForm.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PpvLogo from '@/shared/ui/ppv-logo';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { Link } from 'react-router';
import type { RegisterFormFields } from '@/features/auth/register/model/type.ts';
import { registerSchema } from '@/features/auth/register/model/register.schema.ts';
import { useRegisterForm } from '@/features/auth/register/model/useRegisterForm.ts';

const RegisterForm = () => {
  const { onSubmit, isPending } = useRegisterForm();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit((data) => onSubmit(data, setError))}
    >
      <div className="register-form__ppv-logo">
        <PpvLogo size="large" textStyle="text-xl-bold" />
      </div>

      <h1 className="register-form__title text-xl-bold">Создать аккаунт</h1>
      <div className="register-form__fields">
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
        <Input
          type="password"
          label="Пароль"
          placeholder="Введите пароль"
          {...register('password')}
          error={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <Input
          type="password"
          label="Повторите пароль"
          placeholder="Повторите пароль"
          {...register('repeatPassword')}
          error={!!errors.repeatPassword}
          errorMessage={errors.repeatPassword?.message}
        />
      </div>
      {errors.root && (
        <div className="login-form__server-error text-sm-regular">
          {errors.root.message}
        </div>
      )}
      <div className="register-form__footer">
        <Button
          disabled={isPending}
          variant="primary"
          text={isPending ? 'Создание...' : 'Создать'}
          size="small"
        />
        <div className="register-form__no-account">
          <span>Есть аккаунт?</span>
          <Link to="/login">Войти</Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
