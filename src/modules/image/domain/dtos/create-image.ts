import { z } from "zod";

export const CreateImageParamsSchema = z.object({
  title: z.string(),
  url: z.string(),
  piece_state: z.string(),
  pick_date: z.union([z.string(), z.date()]).optional(),
  tissue: z.string(),
  copyright: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
});

export type CreateImageParamsDTO = z.infer<typeof CreateImageParamsSchema>;

export const CreateImageResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    status: z.string(),
    url: z.string(),
    piece_state: z.string(),
    pick_date: z.union([z.string(), z.date()]).nullable().optional(),
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

export type CreateImageResponseDTO = z.infer<typeof CreateImageResponseSchema>;
