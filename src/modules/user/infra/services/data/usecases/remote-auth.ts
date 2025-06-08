import axios from "axios";
import {
  AuthUserParamsDTO,
  AuthUserResponseDTO,
  AuthUserResponseSchema,
} from "@/modules/user/domain/dtos";
import { Auth } from "@/modules/user/domain/usecases";
import { SIEHPConfig } from "@/shared/config/siehpConfig";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";
import { Auth as AuthModel } from "@/modules/user/infra/models";

export class RemoteAuth implements Auth {
  async authUser({
    email,
    password,
  }: AuthUserParamsDTO): Promise<AuthUserResponseDTO> {
    // const httpResponse = await axios.post<Auth | ApiError>(
    //   `${SIEHPConfig.API_URL}/user/auth`,
    //   {
    //     email,
    //     password,
    //   },
    // ); TODO: Uncomment after implementation of the API and layout

    const httpResponse: { data: AuthModel } = {
      data: {
        token: "toke1232313",
        user: {
          id: 1,
          name: "Cleberson",
          role: "Ajudante de Servente",
        },
      },
    };

    const error = checkApiError({
      data: httpResponse.data,
      schema: AuthUserResponseSchema,
    });

    if (error) {
      throw new Error(error);
    }

    return httpResponse.data;
  }
}
