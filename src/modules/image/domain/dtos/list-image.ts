import { z } from "zod";

export const ImageResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    status: z.string(),
    url: z.string(),
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

export type ImageResponseDTO = z.infer<typeof ImageResponseSchema>;

export const ListImageResponseSchema = z.array(ImageResponseSchema);

export type ListImageResponseDTO = z.infer<typeof ListImageResponseSchema>;