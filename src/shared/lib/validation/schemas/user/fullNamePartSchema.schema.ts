import { z } from 'zod';

export const fullNamePartSchemaSchema = z
  .string()
  .min(2, 'Должно содержать минимум 2 символа')
  .max(40, 'Должно содержать максимум 40 символов')
  .regex(
    /^[А-ЯЁ][а-яё-]+$/,
    'Разрешена только кириллица, первая буква заглавная',
  )
  .trim();
