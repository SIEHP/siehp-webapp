import { z } from "zod";

export const DeleteImageResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.string(),
  url: z.string(),
  piece_state: z.string().nullable().optional(),
  pick_date: z.string().or(z.date()).nullable().optional(),
  tissue: z.string().nullable().optional(),
  copyright: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
  created_by: z.number(),
  updated_by: z.number(),
  tags: z.array(z.object({
    id: z.number(),
    name: z.string(),
    status: z.string(),
  })).optional(),
});

export type DeleteImageResponseDTO = z.infer<typeof DeleteImageResponseSchema>; 