

import { useMutation } from "@tanstack/react-query";
import { CreateImageParamsDTO, CreateImageResponseDTO } from "@/modules/image/domain/dtos/create-image";
import { RemoteError } from "@/shared/domain/errors/remote-error";
import { CreateImage } from "../data/usecases/create-image";
import { ListImage } from "../data/usecases/list-image";
import { UpdateImage } from "@/modules/user/infra/services/data/usecases/update-image";
import { UpdateImageParamsDTO } from "@/modules/image/domain/dtos/update-image";

const useImage = () => {

    const { mutateAsync: createImage, isPending, error, data } = useMutation<CreateImageResponseDTO, RemoteError, CreateImageParamsDTO>({
        mutationFn: async (data: CreateImageParamsDTO) => {
            const response = await new CreateImage().createImage(data);
            return response;
        },
    });

    const handleCreateImage = async (data: CreateImageParamsDTO) => {
        await createImage(data);
    };

    const handleListImage = async () => {
        const response = await new ListImage().listImage();
        return response;
    };

    const handleUpdateImage = async (data: UpdateImageParamsDTO) => {
        const response = await new UpdateImage().updateImage(data);
        return response;
    };

    return {
        createImage: {
            handleCreateImage,
            isPending,
            error: error?.response?.data?.message,
            data,
        },
        listImage: {
            handleListImage,
            isPending,
            error: error?.response?.data?.message,
            data,
        },
        updateImage: {
            handleUpdateImage,
            isPending,
            error: error?.response?.data?.message,
            data,
        },
    };
};          

export default useImage;