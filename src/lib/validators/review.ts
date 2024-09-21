import { z } from 'zod'

export const PropertyValidator = z.object({
  title: z.string(),
  comment: z.string(),
  propertyId: z.number(),
})

export type PropertyCreationRequest = z.infer<typeof PropertyValidator>