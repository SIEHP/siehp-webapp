import { z } from "zod";

export const ResetPasswordParamsSchema = z.object({
  token: z.string().uuid('Token inválido.'),
  password: z.string(),
  confirmPassword: z.string(),
});

export type ResetPasswordParamsDTO = z.infer<typeof ResetPasswordParamsSchema>;

export const ResetPasswordResponseSchema = z.object({
  message: z.string(),
});

export type ResetPasswordResponseDTO = z.infer<typeof ResetPasswordResponseSchema>;     