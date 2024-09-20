import { z } from 'zod'

export const UserValidator = z.object({
  name: z.string(),
  image: z.string(),
  
})

export type UserCreationRequest = z.infer<typeof UserValidator>