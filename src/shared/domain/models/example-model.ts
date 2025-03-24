import { z } from "zod";

export const ExampleModelSchema = z.object({
  exampleModelAttribute: z.string(),
});

export type ExampleModel = z.infer<typeof ExampleModelSchema>;
