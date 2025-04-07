import { z } from "zod";

export const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  created_at: z.string().or(z.date()).optional(),
  updated_at: z.string().or(z.date()).optional(),
  created_by: z.number().optional(),
  updated_by: z.number().nullable().optional(),
});

export type TagDTO = z.infer<typeof TagSchema>;

// The API returns an array of tags directly, not an object with a 'tags' property
export const ListTagsResponseSchema = z.array(TagSchema);

export type ListTagsResponseDTO = z.infer<typeof ListTagsResponseSchema>; 