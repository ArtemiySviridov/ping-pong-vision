import './LoginForm.scss';
import PpvLogo from '@/shared/ui/ppv-logo';
import Input from '@/shared/ui/Input';
import { Link } from 'react-router';
import Button from '@/shared/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { LoginFormFields } from '../model/types.ts';
import { loginSchema } from '../model/login.schema.ts';
import { useLoginForm } from '@/features/auth/login/model/useLoginForm.ts';

const LoginForm = () => {
  const { onSubmit, isPending } = useLoginForm();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit((data) => onSubmit(data, setError))}
    >
      <div className="login-form__ppv-logo">
        <PpvLogo size="large" textStyle="text-xl-bold" />
      </div>

      <h1 className="login-form__title text-xl-bold">Войти в аккаунт</h1>
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
      <div className="login-form__footer">
        <Button
          disabled={isPending}
          variant="primary"
          text={isPending ? 'Вход...' : 'Войти'}
          size="small"
        />
        <div className="login-form__no-account">
          <span>Нет аккаунта?</span>
          <Link to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
