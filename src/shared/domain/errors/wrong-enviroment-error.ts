import { ZodError } from 'zod';

export class WrongEnviromentError extends Error {
  constructor(error: ZodError) {
    const errorMessage = error.errors
      .map((error) => `${error.path} ${error.message}`)
      .join('\n');
    super(errorMessage);
  }
}
