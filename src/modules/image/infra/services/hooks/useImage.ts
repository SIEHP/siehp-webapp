import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { CreateImageParamsDTO, CreateImageResponseDTO } from "@/modules/image/domain/dtos/create-image";
import { RemoteError } from "@/shared/domain/errors/remote-error";
import { CreateImage } from "../data/usecases/create-image";
import { ListImage } from "../data/usecases/list-image";
import { UpdateImage } from "../data/usecases/update-image";
import { ListTags } from "../data/usecases/list-tags";
import { UpdateImageParamsDTO } from "@/modules/image/domain/dtos/update-image";
import { ListTagsResponseDTO } from "@/modules/image/domain/dtos/list-tags";

const useImage = () => {

    const { mutateAsync: createImage, isPending, error, data } = useMutation<CreateImageResponseDTO, RemoteError, CreateImageParamsDTO>({
        mutationFn: async (data: CreateImageParamsDTO) => {
            const response = await new CreateImage().createImage(data);
            return response;
        },
    });

    const handleCreateImage = useCallback(async (data: CreateImageParamsDTO) => {
        await createImage(data);
    }, [createImage]);

    const handleListImage = useCallback(async () => {
        const response = await new ListImage().listImage();
        return response;
    }, []);

    const handleUpdateImage = useCallback(async (data: UpdateImageParamsDTO) => {
        const response = await new UpdateImage().updateImage(data);
        return response;
    }, []);

    const handleListTags = useCallback(async (): Promise<ListTagsResponseDTO> => {
        const response = await new ListTags().listTags();
        return response;
    }, []);

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
        listTags: {
            handleListTags,
        },
    };
};          

export default useImage;