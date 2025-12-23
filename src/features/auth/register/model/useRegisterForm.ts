import { useRegisterStore } from '@/features/auth/register/model/registerStore.ts';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export function useRegisterForm() {
  const register = useRegisterStore((state) => state.register);
  const isLoading = useRegisterStore((state) => state.isLoading);
  const storeError = useRegisterStore((state) => state.error);
  const navigate = useNavigate();
  const onSubmit = async (
    data: {
      login: string;
      password: string;
      firstName: string;
      middleName: string;
      lastName: string;
    },
    setError: any,
  ) => {
    try {
      await register(data);
      navigate('/login');
      toast.success('Регистрация прошла успешно', {
        autoClose: 2000,
      });
    } catch (error: any) {
      if (error.response?.status === 409) {
        setError('login', {
          type: 'server',
          message: 'Логин уже занят',
        });
        toast.error('Не удалось выполнить регистрацию: логин уже занят', {
          position: 'top-right',
        });
      } else {
        setError('root', {
          type: 'server',
          message: storeError ?? 'Ошибка при регистрации',
        });
        toast.error('Ошибка при регистрации. Попробуйте позже.', {
          position: 'top-right',
        });
      }
    }
  };

  return { onSubmit, isPending: isLoading };
}
