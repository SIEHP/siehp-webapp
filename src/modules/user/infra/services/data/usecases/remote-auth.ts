import axios from "axios";
import {
  AuthUserParamsDTO,
  AuthUserResponseDTO,
  AuthUserResponseSchema,
} from "@/modules/user/domain/dtos";
import { Auth } from "@/modules/user/domain/usecases";
import { SIEHPConfig } from "@/shared/config/siehpConfig";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";
import { Auth as AuthModel } from "@/modules/user/domain/models";
import { ApiError } from "@/shared/domain/models/error";

export class RemoteAuth implements Auth {
  async login({
    email,
    password,
  }: AuthUserParamsDTO): Promise<AuthUserResponseDTO> {
     const httpResponse = await axios.post<AuthModel | ApiError>(
    `${SIEHPConfig.API_URL}/user/login`,
       {
         email,
         password,
       },
     ); 

    const error = checkApiError({
      data: httpResponse.data,
      schema: AuthUserResponseSchema,
    });

    if (error) {
      throw new Error(error);
    }

    return httpResponse.data as AuthModel;
  }
}
