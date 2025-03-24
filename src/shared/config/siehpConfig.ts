import { WrongEnviromentError } from "@/shared/domain/errors/wrong-enviroment-error";
import z, { ZodError } from "zod";

const SIEHPConfigSchema = z.object({
  API_URL: z.string().url(),
  BASE_URL: z.string().url(),
});

let SIEHPConfig: z.infer<typeof SIEHPConfigSchema> = {
  API_URL: "",
  BASE_URL: "",
};

try {
  SIEHPConfig = SIEHPConfigSchema.parse({
    API_URL: String(process.env.NEXT_PUBLIC_SIEHP_API_URL),
    BASE_URL: String(process.env.NEXT_PUBLIC_SIEHP_URL),
  });
} catch (error) {
  if (error instanceof ZodError) {
    throw new WrongEnviromentError(error);
  }
}

export { SIEHPConfig };
