import { z } from 'zod';

export const profileSchema = z.object({
  lastName: z
    .string()
    .min(1, 'Фамилия обязательна')
    .max(50, 'Фамилия не должна превышать 50 символов'),

  firstName: z
    .string()
    .min(1, 'Имя обязательно')
    .max(50, 'Имя не должно превышать 50 символов'),

  middleName: z
    .string()
    .max(50, 'Отчество не должно превышать 50 символов')
    .optional(),

  login: z
    .string()
    .min(3, 'Логин должен содержать минимум 4 символа')
    .max(30, 'Логин не должен превышать 30 символов'),
});
