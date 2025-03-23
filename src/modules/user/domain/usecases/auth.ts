import { AuthUserParamsDTO, AuthUserResponseDTO } from "../dtos";

export interface Auth {
  login: (data: AuthUserParamsDTO) => Promise<AuthUserResponseDTO>;
}
