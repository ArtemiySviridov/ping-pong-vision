import { z } from 'zod';
import { registerSchema } from './register.schema';

export type RegisterFormFields = z.infer<typeof registerSchema>;
