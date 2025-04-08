import { z } from "zod"

export const ChangeUserStatusParamsSchema = z.object({
    userId: z.number(),
})

export type ChangeUserStatusParamsDTO = z.infer<typeof ChangeUserStatusParamsSchema>; 

export const ChangeUserStatusResponseSchema = z.object({
    message: z.string(),
  });
  
  export type ChangeUserStatusResponseDTO = z.infer<typeof ChangeUserStatusResponseSchema>;