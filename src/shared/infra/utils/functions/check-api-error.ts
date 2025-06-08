import { ApiError } from "@/shared/infra/models";
import { ZodError, ZodSchema } from "zod";

interface CheckApiErrorParams<T> {
  schema: ZodSchema;
  data: T | ApiError;
}

export function checkApiError<T>({
  data,
  schema,
}: CheckApiErrorParams<T>): string | null {
  if ((data as ApiError).timestamp) {
    return (data as ApiError).message;
  }

  if (data) {
    try {
      schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.message;
      }
    }
  }

  return null;
}
