import {z} from 'zod'

export const authenticationSuccessResponseSchema = z.object({
    token: z.string(),
    message: z.string()
})

export const errorResponseSchema = z.object({
    error: z.string()
})