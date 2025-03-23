import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  role: z.string(),
  imageProfileUrl: z.string().optional().nullable(),
});

export type User = z.infer<typeof UserSchema>;

export const AuthSchema = z.object({
  token: z.string(),
  user: UserSchema,
});

export type Auth = z.infer<typeof AuthSchema>;
