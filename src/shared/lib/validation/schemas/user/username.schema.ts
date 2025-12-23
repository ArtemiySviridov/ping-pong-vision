import { z } from 'zod';

export const usernameSchema = z
  .string()
  .min(6, { message: 'Логин должен содержать минимум 6 символов' })
  .max(20, { message: 'Логин должен содержать максимум 20 символов' })
  .regex(/^[a-zA-Z0-9_-]+$/, { message: 'Только латиница, цифры, _, -' })
  .trim();
