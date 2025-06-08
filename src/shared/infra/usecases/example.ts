import { GetExampleParamsDTO, GetExampleResponseDTO } from "../dtos";

export interface Example {
  getExample: (data: GetExampleParamsDTO) => Promise<GetExampleResponseDTO>;
}
