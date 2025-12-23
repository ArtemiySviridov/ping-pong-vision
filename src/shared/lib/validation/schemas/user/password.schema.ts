import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(4, { message: 'Пароль должен содержать минимум 4 символов' })
  // .regex(/[A-Z]/, {
  //   message: 'Пароль должен содержать хотя бы одну заглавную букву',
  // })
  // .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' })
  .trim();
