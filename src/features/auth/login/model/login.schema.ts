import { z } from 'zod';
import { usernameSchema } from '@/shared/lib/validation';
import { passwordSchema } from '@/shared/lib/validation';

export const loginSchema = z.object({
  login: usernameSchema,
  password: passwordSchema,
});
