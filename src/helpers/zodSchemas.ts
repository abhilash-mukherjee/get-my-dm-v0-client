import { z } from 'zod'

export const authenticationSuccessResponseSchema = z.object({
    token: z.string(),
    message: z.string()
})

export const errorResponseSchema = z.object({
    error: z.string()
})

export const influencerDetailsSchema = z.object({
    fullName:z.string(),
    id: z.string(),
    slug: z.string()
})