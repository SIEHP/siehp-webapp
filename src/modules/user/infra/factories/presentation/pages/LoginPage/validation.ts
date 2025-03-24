import { z } from "zod";

// Definindo o esquema de validação com zod
export const loginSchema = z.object({
    email: z
      .string()
      .min(1, "Por favor, insira um e-mail")
      .email("Por favor, insira um e-mail válido"),
    password: z
      .string()
      .min(1, "Por favor, insira uma senha"),
  });
  
  // Tipo inferido do esquema
  export type LoginFormData = z.infer<typeof loginSchema>;