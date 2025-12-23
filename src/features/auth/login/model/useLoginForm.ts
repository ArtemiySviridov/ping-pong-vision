import { useLoginStore } from '@/features/auth/login/model/loginStore.ts';
import { useNavigate } from 'react-router';

export function useLoginForm() {
  const login = useLoginStore((state) => state.login);
  const isLoading = useLoginStore((state) => state.isLoading);
  const storeError = useLoginStore((state) => state.error);

  const navigate = useNavigate();

  const onSubmit = async (
    data: { login: string; password: string },
    setError: any,
  ) => {
    try {
      await login(data);
      navigate('/live');
    } catch (error: any) {
      if (error.response?.status === 403) {
        setError('password', {
          type: 'server',
          message: 'Введен неверный логин или пароль',
        });
      } else {
        setError('root', {
          type: 'server',
          message: storeError ?? 'Ошибка входа',
        });
      }
    }
  };

  return { onSubmit, isPending: isLoading };
}
