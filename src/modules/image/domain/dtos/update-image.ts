import { z } from "zod";

export const UpdateImageParamsSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  piece_state: z.string().optional(),
  pick_date: z.union([z.string(), z.date(), z.null()]).optional(),
  tissue: z.string().optional(),
  copyright: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
  user_email: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type UpdateImageParamsDTO = z.infer<typeof UpdateImageParamsSchema>;

export const UpdateImageResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.string(),
  url: z.string(),
  piece_state: z.string(),
  pick_date: z.union([z.date(), z.string(), z.null()]),
  tissue: z.string(),
  copyright: z.string(),
  description: z.string(),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
  created_by: z.number(),
  updated_by: z.number().nullable(),
  tags: z.array(z.object({
      id: z.number(),
      name: z.string(),
      status: z.string(),
  })).optional(),
});

export type UpdateImageResponseDTO = z.infer<typeof UpdateImageResponseSchema>;
