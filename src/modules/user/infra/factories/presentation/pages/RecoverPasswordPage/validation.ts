import { z } from "zod";

// Definindo o esquema de validação com zod
export const recoverPasswordSchema = z.object({
  codigo: z
    .string()
    .min(1, "Por favor, insira um código")
    .trim(),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .trim(),
  confirmPassword: z
    .string()
    .min(1, "Por favor, confirme sua senha")
    .trim(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

// Tipo inferido do esquema
export type RecoverPasswordFormData = z.infer<typeof recoverPasswordSchema>; 