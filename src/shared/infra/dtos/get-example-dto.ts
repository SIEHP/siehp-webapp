import { z } from "zod";
import { ExampleModel, ExampleModelSchema } from "../models"

export interface GetExampleParamsDTO {
    example: string
}

export const GetExampleResponseSchema = z.object({
    example: ExampleModelSchema,
    error: z.string().optional()
});

export type GetExampleResponseDTO = z.infer<typeof GetExampleResponseSchema>;

export interface ExampleAdapterDTO {
    example: ExampleModel
}