import api from "@/shared/infra/services/api";
import {
  AuthUserParamsDTO,
  AuthUserResponseDTO,
  AuthUserResponseSchema,
  ValidateAccessTokenResponseDTO,
  ValidateAccessTokenResponseSchema,
} from "@/modules/user/domain/dtos";
import { Auth } from "@/modules/user/domain/usecases";
import { SIEHPConfig } from "@/shared/config/siehpConfig";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";
import { Auth as AuthModel } from "@/modules/user/domain/models";
import { ApiError } from "@/shared/domain/models/error";
import { CompleteRegistrationResponseDTO, CompleteRegistrationResponseSchema } from "@/modules/user/domain/dtos/complete-registration";
import { CompleteRegistrationParamsDTO } from "@/modules/user/domain/dtos/complete-registration";

export class RemoteAuth implements Auth {
  async login({
    email,
    password,
  }: AuthUserParamsDTO): Promise<AuthUserResponseDTO> {
     const httpResponse = await api.post<AuthModel | ApiError>(
    `/user/login`,
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

  async validateAccessToken(): Promise<ValidateAccessTokenResponseDTO> {
    const httpResponse = await api.get<ValidateAccessTokenResponseDTO>(
      `/user/validate-access-token`,
    );

    const error = checkApiError({
      data: httpResponse.data,
      schema: ValidateAccessTokenResponseSchema,
    });

    if (error) {
      throw new Error(error);
    }

    return httpResponse.data;
  }

  async completeRegistration({
    token,
    password,
    confirmPassword,
  }: CompleteRegistrationParamsDTO): Promise<CompleteRegistrationResponseDTO> {
    const httpResponse = await api.post<CompleteRegistrationResponseDTO>(`/user/validate-token`, { token, password, confirmPassword });

    const error = checkApiError({
      data: httpResponse.data,
      schema: CompleteRegistrationResponseSchema,
    });

    if (error) {
      throw new Error(error);
    }

    return httpResponse.data;
  }
}
