import { AuthUserParamsDTO, AuthUserResponseDTO } from "../dtos";

export interface Auth {
  authUser: (data: AuthUserParamsDTO) => Promise<AuthUserResponseDTO>;
}
