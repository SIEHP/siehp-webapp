import { z } from "zod";

export const GetProfessorsParamsSchema = z.object({
  registration_code: z.string(),
  name: z.string(),
});

export type GetProfessorsParamsDTO = z.infer<typeof GetProfessorsParamsSchema>;

export const GetProfessorsResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    registration_code: z.string(),
    role: z.string(),
    status: z.string(),
  })
);

export type GetProfessorsResponseDTO = z.infer<typeof GetProfessorsResponseSchema>;
