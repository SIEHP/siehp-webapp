import { z } from "zod";

export const CompleteRegistrationParamsSchema = z.object({
  token: z.string().uuid('Token inválido.'),
  password: z.string(),
  confirmPassword: z.string(),
});

export type CompleteRegistrationParamsDTO = z.infer<typeof CompleteRegistrationParamsSchema>;

export const CompleteRegistrationResponseSchema = z.object({
  message: z.string(),
});

export type CompleteRegistrationResponseDTO = z.infer<typeof CompleteRegistrationResponseSchema>;