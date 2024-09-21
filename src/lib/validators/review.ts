import { z } from 'zod'

export const ReviewValidator = z.object({
  rating: z.number(),
  comment: z.string(),
  propertyId: z.number(),
})

export type ReviewCreationRequest = z.infer<typeof ReviewValidator>