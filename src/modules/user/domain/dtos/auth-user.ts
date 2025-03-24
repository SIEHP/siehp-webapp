import { z } from "zod";
import { AuthSchema } from "../models";

export const AuthUserParamsSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type AuthUserParamsDTO = z.infer<typeof AuthUserParamsSchema>;

export const AuthUserResponseSchema = AuthSchema;

export type AuthUserResponseDTO = z.infer<typeof AuthUserResponseSchema>;
