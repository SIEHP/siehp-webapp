import { z } from "zod";


export const DeleteImageResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    status: z.string(),
    url: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    created_by: z.number(),
    updated_by: z.number(),
    tags: z.array(z.object({
        id: z.number(),
        name: z.string(),
        status: z.string(),
    })).optional(),
});

export type DeleteImageResponseDTO = z.infer<typeof DeleteImageResponseSchema>;

export const DeleteImageParamsSchema = z.object({
    id: z.number(),
});

export type DeleteImageParamsDTO = z.infer<typeof DeleteImageParamsSchema>;


