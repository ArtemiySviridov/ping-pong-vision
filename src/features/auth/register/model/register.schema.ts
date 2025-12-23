import { z } from 'zod';
import { passwordSchema, usernameSchema } from '@/shared/lib/validation';
import { fullNamePartSchemaSchema } from '@/shared/lib/validation/schemas/user/fullNamePartSchema.schema.ts';

export const registerSchema = z
  .object({
    login: usernameSchema,
    password: passwordSchema,
    repeatPassword: passwordSchema,
    firstName: fullNamePartSchemaSchema,
    lastName: fullNamePartSchemaSchema,
    middleName: fullNamePartSchemaSchema,
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'Пароли не совпадают',
  });
