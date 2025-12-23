import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Текущий пароль обязателен'),

    newPassword: z.string().min(4, 'Пароль должен содержать минимум 4 символа'),
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    //   'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру'
    // ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });
