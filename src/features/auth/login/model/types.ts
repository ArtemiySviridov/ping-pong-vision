import { z } from 'zod';
import { loginSchema } from './login.schema';

export type LoginFormFields = z.infer<typeof loginSchema>;
