import { z } from 'zod'

export const PropertyValidator = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
})

export type PropertyCreationRequest = z.infer<typeof PropertyValidator>