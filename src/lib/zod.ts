import { object, string } from 'zod'

export const parseSignInSchema = (credentials: any) =>
  object({
    email: string({ required_error: 'email is required' }).email(
      'Must be a valid email address'
    ),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
  }).safeParse(credentials)
