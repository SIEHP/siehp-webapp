import { ExampleAdapterDTO, GetExampleResponseDTO } from "@/shared/domain/dtos"

export function exampleAdapter({error, example}: GetExampleResponseDTO): ExampleAdapterDTO {
    console.log(error)
    return {
        example
    }
}