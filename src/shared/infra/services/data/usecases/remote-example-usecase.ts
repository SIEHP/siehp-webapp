// import api from '@/shared/infra/services/api'
// import { SIEHPConfig } from "@/shared/config/siehpConfig";
import { GetExampleParamsDTO, GetExampleResponseDTO, GetExampleResponseSchema } from "@/shared/domain/dtos";
import { ExampleError } from "@/shared/domain/errors";
import { Example } from "@/shared/domain/usecases";
import { CONSTANT } from "@/shared/infra/utils/constants";
import { ZodError } from "zod";

export class RemoteExample implements Example {
  async getExample({
    example,
  }: GetExampleParamsDTO): Promise<GetExampleResponseDTO> {
    // const httpResponse = await api.post<GetExampleResponseDTO>(`/example/${example}`)
    // fingindo requisição
    const httpResponse = {
      data: {
        example: {
          exampleModelAttribute: `${example} ${CONSTANT}`,
        },
        error: undefined,
      },
    };

    if (httpResponse.data.error !== undefined) {
      throw new ExampleError();
    }

    try {
      GetExampleResponseSchema.parse(httpResponse.data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw error;
      }
    }

    return httpResponse.data;
  }
}
