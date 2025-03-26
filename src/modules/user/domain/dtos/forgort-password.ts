import { z } from "zod";

export const ForgotPasswordParamsSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordParamsDTO = z.infer<typeof ForgotPasswordParamsSchema>;

export const ForgotPasswordResponseSchema = z.object({
  message: z.string(),
});

export type ForgotPasswordResponseDTO = z.infer<typeof ForgotPasswordResponseSchema>;
