import { z } from "zod";

export const InviteProfessorParamsSchema = z.object({
  email: z.string().email(),
});

export type InviteProfessorParamsDTO = z.infer<typeof InviteProfessorParamsSchema>;

export const InviteProfessorResponseSchema = z.object({
  message: z.string(),
});

export type InviteProfessorResponseDTO = z.infer<typeof InviteProfessorResponseSchema>;
