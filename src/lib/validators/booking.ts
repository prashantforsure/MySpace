import { z } from 'zod'

export const BookingValidator = z.object({
startDate: z.date(),
endDate : z.date(),
propertyId: z.number(),
})

export type BookingCreationRequest = z.infer<typeof BookingValidator>