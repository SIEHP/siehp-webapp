import { z } from "zod";

// Define os tipos de arquivo de imagem permitidos
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Esquema de validação com Zod
export const professorAddImageSchema = z.object({
  direitosImagem: z.string().min(1, "Os direitos de imagem são obrigatórios"),
  tecidoOrgao: z.string().min(1, "O tecido/órgão é obrigatório"),
  estadoPeca: z.string().min(1, "O estado da peça é obrigatório"),
  dataCadastro: z.string().min(1, "A data de cadastro é obrigatória"),
  tituloImagem: z.string().min(1, "O título da imagem é obrigatório"),
  descricaoImagem: z.string().min(1, "A descrição da imagem é obrigatória"),
  tags: z.array(z.string()),
  // Validação de imagem opcional para possibilitar a validação do formulário
  // mesmo sem o arquivo de imagem (que será tratado separadamente)
  imageFile: z
    .instanceof(File)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Apenas os formatos .jpg, .jpeg, .png e .webp são permitidos",
    )
    .optional()
    .nullable(),
});

// Tipo inferido do esquema
export type ProfessorAddImageFormData = z.infer<typeof professorAddImageSchema>;
